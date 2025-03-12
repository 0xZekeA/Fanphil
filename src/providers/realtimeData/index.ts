import { supabase } from "$root/lib/supabase";
import { getDb } from "@/database/database";
import { useEffect, useState } from "react";
import { syncWithSupabase } from "./sync";

const useRealtimeData = (table: string, pollInterval = 3000) => {
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

  useEffect(() => {
    fetchLocalData();

    const interval = setInterval(fetchLocalData, pollInterval);

    const subscription = supabase
      .channel(`realtime:${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        async (payload) => {
          console.log(
            `Realtime event received for ${table}:`,
            payload.eventType,
          );

          syncWithSupabase();

          fetchLocalData();
        },
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(subscription);
    };
  }, [table]);

  return data;
};

export default useRealtimeData;
