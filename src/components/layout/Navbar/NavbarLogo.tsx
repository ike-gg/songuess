import Logo from "@/components/ui/Logo";
import Link from "next/link";

const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-medium text-indigo-800"
    >
      <span className="text-3xl">
        <Logo />
      </span>{" "}
      <span className="hidden md:block">SonGuess</span>
    </Link>
  );
};

export default NavbarLogo;
