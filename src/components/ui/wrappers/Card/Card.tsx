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
        "relative flex flex-col gap-4 overflow-hidden rounded-lg border border-neutral-100 bg-white p-4 shadow-lg shadow-neutral-200/50 md:p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
