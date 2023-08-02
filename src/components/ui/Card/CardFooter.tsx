import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const CardFooter = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        "-m-4 flex flex-col gap-4 overflow-x-auto border-t border-zinc-800 bg-zinc-950/50 p-4 md:-m-6 md:mt-0 md:p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export { CardFooter };
