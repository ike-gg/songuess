import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

const Paragraph = ({ children, className, ...props }: Props) => {
  return (
    <p {...props} className={twMerge("leading-tight opacity-60", className)}>
      {children}
    </p>
  );
};

export default Paragraph;
