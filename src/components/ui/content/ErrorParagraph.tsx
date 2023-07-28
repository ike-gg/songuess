"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props {
  children: string;
  className?: string;
}

const ErrorParagraph = ({ children, className }: Props) => {
  const error = children;

  return (
    <motion.p
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className={twMerge("text-sm font-medium text-red-500", className)}
    >
      {error}
    </motion.p>
  );
};

export { ErrorParagraph };
