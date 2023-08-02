import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const Label = ({ children, className }: Props) => {
  return (
    <p
      className={twMerge(
        "text-xs uppercase tracking-wider opacity-30",
        className
      )}
    >
      {children}
    </p>
  );
};

export { Label };
