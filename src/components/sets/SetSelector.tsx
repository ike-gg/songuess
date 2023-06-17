"use client";

import Card from "@/components/ui/wrappers/Card/Card";
import { Database } from "@/types/supabase";
import SetListItem from "./SetListItem";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Heading from "@/components/ui/content/Heading";
import Paragraph from "@/components/ui/content/Paragraph";
import { AnimatePresence } from "framer-motion";

type Set = Database["public"]["Tables"]["sets"]["Row"];

interface Props {
  communitySets: Set[] | null;
  featuredSets: Set[] | null;
  userSets: Set[] | null;
}

const SetSelector = ({ communitySets, featuredSets, userSets }: Props) => {
  const [activeSet, setActiveSet] = useState(0);
  const sets = [featuredSets, communitySets, userSets];

  return (
    <Card>
      <div>
        <Heading>Select music set</Heading>
        <Paragraph>
          Choose tracks set, browse from featured and community playlists or
          even create your own!
        </Paragraph>
      </div>
      <div className="flex gap-2">
        {["Featured", "Community", "Your"].map((setName, setIndex) => {
          return (
            <button
              onClick={() => setActiveSet(setIndex)}
              key={setName + setIndex}
              className={twMerge(
                "rounded-full bg-zinc-800 p-1 px-3 text-zinc-500 transition-colors",
                activeSet === setIndex && "bg-indigo-600 text-white"
              )}
            >
              {setName}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {sets[activeSet] &&
            sets[activeSet]!.map((set) => {
              return <SetListItem key={set.id} set={set} />;
            })}
          {!sets[activeSet] && <p>nothing found.. 😥</p>}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default SetSelector;
