import { routes } from "@/constants";
import UserProfile from "@/features/user/components/UserProfile";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UserPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) redirect(routes.auth.signin);

  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("id", authData.user.id)
    .single();

  if (!userData) redirect(routes.auth.signup);

  return <UserProfile user={userData} />;
};

export default UserPage;
