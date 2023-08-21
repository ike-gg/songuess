"use client";

import { HTMLProps, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { RxExclamationTriangle } from "react-icons/rx";
import { CgSpinner } from "react-icons/cg";
import { ErrorParagraph, Tooltip, Transition } from "@/components/ui";

interface Props extends HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  icon?: ReactNode;
  tooltip?: string;
  loading?: boolean;
  hideLabel?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>((inputProps, ref) => {
  const {
    hideLabel = false,
    label,
    className,
    error,
    icon,
    tooltip,
    loading,
    ...props
  } = inputProps;
  return (
    <label
      htmlFor={label}
      className={twMerge("flex flex-col overflow-hidden", className)}
    >
      {label && !hideLabel && (
        <span className="flex gap-1 pb-2 text-sm leading-none text-zinc-600">
          {label}
          {tooltip && <Tooltip>{tooltip}</Tooltip>}
        </span>
      )}
      <div
        className={twMerge(
          "mb-1 flex items-center gap-3 rounded-lg border border-transparent bg-zinc-800 p-1 px-3 transition-colors hover:border-zinc-600",
          error && "border-red-900/60 bg-red-900/20 hover:border-red-800"
        )}
      >
        {loading && !error && <CgSpinner className="animate-spin" />}
        {icon && !error && !loading && (
          <span className="opacity-50">{icon}</span>
        )}
        {error && (
          <span className="text-red-500 opacity-50">
            <RxExclamationTriangle />
          </span>
        )}
        <input
          className={twMerge(
            "grow bg-transparent py-1 text-zinc-200 outline-none transition-colors placeholder:text-zinc-600",
            error && "text-red-500 placeholder:text-red-400/50"
          )}
          {...props}
          ref={ref}
          id={label}
        />
      </div>
      <Transition state={error ? true : false}>
        <ErrorParagraph className="mt-1">{error}</ErrorParagraph>
      </Transition>
    </label>
  );
});

Input.displayName = "input";

export { Input };
