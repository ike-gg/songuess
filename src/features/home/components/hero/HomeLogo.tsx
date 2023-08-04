"use client";

import { AnimatedLogo } from "@/components/ui";
import { motion } from "framer-motion";

const HomeLogo = () => {
  return (
    <motion.span
      drag
      dragSnapToOrigin
      dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
      className="z-50 text-8xl hover:cursor-grab active:cursor-grabbing md:text-[8rem]"
    >
      <AnimatedLogo className="rounded-[1.75rem]" />
    </motion.span>
  );
};

export default HomeLogo;
