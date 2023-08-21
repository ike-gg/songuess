"use client";

import {
  AnimatePresence,
  HTMLMotionProps,
  MotionProps,
  Target,
  motion,
} from "framer-motion";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  state: boolean;
  className?: string;
  initial?: Target;
  animate?: Target;
  exit?: Target;
}

const Transition = ({ children, state, className }: Props) => {
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          className={twMerge("overflow-hidden", className)}
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
