import { useState } from "react";

const useFeedback = () => {
  const [loading, setLoadingState] = useState(false);
  const [error, setErrorState] = useState<string>();
  const [success, setSuccessState] = useState<string>();

  const setError = (textError: string) => {
    setLoadingState(false);
    setSuccessState(undefined);
    setErrorState(textError);
  };

  const setSuccess = (testSuccess: string) => {
    setLoadingState(false);
    setErrorState(undefined);
    setSuccessState(testSuccess);
  };

  const setLoading = (state: boolean) => {
    setSuccessState(undefined);
    setErrorState(undefined);
    setLoadingState(state);
  };

  return {
    loading,
    error,
    success,
    setError,
    setSuccess,
    setLoading,
  };
};

export default useFeedback;
