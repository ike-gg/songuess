import Heading from "@/components/ui/content/Heading";
import GameCard from "../GameCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Paragraph from "@/components/ui/content/Paragraph";
import SetListItem from "../../../components/sets/SetListItem";
import Button from "@/components/ui/Button";
import { gameActions } from "@/store/gameSlice";

const Results = () => {
  const { points, playlist } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  return (
    <GameCard key="preparing" className="max-w-2xl flex-col text-center md:p-6">
      <Heading>You&apos;re a true musical expert!</Heading>
      <Paragraph>You scored {points} points!</Paragraph>
      <Paragraph>Here&apos;s your playlist:</Paragraph>
      <div className="flex max-h-96 flex-col gap-4 overflow-y-auto rounded-lg bg-zinc-800 p-8 text-left">
        {playlist &&
          playlist.map((song) => {
            const { albumName, artistName, name } = song.attributes;
            return (
              <div key={song.id} className="">
                <Heading>{name}</Heading>
                <Paragraph>
                  {artistName} from {albumName}
                </Paragraph>
              </div>
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
