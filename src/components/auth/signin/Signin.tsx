"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Database } from "../../../types/supabase";
import LoginForm from "./SigninForm";
import useFeedback from "@/hooks/useFeedback";

export default function Signin() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const { loading, setLoading, error, setError } = useFeedback();

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/");
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
    <LoginForm
      error={error}
      loading={loading}
      handleSignIn={handleSignIn}
      handleSpotify={handleSpotify}
    />
  );
}
