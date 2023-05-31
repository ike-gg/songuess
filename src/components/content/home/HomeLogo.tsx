"use client";

import { motion } from "framer-motion";

import Logo from "../../ui/Logo";

const HomeLogo = () => {
  return (
    <motion.span
      drag
      dragSnapToOrigin
      dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
      className="text-8xl hover:cursor-grab active:cursor-grabbing md:text-[8rem]"
    >
      <Logo />
    </motion.span>
  );
};

export default HomeLogo;
