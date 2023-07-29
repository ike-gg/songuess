import { RxExclamationTriangle } from "react-icons/rx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const ErrorBlock = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        "rounded-md bg-red-900/30 p-2 px-3 text-sm font-medium text-red-500 shadow-lg shadow-red-800/10",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-red-500 opacity-50">
          <RxExclamationTriangle />
        </span>
        {children}
      </div>
    </div>
  );
};

export { ErrorBlock };
