import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ImAppleinc, ImSpotify } from "react-icons/im";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "transparent" | "spotify" | "apple";
  loading?: boolean;
  size?: "small" | "medium" | "large";
  icon?: ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      size = "medium",
      variant = "primary",
      href,
      icon,
      loading,
      className,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      "whitespace-nowrap flex items-center justify-center gap-1.5 rounded-lg transition-all duration-300 ",
      "disabled:opacity-50 border-2 border-transparent",
      variant === "primary" &&
        "bg-indigo-700 text-indigo-100 hover:bg-indigo-800 active:border-indigo-600",
      variant === "secondary" &&
        " bg-zinc-800 text-zinc-300 hover:bg-zinc-700 active:border-zinc-600",
      variant === "transparent" &&
        "bg-black/10 text-inherit opacity-75 hover:opacity-100",
      variant === "spotify" &&
        "bg-spotify-500 text-white hover:bg-spotify-700 active:border-spotify-500",
      variant === "apple" &&
        "bg-apple-500 hover:bg-apple-700 active:border-apple-500 text-apple-50",
      size === "small" && "text-sm px-2.5 py-1",
      size === "medium" && "px-4 py-2",
      size === "large" && "px-5 py-3",
      className
    );

    const elementContent = (
      <>
        {loading && (
          <span className="flex animate-spin text-xl">
            <CgSpinner />
          </span>
        )}
        {variant === "apple" && <ImAppleinc className="text-lg" />}
        {variant === "spotify" && <ImSpotify className="text-lg" />}
        {children}
        {icon && <span className="flex text-xl">{icon}</span>}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {elementContent}
        </Link>
      );
    }

    return (
      <button
        disabled={loading}
        type="button"
        {...props}
        ref={ref}
        className={classes}
      >
        {elementContent}
      </button>
    );
  }
);

Button.displayName = "xd";

export default Button;
