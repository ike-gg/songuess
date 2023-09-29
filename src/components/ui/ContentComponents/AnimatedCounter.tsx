"use client";

import Motion from "@/components/providers/Motion";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props {
  value: number;
  className?: string;
}

const AnimatedCounter = ({ value, className }: Props) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        key={value}
        transition={{ duration: 0.25, ease: [1, 0, 0, 1] }}
        className={twMerge("", className)}
      >
        {value}
      </motion.div>
    </AnimatePresence>
  );
};

export { AnimatedCounter };
