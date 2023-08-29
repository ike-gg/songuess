"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  duration?: number;
  delay?: number;
}

const Motion = ({ children, duration = 1.5, delay = 0.12 }: Props) => {
  return (
    <MotionConfig
      transition={{
        ease: [1, 0, 0, 1],
        duration,
        staggerChildren: delay,
      }}
    >
      {children}
    </MotionConfig>
  );
};

export default Motion;
