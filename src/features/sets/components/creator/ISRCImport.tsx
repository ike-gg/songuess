import {
  Button,
  Dialog,
  Paragraph,
  SubHeading,
  WarningBlock,
} from "@/components/ui";
import getSongsByISRC from "@/lib/getSongsByISRC";
import { SearchQuerySong } from "@/types/musicApi/SearchQuery";
import { SongAttributes } from "@/types/musicApi/Song";
import { useEffect, useState } from "react";
import ISRCResolver from "./ISRCResolver";

interface Props {
  isrcs: {
    album: string;
    isrc: string;
  }[];
  addHandler: (song: SearchQuerySong) => void;
}

const ISRCImport = ({ isrcs, addHandler }: Props) => {
  const [progress, setProgress] = useState(0);
  const [notFound, setNotFound] = useState(0);
  const [found, setFound] = useState(0);

  const [finished, setFinished] = useState(false);

  const [dialogState, setDialogState] = useState(false);
  const [conflicts, setConflicts] = useState<
    {
      id: string;
      type: "songs";
      attributes: SongAttributes;
    }[][]
  >([]);

  const fetchSong = async (isrc: string, _albumName: string) => {
    const albumName = _albumName.toLowerCase();
    const songs = await getSongsByISRC(isrc);

    if (songs.length === 0) {
      setNotFound((p) => p + 1);
      return;
    }

    const exact = songs.find(
      (i) => i.attributes.albumName.toLowerCase() === albumName
    );

    if (!exact) {
      setConflicts((p) => [...p, songs]);
      return;
    }

    setFound((p) => p + 1);
    addHandler(exact);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      setProgress(0);
      setFound(0);
      setNotFound(0);
      setConflicts([]);

      for (const { album, isrc } of isrcs) {
        setProgress((p) => p + 1);
        await fetchSong(isrc, album);
      }

      setFinished(true);
    };

    fetchSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (finished && conflicts.length === 0) return null;

  return (
    <>
      <Dialog
        state={dialogState && conflicts.length > 0}
        handleState={setDialogState}
      >
        <ISRCResolver
          addHandler={addHandler}
          conflicts={conflicts}
          setter={setConflicts}
        />
      </Dialog>
      <div className="flex flex-col rounded-md bg-yellow-900/30 p-4 px-6 text-center text-sm font-medium text-yellow-500 shadow-lg shadow-yellow-800/10">
        <SubHeading>Importing your playlist from Spotify</SubHeading>
        <Paragraph>
          This might take a moment, but you can keep track of the import
          progress in the tracklist. Additionally, please note that a few songs
          might not be found.
        </Paragraph>
        <p className="p-2 text-2xl font-semibold">
          {progress}/{isrcs.length}
        </p>
        <div className="flex justify-center gap-2">
          <p className="rounded-md bg-yellow-900 p-2 px-4">✅ Found: {found}</p>
          <p className="rounded-md bg-yellow-900 p-2 px-4">
            ❌ Not found: {notFound}
          </p>
          <p className="rounded-md bg-yellow-900 p-2 px-4">
            ⚠️ Conflicts: {conflicts.length}
          </p>
        </div>
        {finished && conflicts.length > 0 && (
          <div className="my-2 flex justify-center gap-2">
            <>
              <Button variant="danger" onClick={() => setConflicts([])}>
                Dismiss
              </Button>
              <Button variant="white" onClick={() => setDialogState(true)}>
                Resolve conflicts 🔧
              </Button>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default ISRCImport;
