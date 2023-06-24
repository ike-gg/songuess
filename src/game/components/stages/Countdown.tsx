import GameCard from "../GameCard";
import useCountdown from "@bradgarropy/use-countdown";
import Paragraph from "@/components/ui/content/Paragraph";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { gameActions } from "@/store/gameSlice";
import CircleProgress from "@/components/ui/CircleProgress";
import { useEffect } from "react";

const Countdown = () => {
  const dispatch = useAppDispatch();
  const { currRound } = useAppSelector((state) => state.game);

  const countdownTime = 3;

  const { seconds, isInactive } = useCountdown({
    seconds: countdownTime,
    onCompleted: () => {},
  });

  // using useEffect instead of onCompleted from
  // useCountdown because components needs to be
  // rendered before changing round status state.
  useEffect(() => {
    if (isInactive && seconds === 0)
      dispatch(gameActions.setRoundStatus("guessing"));
  });

  return (
    <GameCard key={"countdown"} className="flex-col items-center p-8">
      <Paragraph>
        {currRound === 0 ? "Game begin in..." : "Round begin in..."}
      </Paragraph>
      <div className="relative items-center justify-center bg-gradient-to-r ">
        <CircleProgress
          stroke="#404040"
          size={60}
          caption={String(seconds)}
          percents={((countdownTime - seconds + 1) / countdownTime) * 100}
        />
      </div>
    </GameCard>
  );
};

export default Countdown;