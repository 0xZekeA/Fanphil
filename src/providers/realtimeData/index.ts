import { supabase } from "$root/lib/supabase";
import { getDb } from "@/database/database";
import { useEffect, useState } from "react";

const useRealtimeData = (table: string) => {
  const [data, setData] = useState<any[]>([]);

  const fetchLocalData = async () => {
    try {
      const db = await getDb();
      const localData = await db.getAllAsync(
        `SELECT * FROM ${table} WHERE deleted = 0`,
      );
      setData(localData);
    } catch (error) {
      console.error(`Error fetching local data for ${table}:`, error);
    }
  };

  const updateLocalDatabase = async (tableName: string, records: any[]) => {
    try {
      const db = await getDb();
      for (const record of records) {
        if (!record.id) return;
        const keys = Object.keys(record);
        const placeholders = keys.map(() => "?").join(", ");
        const updatePlaceholders = keys
          .filter((key) => key !== "id")
          .map((key) => `${key} = excluded.${key}`)
          .join(", ");
        const values = keys.map((key) => record[key]);

        await db.runAsync(
          `INSERT INTO ${tableName} (${keys.join(", ")}) 
           VALUES (${placeholders}) 
           ON CONFLICT(id) DO UPDATE SET ${updatePlaceholders}`,
          values,
        );
      }

      setData((prevData) => {
        const updatedData = [...prevData];
        records.forEach((record) => {
          const index = updatedData.findIndex((item) => item.id === record.id);
          if (index !== -1) {
            updatedData[index] = record;
          } else {
            updatedData.push(record);
          }
        });
        return updatedData;
      });
    } catch (error) {
      console.error("Error updating local database:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      await fetchLocalData();
    };

    fetchData();

    const subscription = supabase
      .channel(`realtime:${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        async (payload) => {
          if (!isMounted) return;

          try {
            const db = await getDb();
            if (
              payload.eventType === "INSERT" ||
              payload.eventType === "UPDATE"
            ) {
              if (payload.new) {
                await updateLocalDatabase(table, [payload.new]);
              }
            } else if (payload.eventType === "DELETE") {
              if (payload.old?.id) {
                await db.runAsync(`DELETE FROM ${table} WHERE id = ?`, [
                  payload.old.id,
                ]);
                setData((prevData) =>
                  prevData.filter((item) => item.id !== payload.old.id),
                );
              }
            }
          } catch (error) {
            console.error(
              `Error handling real-time update for ${table}:`,
              error,
            );
          }
        },
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(subscription);
    };
  }, [table]);

  return data;
};

export default useRealtimeData;
