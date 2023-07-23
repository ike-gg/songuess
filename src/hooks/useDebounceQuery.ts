import { useEffect, useState } from "react";

interface DebounceQueryOptions {
  value: string;
  debounceTime?: number;
  minLength?: number;
}

const useDebounceQuery = ({
  value,
  debounceTime = 300,
  minLength = 2,
}: DebounceQueryOptions) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    if (value.length < minLength) return;

    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceTime);

    return () => {
      clearTimeout(debounce);
    };
  }, [value, debounceTime, minLength]);

  return debouncedValue;
};

export default useDebounceQuery;
