import { HiSparkles } from "react-icons/hi2";
import FeaturesCard from "./FeaturesCard";
import { Badge, Heading, Paragraph, SubHeading } from "@/components/ui";
import {
  useScroll,
  motion,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";

const FeatureLevels = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progressCard = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  useMotionValueEvent(progressCard, "change", (v) => {
    if (v >= 0.25 && v <= 0.5) setLevel(1);
    else if (v >= 0.5 && v <= 0.75) setLevel(2);
    else if (v >= 0.75 && v <= 1) setLevel(3);
    else setLevel(0);
  });

  const colors: Record<number, string> = {
    0: "#27272a",
    1: "#34d39980",
    2: "#60a5fa80",
    3: "#c084fc80",
  };

  return (
    <FeaturesCard ref={containerRef}>
      <motion.div
        className="absolute bottom-0 left-0 z-0 h-full w-full origin-bottom bg-zinc-800"
        style={{ scaleY: progressCard }}
        animate={{ backgroundColor: colors[level] }}
        transition={{ delay: 0, duration: 0.2 }}
      />
      <motion.div className="w-fit" animate={{ scale: [1, 1 + level / 3, 1] }}>
        <HiSparkles className="relative mb-6 text-3xl" />
      </motion.div>
      <SubHeading className="relative">Level Up</SubHeading>
      <Paragraph>
        Play and level up to ascend the leaderboard and showcase your music
        knowledge to the world!
      </Paragraph>
      <Badge className="absolute right-0 top-0 m-3">SOON</Badge>
    </FeaturesCard>
  );
};

export default FeatureLevels;
