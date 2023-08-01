"use client";

import {
  AnimatePresence,
  HTMLMotionProps,
  MotionProps,
  Target,
  motion,
} from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  state: boolean;
  className?: string;
  initial?: Target;
  animate?: Target;
  exit?: Target;
}

const Transition = ({
  children,
  state,
  className,
}: Props) => {
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          className={className}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Transition };
