import Link from "next/link";
import { ReactNode } from "react";
import { RxArrowLeft } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  href: string;
  className?: string;
}

const BackButton = ({ children, href, className }: Props) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "group flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-400",
        className
      )}
    >
      <RxArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
      <div>{children}</div>
    </Link>
  );
};

export { BackButton };
