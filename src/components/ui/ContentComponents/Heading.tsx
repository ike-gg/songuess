import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

const Heading = ({ children, className }: Props) => {
  return (
    <h1
      className={twMerge(
        "bg-gradient-to-br from-zinc-200 to-zinc-300 bg-clip-text text-3xl font-semibold text-transparent",
        className
      )}
    >
      {children}
    </h1>
  );
};

export { Heading };
