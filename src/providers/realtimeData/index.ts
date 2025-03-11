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
        { event: "INSERT", schema: "public", table },
        (payload) => {
          console.log("INSERT event received", payload);
          updateLocalDatabase(table, [payload.new]);
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table },
        (payload) => {
          console.log("UPDATE event received", payload);
          updateLocalDatabase(table, [payload.new]);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table },
        (payload) => {
          console.log("DELETE event received", payload);
        },
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      isMounted = false;
      supabase.removeChannel(subscription);
    };
  }, [table]);

  return data;
};

export default useRealtimeData;
