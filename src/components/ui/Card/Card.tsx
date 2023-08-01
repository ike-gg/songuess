import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        "relative flex flex-col gap-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 bg-gradient-to-br p-4 md:p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Card };
