/* eslint-disable @next/next/no-img-element */
"use client";

import { Database } from "@/types/supabase";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  RxGlobe,
  RxMagnifyingGlass,
  RxPerson,
  RxPlus,
  RxReset,
  RxStar,
} from "react-icons/rx";
import {
  Button,
  Card,
  Divider,
  Heading,
  Input,
  Paragraph,
  SubHeading,
  Transition,
} from "@/components/ui";
import { SetCategories, routes } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import useDebounceQuery from "@/hooks/useDebounceQuery";
import { useRouter, useSearchParams } from "next/navigation";
import SetCardItem from "./SetCardItem";

type Set = Database["public"]["Tables"]["sets"]["Row"];

export interface SetSelectorProps {
  sets: {
    featured: Set[];
    community: Set[];
    personal: Set[] | null | undefined;
  };
}

type SetCategoryLabel = {
  name: SetCategories;
  icon?: ReactNode;
};

const SetSelector = ({ sets }: SetSelectorProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") as SetCategories;
  const paramsQuery = searchParams.get("query");

  const [searchOpen, setSearchOpen] = useState(paramsQuery ? true : false);
  const [activeSet, setActiveSet] = useState<SetCategories>(category);
  const [query, setQuery] = useState(paramsQuery || "");
  const debounced = useDebounceQuery({ value: query, minLength: 0 });

  const currentSet = useMemo(() => {
    const newSet = sets[activeSet];
    if (!newSet) return newSet;

    const filteredSet = newSet.filter((set) => {
      const inQuery = debounced.toLowerCase();
      const description = set.description?.toLowerCase();
      const name = set.description?.toLowerCase();

      return description?.includes(inQuery) || name?.includes(inQuery);
    });

    if (filteredSet.length === 0) return null;

    return filteredSet;
  }, [activeSet, sets, debounced]);

  useEffect(() => {
    router.replace(routes.sets.browser(activeSet, debounced));
  }, [activeSet, debounced, router]);

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
      <aside className="static top-12 flex h-fit max-h-screen w-full flex-col gap-4 md:sticky md:w-full md:max-w-[18rem]">
        <div className="flex items-center justify-between">
          <Heading>Sets</Heading>
          <div className="flex gap-2">
            <Button
              className="mt-auto w-full p-2 px-3"
              size="small"
              icon={<RxPlus />}
              href={routes.sets.create.blank}
            >
              Create
            </Button>
            <Button
              className="p-2"
              size="small"
              variant={searchOpen ? "primary" : "secondary"}
              onClick={() =>
                setSearchOpen((p) => {
                  const newState = !p;
                  if (!newState) setQuery("");
                  return newState;
                })
              }
              icon={<RxMagnifyingGlass />}
            />
          </div>
        </div>
        <Transition state={searchOpen}>
          <Input
            label="Search set"
            placeholder="Taylor Swift"
            className="col-end-auto"
            value={query}
            icon={<RxMagnifyingGlass />}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
        </Transition>
        <Divider className="my-0" />
        <div className="flex gap-3 md:flex-col">
          {setLabels.map(({ name, icon }) => {
            return (
              <Button
                onClick={() => setActiveSet(name)}
                key={name}
                icon={icon}
                mobileCol
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
        {!currentSet && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <SubHeading>Nothing found.</SubHeading>
            <Paragraph>Please try again.</Paragraph>
            <Button
              variant="danger"
              size="small"
              className="mt-5"
              onClick={() => setQuery("")}
              icon={<RxReset />}
            >
              Reset query
            </Button>
          </div>
        )}
        {currentSet && (
          <motion.div className="grid grid-flow-row-dense grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <AnimatePresence mode="popLayout">
              {currentSet.map((set, index) => (
                <SetCardItem set={set} key={set.id + activeSet} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Card>
    </>
  );
};

export default SetSelector;
