"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const UserPage = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  supabase.auth.signOut().then(() => {
    router.replace("/");
  });
  return <p>signing out...</p>;
};

export default UserPage;
