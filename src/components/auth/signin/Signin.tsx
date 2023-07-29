"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Database } from "../../../types/supabase";
import LoginForm from "./SigninForm";
import { useState } from "react";

export default function Signin() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(undefined);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      router.push("/");
      return;
    }
    setIsLoading(false);
    setError(error.message);
  };

  const handleSpotify = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <LoginForm
      error={error}
      loading={isLoading}
      handleSignIn={handleSignIn}
      handleSpotify={handleSpotify}
    />
  );
}
