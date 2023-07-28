"use client";

import { motion } from "framer-motion";

interface Props {
  percents: number;
  stroke?: string;
  emptyStroke?: string;
  emptyStrokeOpacity?: number;
  duration?: number;
  delay?: number;
  size?: number;
  strokeWidth?: number;
  caption?: string;
}

const CircleProgress = ({
  percents,
  stroke = "#F87BAD",
  emptyStroke = stroke,
  emptyStrokeOpacity = 0.2,
  duration = 1,
  delay = 0,
  size = 100,
  strokeWidth = 6,
  caption,
}: Props) => {
  const radius = 45;
  const circumference = Math.ceil(2 * Math.PI * radius);
  const fillPercents = Math.abs(
    Math.ceil((circumference / 100) * (percents - 100))
  );

  const transition = {
    duration: duration,
    delay: delay,
    ease: "linear",
  };

  const variants = {
    hidden: {
      strokeDashoffset: circumference,
      transition,
    },
    show: {
      strokeDashoffset: fillPercents,
      transition,
    },
  };

  return (
    <motion.div key={"circleProgress"} className="relative">
      {caption && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {caption}
        </p>
      )}
      <svg
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth - 4}
          stroke={emptyStroke}
          strokeOpacity={emptyStrokeOpacity}
          fill="transparent"
        />
      </svg>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{
          position: "absolute",
          top: "0",
          transform: "rotate(-90deg)",
          overflow: "visible",
        }}
      >
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          stroke={stroke}
          fill="transparent"
          strokeDashoffset={fillPercents}
          strokeDasharray={circumference}
          variants={variants}
          initial="hidden"
          animate={"show"}
        />
      </svg>
    </motion.div>
  );
};

export { CircleProgress };
