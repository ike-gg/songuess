"use client";

import { Database } from "@/types/supabase";
import SetListItem from "./SetListItem";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import usePagination from "@/hooks/usePagination";
import {
  RxGlobe,
  RxMagnifyingGlass,
  RxPerson,
  RxPlus,
  RxStar,
} from "react-icons/rx";
import {
  BackButton,
  Button,
  CardFooter,
  Heading,
  Input,
  Paragraph,
  Transition,
} from "@/components/ui";
import { current } from "@reduxjs/toolkit";

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

  const {
    currentPage,
    currentSlice,
    nextPage,
    prevPage,
    nextPageAvailable,
    prevPageAvailable,
    paginationAvailable,
  } = usePagination({
    items: sets[activeSet] ?? [],
    itemsPerPage: 5,
    query,
    queryFn: (query: string) => {
      const items = sets[activeSet];
      if (!items) return [];
      return items.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      );
    },
  });

  return (
    <>
      <nav className="flex items-start justify-between">
        <BackButton href="/">Back to main page</BackButton>
        <Button href="/sets/create" size="small" icon={<RxPlus />}>
          Create set
        </Button>
      </nav>
      <div>
        <Heading>Select music set</Heading>
        <Paragraph>
          Choose tracks set, browse from featured and community playlists or
          even create your own!
        </Paragraph>
      </div>
      <div className="flex justify-between gap-8 overflow-auto">
        <div className="flex gap-2">
          {setLabels.map(({ name, icon }) => {
            return (
              <Button
                onClick={() => setActiveSet(name)}
                key={name}
                size="small"
                icon={icon}
                variant={activeSet === name ? "primary" : "secondary"}
                className="capitalize"
              >
                {name}
              </Button>
            );
          })}
        </div>
        <div>
          <Button
            size="small"
            variant={searchOpen ? "primary" : "secondary"}
            onClick={() => {
              setSearchOpen((p) => !p);
            }}
            icon={<RxMagnifyingGlass />}
          >
            Search
          </Button>
        </div>
      </div>
      <Transition className="-my-2.5" state={searchOpen}>
        <Input
          className="my-2 text-base"
          icon={<RxMagnifyingGlass />}
          label={"Search set"}
          placeholder="Name of set"
          onInput={(e) => setQuery(e.currentTarget.value)}
          value={query}
        />
      </Transition>
      <div className="flex flex-col gap-3">
        {currentSlice &&
          currentSlice.map((set) => {
            return <SetListItem key={set.id} set={set} />;
          })}
      </div>
      {paginationAvailable && (
        <CardFooter className="flex flex-row items-center justify-between">
          <Button
            variant="secondary"
            onClick={prevPage}
            disabled={!prevPageAvailable}
            className="shrink"
          >
            Previous
          </Button>
          <Button disabled variant="secondary">
            {currentPage}
          </Button>
          <Button
            variant="secondary"
            onClick={nextPage}
            disabled={!nextPageAvailable}
            className="w-min shrink"
          >
            Next
          </Button>
        </CardFooter>
      )}
    </>
  );
};

export default SetSelector;
