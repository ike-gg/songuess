import { HTMLProps, ReactNode, forwardRef } from "react";
import { AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import ErrorParagraph from "./content/ErrorParagraph";
import Tooltip from "./Tooltip";

interface Props extends HTMLProps<HTMLTextAreaElement> {
  label: string;
  tooltip?: string;
  error?: string;
  className?: string;
  icon?: ReactNode;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>((inputProps, ref) => {
  const { label, className, tooltip, error, icon, ...props } = inputProps;

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
      <div className="mb-1 flex h-full grow items-center gap-3 rounded-md border border-transparent bg-zinc-800 p-1 px-3 hover:border-zinc-600 focus:bg-zinc-900">
        {icon && <span className="opacity-50">{icon}</span>}
        <textarea
          className="h-full w-full resize-none bg-transparent py-1 text-zinc-200 outline-none placeholder:text-zinc-600"
          {...props}
          ref={ref}
          id={label}
        />
      </div>
      <AnimatePresence>
        {error && <ErrorParagraph>{error}</ErrorParagraph>}
      </AnimatePresence>
    </label>
  );
});

Textarea.displayName = "textarea";

export default Textarea;
