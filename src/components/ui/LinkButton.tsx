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
        "flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-all",
        variant === "primary" &&
          " bg-indigo-600 text-indigo-100 hover:bg-indigo-800",
        variant === "secondary" &&
          " bg-zinc-800 text-zinc-300 hover:bg-zinc-800/75",
        size === "small" && "px-3 py-1.5",
        size === "medium" && "px-4 py-2",
        size === "large" && "px-5 py-3",
        disabled && "cursor-not-allowed opacity-30"
      )}
      href={disabled ? undefined : href}
      {...props}
    >
      {children}
      {Icon && <span className="flex text-xl">{Icon}</span>}
    </a>
  );
};

export default LinkButton;
