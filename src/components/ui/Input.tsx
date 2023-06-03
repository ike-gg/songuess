import { HTMLProps, ReactNode, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props extends HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, Props>((inputProps, ref) => {
  const { label, className, error, icon, ...props } = inputProps;
  return (
    <label className="flex flex-col overflow-hidden">
      <span className="py-1 text-sm text-neutral-400">{label}</span>
      <div className="mb-1 flex items-center gap-3 rounded-md border border-neutral-200/75 bg-neutral-50/40 p-1 px-3 focus:bg-slate-900">
        {icon && <span className="opacity-50">{icon}</span>}
        <input
          className="grow bg-transparent py-1 text-neutral-900 placeholder:text-neutral-300 focus:outline-offset-2 focus:outline-indigo-400"
          {...props}
          ref={ref}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="block text-sm font-semibold text-indigo-800"
          >
            • {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
});

Input.displayName = "WYPIERDALAJ";

export default Input;
