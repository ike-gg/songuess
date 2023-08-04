"use client";

import Motion from "@/components/providers/Motion";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: string;
  above?: ReactNode;
}

const HomeSectionHeader = ({ children, above }: Props) => {
  return (
    <Motion delay={0} duration={0.7}>
      {above && (
        <motion.div
          viewport={{ once: true, margin: "-100px" }}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
        >
          {above}
        </motion.div>
      )}
      <motion.h2
        className="bg-gradient-to-b from-indigo-500 to-indigo-600 bg-clip-text text-4xl font-semibold text-transparent"
        viewport={{ once: true, margin: "-100px" }}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
      >
        {children}
      </motion.h2>
    </Motion>
  );
};

export default HomeSectionHeader;
