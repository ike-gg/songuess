import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const SubHeader = ({ children, className }: Props) => {
  return (
    <h2 className={twMerge("text-lg font-medium text-neutral-800", className)}>
      {children}
    </h2>
  );
};

export default SubHeader;
