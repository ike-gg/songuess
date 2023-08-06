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
        "flex items-center justify-between p-4 md:p-8",
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
