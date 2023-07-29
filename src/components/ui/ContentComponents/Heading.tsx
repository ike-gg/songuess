import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

const Heading = ({ children, className }: Props) => {
  return (
    <h1 className={twMerge("text-2xl font-semibold", className)}>{children}</h1>
  );
};

export { Heading };
