import { RxCheckCircled } from "react-icons/rx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const SuccessBlock = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        "rounded-md bg-green-900/30 p-2 px-3 text-sm font-medium text-green-500 shadow-lg shadow-green-800/10",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-green-500 opacity-50">
          <RxCheckCircled />
        </span>
        {children}
      </div>
    </div>
  );
};

export {SuccessBlock};
