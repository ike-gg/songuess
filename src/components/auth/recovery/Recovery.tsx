"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "../../../types/supabase";
import { useState } from "react";
import RecoveryForm from "./RecoveryForm";

export default function Recovery() {
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const handleRecovery = async (email: string) => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/recovery/updatepassword`,
    });
    setIsLoading(false);
    if (!error) {
      setSuccess(
        "If you have provided a valid email address, you will soon receive an email with instructions to reset your password."
      );
      return;
    }
    setError(error.message);
  };

  return (
    <RecoveryForm
      success={success}
      error={error}
      loading={isLoading}
      handleRecovery={handleRecovery}
    />
  );
}
