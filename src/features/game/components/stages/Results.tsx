import GameCard from "../GameCard";
import SongItem from "@/components/music/SongItem";
import { Button, Heading, Paragraph } from "@/components/ui";
import { useGameState } from "../../zstore/gameSlice";

const Results = () => {
  // const { points } = useAppSelector((state) => state.game);
  const playlist = useGameState((state) => state.config.playlist);
  const resetState = useGameState((state) => state.resetState);

  return (
    <GameCard
      key="preparing"
      className="flex-col text-center md:max-w-xl md:p-6"
    >
      <Heading>You&apos;re a true musical expert!</Heading>
      <Paragraph>You scored AA---- points!</Paragraph>
      <Paragraph>Here&apos;s your playlist:</Paragraph>
      <div className="flex max-h-96 flex-col overflow-y-auto rounded-lg text-left">
        {playlist &&
          playlist.map((song) => {
            return (
              <SongItem
                showAlbum
                showArtist
                showArtwork
                showPreview
                key={song.id}
                songData={song.attributes}
              />
            );
          })}
      </div>
      <Button
        className="w-full"
        variant="secondary"
        onClick={() => resetState()}
      >
        Play again
      </Button>
    </GameCard>
  );
};

export default Results;
