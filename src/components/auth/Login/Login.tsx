"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Database } from "../../../types/supabase";
import LoginForm from "./LoginForm";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async (email: string, password: string) => {
    const signInAction = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!signInAction.error) {
      router.push("/");
    }
  };

  return (
    <div className="mx-auto mt-12 w-full p-5 md:max-w-md">
      <LoginForm handleSignIn={handleSignIn} />
    </div>
  );
}
