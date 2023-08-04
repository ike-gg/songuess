import { ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const HomeSectionWrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "mx-auto flex max-w-screen-md flex-col gap-12 px-3 py-12 md:py-24",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

HomeSectionWrapper.displayName = "homesectionwrapper";

export default HomeSectionWrapper;
