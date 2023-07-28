"use client";

import Motion from "@/components/providers/Motion";
import splitWordsWithSpaces from "@/utils/splitWordsWithSpaces";
import { Variants, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props {
  children: string;
  className?: string;
}

const AnimatedText = ({ children, className }: Props) => {
  const words = splitWordsWithSpaces(children);

  const wordVariants: Variants = {
    show: { y: 0, opacity: 1 },
    hidden: { y: 50, opacity: 0 },
  };

  const animatedWords = words.map((word, index) => {
    return (
      <motion.span
        variants={wordVariants}
        className={twMerge("inline-block pb-1", className)}
        //
        key={word + index}
      >
        {word}
      </motion.span>
    );
  });
  return (
    <Motion>
      <motion.span
        initial="hidden"
        animate="show"
        className="block whitespace-pre-wrap "
      >
        {animatedWords}
      </motion.span>
    </Motion>
  );
};

export { AnimatedText };
