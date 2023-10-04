import Similarity from "./Similarity";
import { Button, CircleProgress } from "@/components/ui";
import useCountdown from "@bradgarropy/use-countdown";
import { useEffect } from "react";
import { RxTrackNext } from "react-icons/rx";
import { useGameState } from "@/features/game/store/gameSlice";

const GuessingState = () => {
  const { time, rounds, type } = useGameState((state) => state.config);
  const { current, status } = useGameState((state) => state.round);

  const timeout = useGameState((state) => state.timeout);

  const { seconds, minutes, pause, isInactive } = useCountdown({
    seconds: time,
  });

  useEffect(() => {
    if (status === "guessed") pause();
  }, [status, pause]);

  useEffect(() => {
    if (isInactive && seconds === 0 && minutes === 0) timeout();
  }, [isInactive, seconds, minutes, timeout]);

  return (
    <div className="ml-3 flex items-center gap-3">
      {type === "classic" && <Similarity />}
      <CircleProgress
        percents={((time - seconds + 1) / time) * 100}
        caption={<p className="text-sm">{seconds}</p>}
        size={35}
        stroke={"#FFFFFF"}
      />
      <p className="text-sm uppercase">
        <span className="opacity-50">round</span> {current + 1}/{rounds}
      </p>
      <Button
        variant="navigator"
        icon={<RxTrackNext />}
        onClick={() => timeout()}
      />
    </div>
  );
};

export default GuessingState;
