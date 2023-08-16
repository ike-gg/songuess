"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Database } from "../../../types/supabase";
import SignupForm from "./SignupForm";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const handleSignUp = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);
    const { data: dataUsername, error: errorUsername } = await supabase
      .from("users")
      .select()
      .ilike("username", username);
    if (errorUsername) {
      setError(errorUsername.message);
      setIsLoading(false);
      return;
    }
    if (dataUsername && dataUsername.length >= 1) {
      setError("Username is alredy taken.");
      setIsLoading(false);
      return;
    }

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          username,
        },
      },
    });

    setIsLoading(false);
    if (!error) {
      setSuccess(
        "If you haven't registered with this email address before, you will receive an activation link for your account shortly."
      );
      return;
    }
    setError(error?.message);
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
    <SignupForm
      loading={isLoading}
      error={error}
      success={success}
      handleSpotify={handleSpotify}
      handleSignUp={handleSignUp}
    />
  );
}
