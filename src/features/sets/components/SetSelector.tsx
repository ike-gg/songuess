"use client";

import { Database } from "@/types/supabase";
import SetListItem from "./SetListItem";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Heading from "@/components/ui/content/Heading";
import Paragraph from "@/components/ui/content/Paragraph";
import usePagination from "@/hooks/usePagination";
import { RxPlus } from "react-icons/rx";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";

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
  const [activeSet, setActiveSet] = useState<SetCategory>("featured");

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
      <div className="flex gap-2 overflow-auto">
        {setNames.map((setName) => {
          return (
            <button
              onClick={() => setActiveSet(setName)}
              key={setName}
              className={twMerge(
                "rounded-full bg-zinc-800 p-1 px-3 capitalize text-zinc-500 transition-colors",
                activeSet === setName && "bg-indigo-600 text-white"
              )}
            >
              {setName}
            </button>
          );
        })}
      </div>
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
            className="grow"
          >
            Previous
          </Button>
          <span className="grow-[50] text-center">{currentPage}</span>
          <Button
            variant="secondary"
            onClick={nextPage}
            disabled={!nextPageAvailable}
            className="grow"
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default SetSelector;
