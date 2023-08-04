"use client";

import Motion from "@/components/providers/Motion";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props {
  children: string;
  className?: string;
}

const HomeSectionParagraph = ({ children, className }: Props) => {
  return (
    <Motion delay={0.2} duration={0.7}>
      <motion.p
        viewport={{ once: true, margin: "-100px" }}
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.6 }}
        className={twMerge("leading-tight", className)}
      >
        {children}
      </motion.p>
    </Motion>
  );
};

export default HomeSectionParagraph;
