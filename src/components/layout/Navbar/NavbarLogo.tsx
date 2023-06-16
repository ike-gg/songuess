import Logo from "@/components/ui/Logo";
import Link from "next/link";

const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-medium">
      <span className="text-3xl">
        <Logo />
      </span>{" "}
      <span className="hidden bg-gradient-to-b from-indigo-500 to-indigo-700 bg-clip-text text-transparent md:block">
        SonGuess
      </span>
    </Link>
  );
};

export default NavbarLogo;
