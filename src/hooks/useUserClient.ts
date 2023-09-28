import { DatabaseClient } from "@/lib/database/databaseClient";
import { User } from "@/types/databaseTypes";
import { useEffect, useMemo, useState } from "react";

const useUserClient = () => {
  const database = useMemo(
    () => new DatabaseClient({ type: "clientComponent" }),
    []
  );

  const [userData, setUserData] = useState<User>();
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

      setLoading(false);
      setIsLogged(true);
      setUserData(user.data);
    };

    getUser();
  }, [database]);

  const shorthands = {
    username: userData?.username,
    avatar: userData?.avatar_url,
    id: userData?.id,
  };

  return {
    userData,
    loading,
    isLogged,
    ...shorthands,
  };
};

export default useUserClient;
