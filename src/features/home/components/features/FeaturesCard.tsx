import { ReactNode, forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import Motion from "@/components/providers/Motion";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

const FeaturesCard = forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <Motion duration={0.8}>
        <motion.div
          ref={ref}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ margin: "-200px", once: true }}
          className={twMerge(
            "relative overflow-hidden rounded-xl bg-zinc-900 p-5",
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      </Motion>
    );
  }
);

FeaturesCard.displayName = "featuredcard";

export default FeaturesCard;
