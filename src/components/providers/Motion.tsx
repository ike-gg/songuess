"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  duration?: number;
}

const Motion = ({ children, duration = 1.5 }: Props) => {
  return (
    <MotionConfig
      transition={{
        ease: [1, 0, 0, 1],
        duration,
        staggerChildren: 0.12,
      }}
    >
      {children}
    </MotionConfig>
  );
};

export default Motion;
