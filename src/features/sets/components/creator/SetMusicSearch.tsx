import SongItem from "@/components/music/SongItem";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useDebounceQuery from "@/hooks/useDebounceQuery";
import { SearchQuerySong } from "@/types/musicApi/SearchQuery";
import { useState } from "react";
import { RxCheck, RxMagnifyingGlass, RxMinus, RxPlus } from "react-icons/rx";
import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import Card from "@/components/ui/Card/Card";
import Heading from "@/components/ui/content/Heading";
import Paragraph from "@/components/ui/content/Paragraph";
import CardFooter from "@/components/ui/Card/CardFooter";
import useSongQuery from "@/hooks/useSongQuery";
import { CgSpinner } from "react-icons/cg";

interface Props {
  clickHandler: (s: SearchQuerySong) => void;
  className?: string;
  used?: SearchQuerySong | SearchQuerySong[];
}

const SetMusicSearch = ({ clickHandler, className, used }: Props) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceQuery({ value: query, debounceTime: 500 });

  const { error, isLoading, songs } = useSongQuery(debouncedQuery);

  const idsUsed = Array.isArray(used) ? used.map((song) => song.id) : used?.id;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="small" className={className} icon={<RxPlus />}>
          Add songs
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70" />
        <Dialog.Content className="fixed left-1/2 top-1/2 mx-auto w-full max-w-2xl -translate-x-1/2 -translate-y-1/2">
          <Card>
            <div>
              <Heading>Music search</Heading>
              <Paragraph>
                Using input below search for music, start typing and results
                will show up.
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
              <Dialog.Close asChild>
                <Button icon={<RxCheck />}>Save</Button>
              </Dialog.Close>
            </CardFooter>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SetMusicSearch;
