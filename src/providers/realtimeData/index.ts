import { supabase } from "$root/lib/supabase";
import { eventBus } from "@/events/events";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supastash } from "supastash";
import { syncWithSupabase } from "./sync";

const useRealtimeData = (table: string, pollInterval = 3000) => {
  const [data, setData] = useState<any[]>([]);

  const fetchLocalData = useCallback(async () => {
    try {
      const { data: localData }: { data: any[] | null } = await supastash
        .from(table)
        .select("*")
        .is("deleted_at", null)
        .run();
      if (localData) setData(localData);
    } catch (error) {
      console.error(`Error fetching local data for ${table}:`, error);
    }
  }, [table]);

  const debouncedFetch = useMemo(
    () => debounce(() => fetchLocalData(), 300),
    [fetchLocalData],
  );

  useEffect(() => {
    fetchLocalData();

    const handler = () => {
      console.log(`🔁 Refreshing data for ${table}`);
      fetchLocalData();
    };

    eventBus.on(`refresh:${table}`, handler);
    eventBus.on("refresh:all", handler);

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
          // Calls sync func when there are changes on supabase
          syncWithSupabase(true);

          debouncedFetch();
        },
      )
      .subscribe();

    return () => {
      eventBus?.off(`refresh:${table}`, handler);
      eventBus?.off("refresh:all", handler);
      debouncedFetch.cancel();
      supabase.removeChannel(subscription);
    };
  }, [table]);

  return data;
};

export default useRealtimeData;
