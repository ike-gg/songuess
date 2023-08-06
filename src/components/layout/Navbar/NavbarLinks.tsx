import { Badge } from "@/components/ui";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Link {
  label: string;
  href: string;
  disabled?: boolean;
}

const links: Link[] = [
  {
    label: "Leaderboard",
    href: "/",
    disabled: true,
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
    <nav className="mx-auto hidden w-fit justify-center overflow-hidden whitespace-nowrap rounded-lg border border-zinc-800/50 bg-zinc-800/40 px-1 py-1 text-sm backdrop-blur md:flex">
      {links.map(({ href, label, disabled }) => {
        return (
          <Link
            className={twMerge(
              "rounded-md px-3 py-1 opacity-40 transition-opacity",
              !disabled && "hover:bg-zinc-700/50 hover:opacity-100",
              disabled && "cursor-not-allowed hover:opacity-20"
            )}
            key={label}
            href={href}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavbarLinks;
