import { getPfp } from "@/utils/getPfp";
import { useEffect, useState } from "react";

const useGetUsersPfp = (user: User | null) => {
  const [pfp, setPfp] = useState<string | null>(null);

  useEffect(() => {
    const getUserPfp = async () => {
      if (!user) return;
      const localUri = await getPfp(user?.id, user?.pfp);
      setPfp(localUri);
    };
    getUserPfp();
  }, [user?.pfp]);

  return pfp;
};

export default useGetUsersPfp;
