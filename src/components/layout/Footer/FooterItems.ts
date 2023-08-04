import { routes } from "@/constants";

interface Link {
  label: string;
  href: string;
}

interface FooterCategory {
  name: string;
  items: Link[];
}

const links: FooterCategory[] = [
  {
    name: "Game",
    items: [
      {
        label: "Set browser",
        href: routes.sets.browser,
      },
      {
        label: "Apple Music import",
        href: routes.sets.amimport,
      },
      {
        label: "Spotify import",
        href: routes.sets.spotify,
      },
      {
        label: "Create set",
        href: routes.sets.create.blank,
      },
    ],
  },
  {
    name: "Developers",
    items: [
      {
        label: "Project repo",
        href: "https://github.com/ike-gg/songuess",
      },
      {
        label: "Project author",
        href: "https://github.com/ike-gg",
      },
      {
        label: "Music API",
        href: "https://developer.apple.com/documentation/applemusicapi/",
      },
    ],
  },
];

export { links };
