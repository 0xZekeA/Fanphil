import { supabase } from "$root/lib/supabase";
import { showToast } from "@/utils/notification";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useUserRealtimeData = (
  session: any,
  setLoading: Dispatch<SetStateAction<boolean>>,
  loaded: boolean,
) => {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    if (!session && loaded) {
      setLoading(false);
    }
    if (!session) return;

    const table = "users";

    const fetchData = async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", session?.user.id)
        .single();
      if (error) {
        showToast("error", "User data fetch failed", error.message);
        return;
      }
      setData(data);
      setLoading(false);
    };

    fetchData();

    const subscription = supabase
      .channel(`realtime:${table}:${session.user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          if (
            payload.eventType === "UPDATE" ||
            payload.eventType === "INSERT"
          ) {
            setData(payload.new as User);
          } else if (payload.eventType === "DELETE") {
            setData(null);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [session, loaded]);

  return { data };
};

export default useUserRealtimeData;
