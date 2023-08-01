"use client";

import { Database } from "@/types/supabase";
import SetListItem from "./SetListItem";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import usePagination from "@/hooks/usePagination";
import { RxMagnifyingGlass, RxPlus } from "react-icons/rx";
import {
  BackButton,
  Button,
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

type SetCategory = keyof SetSelectorProps["sets"];

const SetSelector = ({ sets }: SetSelectorProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSet, setActiveSet] = useState<SetCategory>("featured");
  const [query, setQuery] = useState("");

  const setNames: SetCategory[] = ["featured", "community"];

  if (sets.personal) {
    setNames.push("personal");
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
          {setNames.map((setName) => {
            return (
              <Button
                onClick={() => setActiveSet(setName)}
                key={setName}
                size="small"
                variant={activeSet === setName ? "primary" : "secondary"}
                className="capitalize"
              >
                {setName}
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
        <div className="flex items-center justify-between">
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
        </div>
      )}
    </>
  );
};

export default SetSelector;
