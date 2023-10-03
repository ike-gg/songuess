/* eslint-disable @next/next/no-img-element */
import GameCard from "../GameCard";
import { BackButton, Button, Heading, Paragraph } from "@/components/ui";
import { routes } from "@/constants";
import { useGameState } from "../../store/gameSlice";

const Preparing = () => {
  const { loaded, rounds, time, set } = useGameState((state) => state.config);
  const setConfig = useGameState((state) => state.setConfig);
  const startGame = useGameState((state) => state.startGame);

  if (!loaded) return null;

  const { cover, name, songs } = set;

  const availableRounds = [3, 5, 10, 15, 20].filter(
    (roundOption) => songs.length >= roundOption
  );

  const availableTimes = [5, 15, 20, 30];
  process.env.NODE_ENV === "development" && availableTimes.push(1200);
  process.env.NODE_ENV === "development" && availableTimes.push(1);

  return (
    <GameCard key="preparing" className="max-w-2xl flex-col md:flex-row md:p-6">
      <img src={cover || ""} className="rounded-lg md:h-40" alt="game cover" />
      <div className="flex flex-col gap-3">
        <BackButton href={routes.sets.browser()}>Back to sets</BackButton>
        <Heading>{name}</Heading>
        <Paragraph>{songs.length} tracks</Paragraph>
        <Paragraph>Choose number of rounds</Paragraph>
        <div className="flex gap-2">
          {availableRounds.map((setRounds, index) => {
            return (
              <Button
                variant={setRounds === rounds ? "primary" : "secondary"}
                key={index + "roundSelector"}
                onClick={() => setConfig({ rounds: setRounds, time })}
              >
                {setRounds}
              </Button>
            );
          })}
        </div>
        <Paragraph>Choose time per round</Paragraph>
        <div className="flex gap-2">
          {availableTimes.map((setTime, index) => {
            return (
              <Button
                variant={setTime === time ? "primary" : "secondary"}
                key={index + "timePicker"}
                onClick={() => setConfig({ rounds, time: setTime })}
              >
                {setTime}
              </Button>
            );
          })}
        </div>
        <Button onClick={() => startGame()}>Play lll</Button>
      </div>
    </GameCard>
  );
};

export default Preparing;
