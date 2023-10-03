import GameCard from "../GameCard";
import SongItem from "@/components/music/SongItem";
import { Button, Heading, Paragraph } from "@/components/ui";
import { useGameState } from "../../store/gameSlice";

const Results = () => {
  const playlist = useGameState((state) => state.config.playlist);
  const resetState = useGameState((state) => state.resetState);
  const totalPoints = useGameState((state) => state.totalPoints);
  const points = useGameState((state) => state.points);

  return (
    <GameCard
      key="preparing"
      className="flex-col text-center md:max-w-xl md:p-6"
    >
      <Heading>You&apos;re a true musical expert!</Heading>
      <Paragraph>You scored {totalPoints} points!</Paragraph>
      <Paragraph>Here&apos;s your playlist:</Paragraph>
      <div className="flex max-h-96 flex-col overflow-y-auto rounded-lg text-left">
        {playlist &&
          playlist.map((song, index) => {
            const roundPoints = points[index];
            const isGuessed = !!roundPoints;
            return (
              <div
                key={song.id}
                className="flex items-center justify-between gap-2"
              >
                <SongItem
                  showAlbum
                  showArtist
                  showArtwork
                  showPreview
                  songData={song.attributes}
                />
                <div className="w-44 text-right text-xs">
                  <p>gained: {isGuessed ? roundPoints.gainedPoints : 0}</p>
                  <p>
                    guessed in:{" "}
                    {isGuessed ? (roundPoints.guessIn / 1000).toFixed(2) : "❌"}
                  </p>
                </div>
              </div>
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
