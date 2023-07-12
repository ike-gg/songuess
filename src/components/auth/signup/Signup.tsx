"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Database } from "../../../types/supabase";
import RegisterForm from "./SignupForm";
import { useEffect, useState } from "react";

export default function Signup() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async (
    username: string,
    email: string,
    password: string
  ) => {
    const data = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          username,
        },
      },
    });
    router.refresh();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getSession();
    };
    fetchUser();
  });

  return (
    <div className="mx-auto mt-12 w-full p-5 md:max-w-md">
      <RegisterForm handleSignUp={handleSignUp} />
    </div>
  );
}
