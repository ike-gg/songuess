"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

const ErrorParagraph = ({ children, className, animate = true }: Props) => {
  const error = children;

  return (
    <motion.p
      initial={animate && { height: 0, opacity: 0 }}
      animate={animate && { height: "auto", opacity: 1 }}
      exit={animate ? { height: 0, opacity: 0, padding: 0 } : {}}
      className={twMerge("text-sm font-medium text-red-500", className)}
    >
      {error}
    </motion.p>
  );
};

export { ErrorParagraph };
