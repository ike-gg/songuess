import Button from "@/components/ui/Button";
import CircleProgress from "@/components/ui/CircleProgress";
import MotionWrapper from "@/components/ui/wrappers/MotionWrapper";
import { useAppSelector } from "@/hooks";
import { gameActions } from "@/features/game/store/gameSlice";
import parseArtwork from "@/utils/parseArtwork";
import useCountdown from "@bradgarropy/use-countdown";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HeaderPanel = () => {
  const dispatch = useDispatch();
  const { currRound, maxRounds, round, roundTime } = useAppSelector(
    (state) => state.game
  );
  const { status, currentSong } = round;

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

  if (!currentSong) return null;
  const { artwork } = currentSong.attributes;
  const { primColor, bgColor } = parseArtwork(artwork);

  return (
    <header className="flex h-8 justify-between text-sm font-bold uppercase">
      <p>
        round {currRound + 1}/{maxRounds}
      </p>
      <AnimatePresence mode={"wait"}>
        {status === "guessing" && (
          <MotionWrapper className="flex gap-2">
            <CircleProgress
              key={"roundTimer"}
              size={32}
              strokeWidth={10}
              stroke={primColor}
              percents={((roundTime - seconds + 1) / roundTime) * 100}
              caption={String(seconds)}
            />
          </MotionWrapper>
        )}
        {status === "timeout" && (
          <motion.p
            key={"circleProgress"}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            TIME OUT
          </motion.p>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderPanel;
