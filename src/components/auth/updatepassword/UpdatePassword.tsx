"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "../../../types/supabase";
import { useState } from "react";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default function UpdatePassword() {
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const handlePasswordUpdate = async (password: string) => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);
    if (!error) {
      setSuccess("Your password has been successfully updated.");
      return;
    }
    setError(error.message);
  };

  return (
    <UpdatePasswordForm
      success={success}
      error={error}
      loading={isLoading}
      handlePasswordUpdate={handlePasswordUpdate}
    />
  );
}
