import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  icon?: ReactNode;
}

const Button = ({
  children,
  size = "medium",
  variant = "primary",
  icon,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={twMerge(
        "flex items-center justify-center gap-2 rounded-md border shadow-md transition-all hover:-translate-y-0.5",
        variant === "primary" &&
          "border-indigo-700 bg-indigo-600 text-indigo-100 shadow-indigo-200 hover:bg-indigo-800",
        variant === "secondary" &&
          "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300",
        size === "small" && "px-3 py-1.5",
        size === "medium" && "px-4 py-2",
        size === "large" && "px-5 py-3"
      )}
    >
      {children}
      {icon}
    </button>
  );
};

export default Button;
