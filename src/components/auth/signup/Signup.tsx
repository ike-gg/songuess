"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "../../../types/supabase";
import SignupForm from "./SignupForm";
import useFeedback from "@/hooks/useFeedback";

export default function Signup() {
  const supabase = createClientComponentClient<Database>();
  const { error, loading, setError, setLoading, setSuccess, success } =
    useFeedback();

  const handleSignUp = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    const { data: dataUsername, error: errorUsername } = await supabase
      .from("users")
      .select()
      .ilike("username", username);
    if (errorUsername) {
      setError(errorUsername.message);
      return;
    }

    if (dataUsername && dataUsername.length >= 1) {
      setError("Username is alredy taken.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          full_name: username,
        },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }
    setSuccess(
      "If you haven't registered with this email address before, you will receive an activation link for your account shortly."
    );
  };

  const handleSpotify = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <SignupForm
      loading={loading}
      error={error}
      success={success}
      handleSpotify={handleSpotify}
      handleSignUp={handleSignUp}
    />
  );
}
