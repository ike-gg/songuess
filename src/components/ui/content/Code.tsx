import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
  footer?: string;
}

const Code = ({ children, className, footer }: Props) => {
  return (
    <code
      className={twMerge(
        "break-all rounded-md border border-zinc-700 bg-zinc-800 p-3",
        className
      )}
    >
      {children}
      {footer && <p className="mt-3 text-sm text-zinc-500">{footer}</p>}
    </code>
  );
};

export { Code };
