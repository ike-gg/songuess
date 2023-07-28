import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href?: string;
  children?: ReactNode;
}

const CardItem = ({ href, children }: Props) => {
  return (
    <Link
      href={href || ""}
      className="flex items-center gap-3 rounded-md border border-zinc-700/30 bg-zinc-800/50 p-3 duration-100 hover:border-zinc-800 hover:bg-zinc-800 active:border-zinc-700"
    >
      {children}
    </Link>
  );
};

export {CardItem};
