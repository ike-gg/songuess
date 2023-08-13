import { useAppDispatch, useAppSelector } from "@/hooks";
import Similarity from "./Similarity";
import { Button, CircleProgress } from "@/components/ui";
import useCountdown from "@bradgarropy/use-countdown";
import { useEffect } from "react";
import { gameActions } from "@/features/game/store/gameSlice";
import { RxTrackNext } from "react-icons/rx";

const GuessingState = () => {
  const dispatch = useAppDispatch();
  const { currRound, maxRounds, round, roundTime } = useAppSelector(
    (state) => state.game
  );
  const { status } = round;

  const { seconds, minutes, pause, isInactive } = useCountdown({
    seconds: roundTime,
  });

  useEffect(() => {
    if (status === "guessed") pause();
  }, [status, pause]);

  useEffect(() => {
    if (isInactive && seconds === 0 && minutes === 0)
      dispatch(gameActions.setRoundStatus("timeout"));
  });

  return (
    <div className="mx-3 flex items-center gap-3">
      <Similarity />
      <CircleProgress
        percents={((roundTime - seconds + 1) / roundTime) * 100}
        caption={<p className="text-sm">{seconds}</p>}
        size={35}
        stroke={"#FFFFFF"}
      />
      <p className="text-sm uppercase">
        <span className="opacity-50">round</span> {currRound + 1}/{maxRounds}
      </p>
      <Button
        variant="navigator"
        icon={<RxTrackNext />}
        onClick={() => {
          dispatch(gameActions.setRoundStatus("timeout"));
        }}
      />
    </div>
  );
};

export default GuessingState;
