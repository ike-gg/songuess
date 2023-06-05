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
        "rounded-full border border-indigo-400/50 px-2.5 py-0.5 text-sm text-indigo-700",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
