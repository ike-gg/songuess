/* eslint-disable @next/next/no-img-element */
"use client";

import {
  HTMLMotionProps,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ReactNode, useRef } from "react";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  basedElement?: boolean;
}

const ScrollingMarquee = ({
  children,
  direction = "left",
  speed = 1,
  basedElement = true,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: basedElement ? ref : undefined,
    offset: ["start end", "end start"],
  });

  const scrollSpring = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  });

  const speedRange = `-${100 * speed}%`;
  const outputRange =
    direction === "right" ? ["0%", speedRange] : [speedRange, "0%"];

  const scroll = useTransform(scrollSpring, [0, 1], outputRange);

  return (
    <div className="overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} ref={ref}>
        <motion.div style={{ x: scroll }} className="flex gap-6">
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollingMarquee;
