"use client";

import Motion from "@/components/providers/Motion";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

const HomeSectionContent = ({ children, className }: Props) => {
  return (
    <Motion delay={0.2} duration={1}>
      <motion.div
        viewport={{ once: true, margin: "-100px" }}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className={twMerge("", className)}
      >
        {children}
      </motion.div>
    </Motion>
  );
};

export default HomeSectionContent;
