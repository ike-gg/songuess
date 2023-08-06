import Link from "next/link";
import { Logo } from "./Logo";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

const LogoName = ({ className }: Props) => {
  return (
    <Link
      href="/"
      className={twMerge(
        "flex items-center gap-2 text-lg font-medium",
        className
      )}
    >
      <span className="text-3xl">
        <Logo />
      </span>{" "}
      <span className="hidden bg-gradient-to-b from-indigo-500 to-indigo-600 bg-clip-text text-transparent md:block">
        SonGuess
      </span>
    </Link>
  );
};

export { LogoName };
