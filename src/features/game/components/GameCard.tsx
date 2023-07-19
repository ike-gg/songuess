import { ReactNode } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

const GameCard = ({ children, className, ...props }: Props) => {
  const animateProps = typeof props.animate === "object" && props.animate;

  return (
    <motion.div
      {...props}
      className={twMerge(
        "relative m-4 flex max-w-md gap-4 overflow-hidden overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4 md:max-w-2xl md:p-6",
        className
      )}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, ...animateProps }}
      exit={{ opacity: 0, scale: 1.5 }}
    >
      {children}
    </motion.div>
  );
};

export default GameCard;
