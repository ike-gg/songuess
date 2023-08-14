/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from "@/hooks";
import { gameActions } from "@/features/game/store/gameSlice";
import GameCard from "../GameCard";
import { BackButton, Badge, Button, Heading, Paragraph } from "@/components/ui";

const Preparing = () => {
  const { maxRounds, roundTime, set } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  if (!set) return null;

  const { cover, name, songs } = set;

  const availableRounds = [3, 5, 10, 15, 20].filter(
    (roundOption) => songs.length >= roundOption
  );

  return (
    <GameCard key="preparing" className="max-w-2xl flex-col md:flex-row md:p-6">
      <img src={cover || ""} className="rounded-lg md:h-40" alt="game cover" />
      <div className="flex flex-col gap-3">
        <BackButton href="/sets">Back to sets</BackButton>
        <Heading>{name}</Heading>
        <Paragraph>{songs.length} tracks</Paragraph>
        <Paragraph>Choose number of rounds</Paragraph>
        <div className="flex gap-2">
          {availableRounds.map((setRounds, index) => {
            return (
              <Button
                variant={setRounds === maxRounds ? "primary" : "secondary"}
                key={index + "roundSelector"}
                onClick={() => {
                  dispatch(gameActions.setRounds(setRounds));
                }}
              >
                {setRounds}
              </Button>
            );
          })}
        </div>
        <Paragraph>Choose time per round</Paragraph>
        <div className="flex gap-2">
          {[5, 15, 20, 30, 1200].map((setTime, index) => {
            return (
              <Button
                variant={setTime === roundTime ? "primary" : "secondary"}
                key={index + "timePicker"}
                onClick={() => dispatch(gameActions.setTimeRound(setTime))}
              >
                {setTime}
              </Button>
            );
          })}
        </div>
        <Button
          onClick={() => {
            dispatch(gameActions.startGame());
          }}
        >
          Play lll
        </Button>
      </div>
    </GameCard>
  );
};

export default Preparing;
