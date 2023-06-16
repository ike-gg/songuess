import Link from "next/link";

const links = [
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Github",
    href: "/github",
  },
  {
    label: "Music Sets",
    href: "/sets",
  },
];

const NavbarLinks = () => {
  return (
    <div className="hidden justify-center gap-4 md:flex">
      {links.map(({ href, label }) => {
        return (
          <Link
            className="opacity-40 transition-opacity hover:opacity-100"
            key={label}
            href={href}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarLinks;
