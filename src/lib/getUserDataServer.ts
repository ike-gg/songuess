import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

const useUserDataServer = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) return null;

  const userId = user.id;

  const { data: users } = await supabase
    .from("users")
    .select()
    .eq("id", userId);

  if (!users) return null;

  return users[0];
};

export default useUserDataServer;
