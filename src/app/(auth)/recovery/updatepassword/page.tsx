import UpdatePassword from "@/components/auth/updatepassword/UpdatePassword";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reset password",
};

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
