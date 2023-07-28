import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const Badge = ({ children, className }: Props) => {
  return (
    <span
      className={twMerge(
        "rounded-full border border-indigo-600/50 px-2.5 py-0.5 text-sm text-indigo-500",
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };
