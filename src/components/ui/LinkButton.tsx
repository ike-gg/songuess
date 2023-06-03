import { twMerge } from "tailwind-merge";
import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  children: string;
  href: string;
  variant?: "primary" | "secondary";
  size?: "large" | "medium" | "small";
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

const LinkButton = ({
  children,
  href,
  variant = "primary",
  size = "medium",
  disabled = false,
  icon: Icon,
  ...props
}: Props) => {
  return (
    <a
      className={twMerge(
        "flex items-center justify-center gap-2 rounded-md border shadow-md transition-all hover:-translate-y-0.5",
        variant === "primary" &&
          "border-indigo-700 bg-indigo-600 text-indigo-100 shadow-indigo-200 hover:bg-indigo-800",
        variant === "secondary" &&
          "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300",
        size === "small" && "px-3 py-1.5",
        size === "medium" && "px-4 py-2",
        size === "large" && "px-5 py-3",
        disabled && "cursor-not-allowed opacity-30"
      )}
      href={disabled ? undefined : href}
      {...props}
    >
      {children}
      {Icon && <span className="flex text-lg">{Icon}</span>}
    </a>
  );
};

export default LinkButton;
