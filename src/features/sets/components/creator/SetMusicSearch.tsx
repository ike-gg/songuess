import SongItem from "@/components/music/SongItem";
import useDebounceQuery from "@/hooks/useDebounceQuery";
import { SearchQuerySong } from "@/types/musicApi/SearchQuery";
import { useState } from "react";
import { RxCheck, RxMagnifyingGlass, RxMinus, RxPlus } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import useSongQuery from "@/hooks/useSongQuery";
import {
  Button,
  CardFooter,
  Dialog,
  Heading,
  Input,
  Paragraph,
} from "@/components/ui";

interface Props {
  clickHandler: (s: SearchQuerySong) => void;
  className?: string;
  used?: SearchQuerySong | SearchQuerySong[];
}

const SetMusicSearch = ({ clickHandler, className, used }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceQuery({ value: query, debounceTime: 500 });

  const { error, isLoading, songs } = useSongQuery(debouncedQuery);

  const idsUsed = Array.isArray(used) ? used.map((song) => song.id) : used?.id;

  return (
    <>
      <Button
        size="small"
        onClick={() => setDialogOpen(true)}
        className={className}
        icon={<RxPlus />}
      >
        Add songs
      </Button>
      <Dialog handleState={setDialogOpen} state={dialogOpen}>
        <div>
          <Heading>Music search</Heading>
          <Paragraph>
            Using input below search for music, start typing and results will
            show up.
          </Paragraph>
        </div>
        <Input
          value={query}
          onInput={(e) => {
            setQuery(e.currentTarget.value);
          }}
          label="Song query"
          icon={<RxMagnifyingGlass />}
          loading={isLoading}
          error={error || undefined}
        />
        <div className="flex h-max max-h-80 flex-col gap-1.5 overflow-y-auto">
          {!error &&
            query !== "" &&
            songs.map((song) => {
              const isAdded = idsUsed?.includes(song.id);
              return (
                <SongItem
                  className={twMerge(
                    "cursor-pointer border border-transparent p-2 px-3 opacity-50 hover:bg-zinc-900/75",
                    isAdded && "border-zinc-700 bg-zinc-900 opacity-100"
                  )}
                  showArtist
                  shortName
                  showAlbum
                  showArtwork
                  showPreview
                  onClick={() => {
                    clickHandler(song);
                  }}
                  songData={song.attributes}
                  key={song.id}
                >
                  {isAdded ? <RxMinus /> : <RxPlus />}
                </SongItem>
              );
            })}
        </div>
        <CardFooter className="flex flex-row justify-end">
          <Button icon={<RxCheck />}>Save</Button>
        </CardFooter>
      </Dialog>
    </>
  );
};

export default SetMusicSearch;
