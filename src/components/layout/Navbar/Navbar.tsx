import NavbarUser from "./NavbarUser";
import NavbarLinks from "./NavbarLinks";
import { twMerge } from "tailwind-merge";
import { LogoName } from "@/components/ui";

interface Props {
  displayLinks?: boolean;
  className?: string;
}

const Navbar = ({ displayLinks = true, className }: Props) => {
  return (
    <nav
      className={twMerge(
        "flex grid-cols-3 items-center justify-between p-4 md:grid md:p-8",
        !displayLinks && "grid-cols-2",
        className
      )}
    >
      <LogoName />
      {displayLinks && <NavbarLinks />}
      <NavbarUser />
    </nav>
  );
};

export default Navbar;
