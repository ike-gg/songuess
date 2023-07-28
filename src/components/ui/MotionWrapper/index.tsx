"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
  distance?: number;
  delay?: number;
}

const MotionWrapper = ({
  children,
  distance = 20,
  delay = 0,
  ...props
}: Props) => {
  return (
    <motion.div
      initial={{ y: distance, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -distance, opacity: 0 }}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { MotionWrapper };
