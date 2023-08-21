/* eslint-disable @next/next/no-img-element */
"use client";

import { Database } from "@/types/supabase";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { RxGlobe, RxPerson, RxPlus, RxStar } from "react-icons/rx";
import {
  BackButton,
  Button,
  Card,
  CardFooter,
  Divider,
  Heading,
  Input,
  Paragraph,
  SubHeading,
  Transition,
} from "@/components/ui";
import { current } from "@reduxjs/toolkit";
import { routes } from "@/constants";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import addAlpha from "@/utils/addAlphaHex";
import { text } from "stream/consumers";
import useDebounceQuery from "@/hooks/useDebounceQuery";
import { useSearchParams } from "next/navigation";
import SetCardItem from "./SetCardItem";

type Set = Database["public"]["Tables"]["sets"]["Row"];

export interface SetSelectorProps {
  sets: {
    featured: Set[];
    community: Set[];
    personal: Set[] | null | undefined;
  };
}

type Category = keyof SetSelectorProps["sets"];

type SetCategoryLabel = {
  name: keyof SetSelectorProps["sets"];
  icon?: ReactNode;
};

const SetSelector = ({ sets }: SetSelectorProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSet, setActiveSet] = useState<Category>("featured");
  const [query, setQuery] = useState("");
  const debounced = useDebounceQuery({ value: query, minLength: 0 });

  const setLabels: SetCategoryLabel[] = [
    { name: "featured", icon: <RxStar /> },
    { name: "community", icon: <RxGlobe /> },
  ];

  if (sets.personal) {
    setLabels.push({
      name: "personal",
      icon: <RxPerson />,
    });
  }

  return (
    <>
      <aside className="static top-12 flex h-fit flex-col gap-4 md:sticky md:my-12">
        <Heading>Sets</Heading>
        <Button
          className="w-full"
          icon={<RxPlus />}
          href={routes.sets.create.blank}
        >
          Create set
        </Button>
        <Divider className="my-0" />
        <div className="flex gap-2 !text-sm md:flex-col">
          {setLabels.map(({ name, icon }) => {
            return (
              <Button
                onClick={() => setActiveSet(name)}
                key={name}
                icon={icon}
                variant={activeSet === name ? "primary" : "secondary"}
                className={twMerge(
                  "w-full capitalize",
                  activeSet === name && "shadow-lg shadow-indigo-700/50"
                )}
              >
                {name}
              </Button>
            );
          })}
        </div>
      </aside>
      <Card className="w-full flex-col gap-4">
        <Input
          label="Search"
          className="col-end-auto"
          value={query}
          onInput={(e) => setQuery(e.currentTarget.value)}
        />
        <motion.div className="grid grid-flow-row-dense grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {sets[activeSet]!.filter((set) =>
              set.name.toLowerCase().includes(debounced)
            ).map((set, index) => (
              <SetCardItem set={set} key={set.id + activeSet} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Card>
    </>
  );
};

export default SetSelector;
