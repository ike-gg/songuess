"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const ErrorParagraph = ({ children, className }: Props) => {
  const error = children;

  return (
    <p className={twMerge("text-sm font-medium text-red-500", className)}>
      {error}
    </p>
  );
};

export { ErrorParagraph };
