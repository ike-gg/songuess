import Link from "next/link";
import { RxArrowLeft } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface Props {
  children: string;
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
      {children}
    </Link>
  );
};

export { BackButton };
