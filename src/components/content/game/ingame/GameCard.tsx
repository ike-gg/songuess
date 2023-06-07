import { ReactNode } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

const GameCard = ({ children, className, ...props }: Props) => {
  return (
    <motion.div
      {...props}
      className={twMerge("h-44 w-44", className)}
      layoutId="gamecard_layout"
    >
      {children}
    </motion.div>
  );
};

export default GameCard;
