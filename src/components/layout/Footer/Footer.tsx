import { LogoName } from "@/components/ui";
import { links } from "./FooterItems";

const Footer = () => {
  return (
    <footer className="mb-24 flex items-start gap-10 p-8 md:p-12">
      <LogoName className="-translate-y-[5px]" />
      <nav className="flex gap-8">
        {links.map(({ items, name }) => {
          return (
            <ul className="flex flex-col gap-1.5" key={name + "footer"}>
              <h3 className="mb-2 opacity-60">{name}</h3>
              {items.map(({ href, label }) => {
                return (
                  <li
                    className="opacity-30 hover:opacity-50"
                    key={href + label}
                  >
                    <a href={href}>{label}</a>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;
