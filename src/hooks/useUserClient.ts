import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useUserClient = () => {
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const supabase = createClientComponentClient<Database>({});

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      setLoading(false);
      if (error) {
        setIsLogged(false);
        return;
      }
      setIsLogged(true);
      setUserData(userData.user);
    };
    getCurrentUser();
  }, [supabase]);

  const shorthands = {
    username: userData?.user_metadata.name,
    avatar: userData?.user_metadata.avatar_url,
  };

  return {
    userData,
    loading,
    isLogged,
    ...shorthands,
  };
};

export default useUserClient;
