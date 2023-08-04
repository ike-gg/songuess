import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const SubHeading = ({ children, className }: Props) => {
  return (
    <h2 className={twMerge("text-xl font-medium opacity-90", className)}>
      {children}
    </h2>
  );
};

export { SubHeading };
