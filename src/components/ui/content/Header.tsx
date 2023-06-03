import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const Header = ({ children, className }: Props) => {
  return (
    <h1
      className={twMerge("text-2xl font-semibold text-neutral-800", className)}
    >
      {children}
    </h1>
  );
};

export default Header;
