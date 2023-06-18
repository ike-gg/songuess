import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "transparent";
  size?: "small" | "medium" | "large";
  icon?: ReactNode;
  className?: string;
}

const Button = ({
  children,
  size = "medium",
  variant = "primary",
  icon,
  className,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={twMerge(
        "flex items-center justify-center gap-2 rounded-lg transition-all",
        variant === "primary" &&
          " bg-indigo-600 text-indigo-100 hover:bg-indigo-800",
        variant === "secondary" &&
          " bg-zinc-800 text-zinc-300 hover:bg-zinc-800/75",
        variant === "transparent" &&
          "border-transparent bg-black/10 text-inherit opacity-75 hover:opacity-100",
        size === "small" && "px-3 py-1.5",
        size === "medium" && "px-4 py-2",
        size === "large" && "px-5 py-3",
        className
      )}
    >
      {children}
      {icon}
    </button>
  );
};

export default Button;
