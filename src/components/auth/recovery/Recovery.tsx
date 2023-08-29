"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "../../../types/supabase";
import RecoveryForm from "./RecoveryForm";
import useFeedback from "@/hooks/useFeedback";

export default function Recovery() {
  const supabase = createClientComponentClient<Database>();
  const { loading, setLoading, error, setError, success, setSuccess } =
    useFeedback();

  const handleRecovery = async (email: string) => {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/recovery/updatepassword`,
    });

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
      loading={loading}
      handleRecovery={handleRecovery}
    />
  );
}
