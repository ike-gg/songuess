import { ReactNode } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

const GameNavigatorContainer = ({ children, ...props }: Props) => {
  return (
    <motion.div layoutId="gamenavigator_block" {...props}>
      {children}
    </motion.div>
  );
};

export default GameNavigatorContainer;
