import { DatabaseClient } from "@/lib/database/databaseClient";
import { Database } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

const useUserClient = () => {
  const database = useMemo(
    () => new DatabaseClient({ type: "clientComponent" }),
    []
  );

  const [userData, setUserData] =
    useState<Database["public"]["Tables"]["users"]["Row"]>();
  const [auth, setAuth] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const auth = await database.currentUser.auth();
      const user = await database.currentUser.profile();

      if (user.error || auth.error) {
        setLoading(false);
        setIsLogged(false);
        return;
      }

      setAuth(auth.data.user);
      setLoading(false);
      setIsLogged(true);
      setUserData(user.data);
    };

    getUser();
  }, [database]);

  const shorthands = {
    username: userData?.username,
    avatar: userData?.avatar_url,
  };

  return {
    auth,
    userData,
    loading,
    isLogged,
    ...shorthands,
  };
};

export default useUserClient;
