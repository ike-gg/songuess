"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "../../../types/supabase";
import UpdatePasswordForm from "./UpdatePasswordForm";
import useFeedback from "@/hooks/useFeedback";

export default function UpdatePassword() {
  const supabase = createClientComponentClient<Database>();
  const { error, loading, setError, setLoading, setSuccess, success } =
    useFeedback();

  const handlePasswordUpdate = async (password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      return;
    }
    setSuccess("Your password has been successfully updated.");
  };

  return (
    <UpdatePasswordForm
      success={success}
      error={error}
      loading={loading}
      handlePasswordUpdate={handlePasswordUpdate}
    />
  );
}
