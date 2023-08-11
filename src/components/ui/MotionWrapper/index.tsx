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
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { MotionWrapper };
