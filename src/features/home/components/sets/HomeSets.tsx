"use client";

import { Paragraph, SubHeading } from "@/components/ui";
import SetListItem from "@/features/sets/components/SetListItem";
import { Database } from "@/types/supabase";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import { RxGlobe, RxPerson, RxStar } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import * as HomeSection from "../shared/HomeSection";

const setsInfo = [
  {
    name: "Featured",
    desc: "Introducing collection of Featured Sets. These sets encompass the most iconic and thrilling tracks from various music genres.",
    icon: <RxStar />,
  },
  {
    name: "Community",
    desc: "You'll find playlists crafted by our community. With a diverse range of music tastes and preferences, these sets offer unlimited variety.",
    icon: <RxGlobe />,
  },
  {
    name: "Personal",
    desc: "Do you have favorite songs you'd love to share with the world? Share them with the community– it's your music, your rules!",
    icon: <RxPerson />,
  },
];

interface Props {
  sets: Database["public"]["Tables"]["sets"]["Row"][];
}

const HomeSets = ({ sets }: Props) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [markedSet, setMarkedSet] = useState<number>();
  const { scrollYProgress } = useScroll({
    target: refContainer,
    offset: ["start end", "end start"],
  });

  const scrollSets = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -400])
  );
  const reversedscrollSets = useSpring(
    useTransform(scrollYProgress, [0, 1], [-400, 0])
  );

  const setInfoAttention = useTransform(scrollYProgress, [0.3, 0.58], [0, 2]);

  useMotionValueEvent(setInfoAttention, "change", (latest) => {
    const floor = Math.floor(latest);
    if (floor !== markedSet) {
      setMarkedSet(floor);
    }
  });

  return (
    <HomeSection.Wrapper ref={refContainer} className="max-w-screen-lg">
      <div className="mx-auto flex max-w-2xl flex-col gap-2 text-center">
        <HomeSection.Header>Discover plenty of sets</HomeSection.Header>
        <HomeSection.Paragraph>
          We give you full control over your music experience. Enjoy pre-made
          playlists from various categories or have fun crafting your own.
        </HomeSection.Paragraph>
      </div>
      <HomeSection.Content className="flex flex-col gap-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {setsInfo.map(({ desc, icon, name }, setIndex) => {
            const shouldMark = markedSet === setIndex;
            return (
              <div
                className={twMerge(
                  "flex flex-col gap-2 rounded-xl p-8 opacity-80 shadow-2xl shadow-transparent transition-all duration-150",
                  "hover:bg-zinc-900 hover:opacity-100 hover:shadow-zinc-800/50",
                  shouldMark && "!bg-indigo-600 !opacity-100"
                )}
                key={name + "setdetails"}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  <SubHeading>{name}</SubHeading>
                </div>
                <Paragraph>{desc}</Paragraph>
              </div>
            );
          })}
        </div>
        <div className="grid h-64 w-full grid-cols-1 gap-4 overflow-hidden rounded-2xl bg-zinc-900 p-6 md:grid-cols-2">
          <motion.div className="flex flex-col gap-4" style={{ y: scrollSets }}>
            {sets.map((set) => (
              <SetListItem set={set} key={set.id} />
            ))}
          </motion.div>
          <motion.div
            className="hidden flex-col gap-4 md:flex"
            style={{ y: reversedscrollSets }}
          >
            {sets.map((set) => (
              <SetListItem set={set} key={set.id} />
            ))}
          </motion.div>
        </div>
      </HomeSection.Content>
    </HomeSection.Wrapper>
  );
};

export default HomeSets;
