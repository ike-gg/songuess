import { DatabaseClient } from "@/lib/database/databaseClient";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useMemo, useState } from "react";

const useUserClient = () => {
  const database = useMemo(
    () => new DatabaseClient({ type: "clientComponent" }),
    []
  );

  const [userData, setUserData] =
    useState<Database["public"]["Tables"]["users"]["Row"]>();
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await database.currentUser.profile();

      if (user.error) {
        setLoading(false);
        setIsLogged(false);
        return;
      }

      setUserData(user.data);
    };

    getUser();
  }, [database]);

  const shorthands = {
    username: userData?.username,
    avatar: userData?.avatar_url,
  };

  return {
    userData,
    loading,
    isLogged,
    ...shorthands,
  };
};

export default useUserClient;
