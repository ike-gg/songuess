import { twMerge } from "tailwind-merge";

interface Props {
  children: string;
  href: string;
  className?: string;
}

const InlineLink = ({ children, href, className }: Props) => {
  return (
    <a className={twMerge(className)} href={href}>
      {children}
    </a>
  );
};

export default InlineLink;
