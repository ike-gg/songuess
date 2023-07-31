import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useUserClient = () => {
  const [userData, setUserData] =
    useState<Database["public"]["Tables"]["users"]["Row"]>();
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const supabase = createClientComponentClient<Database>({});

  useEffect(() => {
    const getCurrentUser = async () => {
      //fetching auth details
      const { data: dataAuth, error: errorAuth } =
        await supabase.auth.getUser();

      if (errorAuth) {
        setIsLogged(false);
        setLoading(false);
        return;
      }

      //fetching user profile
      const { data: dataUser, error: errorUser } = await supabase
        .from("users")
        .select()
        .eq("id", dataAuth.user.id)
        .single();

      setLoading(false);

      if (errorUser || !dataUser) {
        setIsLogged(false);
        return;
      }

      setIsLogged(true);
      setUserData(dataUser);
    };
    getCurrentUser();
  }, [supabase]);

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
