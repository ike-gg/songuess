import { ReactNode } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

const GameCard = ({ children, className, ...props }: Props) => {
  return (
    <motion.div
      {...props}
      className={twMerge(
        "relative m-2 flex max-w-md gap-4 overflow-hidden overflow-y-auto rounded-3xl border border-zinc-700/50 bg-zinc-800/50 p-6 shadow-xl shadow-zinc-900/30 backdrop-blur md:max-w-2xl md:p-8",
        className
      )}
      initial={{ opacity: 0, scale: 1.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default GameCard;
