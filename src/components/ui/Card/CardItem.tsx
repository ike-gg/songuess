import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  href?: string;
  children?: ReactNode;
  className?: string;
}

const CardItem = ({ href, children, className }: Props) => {
  return (
    <Link
      href={href || ""}
      className={twMerge(
        "flex items-center gap-3 rounded-md border border-zinc-700/30 bg-zinc-800/50 p-3 duration-100 hover:border-zinc-800 hover:bg-zinc-800 active:border-zinc-700",
        className
      )}
    >
      {children}
    </Link>
  );
};

export { CardItem };
