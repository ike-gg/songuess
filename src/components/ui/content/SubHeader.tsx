import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const SubHeader = ({ children, className }: Props) => {
  return (
    <h2 className={twMerge("text-lg font-medium opacity-90", className)}>
      {children}
    </h2>
  );
};

export { SubHeader };
