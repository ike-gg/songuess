import NavbarUser from "./NavbarUser";
import NavbarLinks from "./NavbarLinks";
import NavbarLogo from "./NavbarLogo";
import { twMerge } from "tailwind-merge";

interface Props {
  displayLinks?: boolean;
}

const Navbar = ({ displayLinks = true }: Props) => {
  return (
    <nav
      className={twMerge(
        "flex grid-cols-3 items-center justify-between p-4 md:grid md:p-8",
        !displayLinks && "grid-cols-2"
      )}
    >
      <NavbarLogo />
      {displayLinks && <NavbarLinks />}
      {/* @ts-expect-error Async Server Component */}
      <NavbarUser />
    </nav>
  );
};

export default Navbar;
