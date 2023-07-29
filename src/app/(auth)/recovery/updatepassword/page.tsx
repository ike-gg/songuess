import UpdatePassword from "@/components/auth/updatepassword/UpdatePassword";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RecoveryUpdatePasswordPage = async () => {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return <UpdatePassword />;
};

export default RecoveryUpdatePasswordPage;
