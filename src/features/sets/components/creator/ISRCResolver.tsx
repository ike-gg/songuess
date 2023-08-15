import SongItem from "@/components/music/SongItem";
import { Button, CardFooter, Paragraph, SubHeading } from "@/components/ui";
import { SearchQuerySong } from "@/types/musicApi/SearchQuery";
import { SongAttributes } from "@/types/musicApi/Song";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  conflicts: {
    id: string;
    type: "songs";
    attributes: SongAttributes;
  }[][];
  setter: Dispatch<
    SetStateAction<
      {
        id: string;
        type: "songs";
        attributes: SongAttributes;
      }[][]
    >
  >;
  addHandler: (song: SearchQuerySong) => void;
}

const ISRCResolver = ({ conflicts, setter, addHandler }: Props) => {
  const [currentConflict, setCurrentConflict] = useState<
    {
      id: string;
      type: "songs";
      attributes: SongAttributes;
    }[]
  >(conflicts[0]);

  useEffect(() => {
    setCurrentConflict(conflicts[0]);
  }, [conflicts]);

  return (
    <>
      <SubHeading>Resolving conflicts ({conflicts.length} left)</SubHeading>
      <Paragraph>
        Conflicts arise from duplicated ISRC, making it impossible for automatic
        differentiation. Please choose the one that seems appropriate.
      </Paragraph>
      <div className="max-h-80 overflow-y-auto">
        {currentConflict.slice(0, 20).map((song) => {
          return (
            <SongItem
              showAlbum
              showArtist
              showArtwork
              showPreview
              key={song.id}
              className="hover:bg-zinc-800"
              songData={song.attributes}
              onClick={() => {
                setter((p) => p.slice(1));
                addHandler({
                  attributes: song.attributes,
                  id: song.id,
                  type: "song",
                });
              }}
            />
          );
        })}
      </div>
      <CardFooter>
        <Button onClick={() => setter((p) => p.slice(1))}>Skip</Button>
      </CardFooter>
    </>
  );
};

export default ISRCResolver;
