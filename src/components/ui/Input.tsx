import { HTMLProps, ReactNode, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Tooltip from "./Tooltip";
import ErrorParagraph from "./content/ErrorParagraph";
import { RxExclamationTriangle } from "react-icons/rx";
import { CgSpinner } from "react-icons/cg";

interface Props extends HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  icon?: ReactNode;
  tooltip?: string;
  loading?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>((inputProps, ref) => {
  const { label, className, error, icon, tooltip, loading, ...props } =
    inputProps;
  return (
    <label
      htmlFor={label}
      className={twMerge("flex flex-col overflow-hidden", className)}
    >
      {label && (
        <span className="flex gap-1 pb-2 text-sm leading-none text-zinc-600">
          {label}
          {tooltip && <Tooltip>{tooltip}</Tooltip>}
        </span>
      )}
      <div
        className={twMerge(
          "mb-1 flex items-center gap-3 rounded-md border border-transparent bg-zinc-800 p-1 px-3 transition-colors hover:border-zinc-600",
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
            error && "text-red-500"
          )}
          {...props}
          ref={ref}
          id={label}
        />
      </div>
      <AnimatePresence>
        {error && <ErrorParagraph className="mt-1">{error}</ErrorParagraph>}
      </AnimatePresence>
    </label>
  );
});

Input.displayName = "input";

export default Input;
