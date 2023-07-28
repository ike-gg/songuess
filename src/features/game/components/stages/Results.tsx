import GameCard from "../GameCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { gameActions } from "@/features/game/store/gameSlice";
import SongItem from "@/components/music/SongItem";
import { Button, Heading, Paragraph } from "@/components/ui";

const Results = () => {
  const { points, playlist } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  return (
    <GameCard key="preparing" className="max-w-2xl flex-col text-center md:p-6">
      <Heading>You&apos;re a true musical expert!</Heading>
      <Paragraph>You scored {points} points!</Paragraph>
      <Paragraph>Here&apos;s your playlist:</Paragraph>
      <div className="flex max-h-96 flex-col overflow-y-auto rounded-lg bg-zinc-800 text-left">
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
        className="mt-4"
        onClick={() => dispatch(gameActions.restartState())}
      >
        Play again
      </Button>
    </GameCard>
  );
};

export default Results;
