import GameCard from "../GameCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { gameActions } from "@/features/game/store/gameSlice";
import SongItem from "@/components/music/SongItem";
import { Button, Heading, Paragraph } from "@/components/ui";

const Results = () => {
  const { points, playlist } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  return (
    <GameCard
      key="preparing"
      className="flex-col text-center md:max-w-xl md:p-6"
    >
      <Heading>You&apos;re a true musical expert!</Heading>
      <Paragraph>You scored {points} points!</Paragraph>
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
        onClick={() => dispatch(gameActions.restartState())}
      >
        Play again
      </Button>
    </GameCard>
  );
};

export default Results;
