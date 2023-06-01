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
        "flex items-center gap-2 text-sm text-neutral-300 hover:text-neutral-500",
        className
      )}
    >
      <RxArrowLeft />
      {children}
    </Link>
  );
};

export default BackButton;
