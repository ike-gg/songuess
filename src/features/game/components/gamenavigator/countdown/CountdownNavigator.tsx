import { CircleProgress } from "@/components/ui";
import GameNavigatorContainer from "../GameNavigatorContainer";
import { gameActions } from "@/features/game/store/gameSlice";
import { motion } from "framer-motion";
import useCountdown from "@bradgarropy/use-countdown";
import { useEffect } from "react";
import CountdownPreloadAudio from "./CountdownPreloadAudio";
import { useGameState } from "@/features/game/zstore/gameSlice";

const CountdownNavigator = () => {
  const beginGuessing = useGameState((state) => state.beginGuessing);

  const countdownTime = 3;

  const { seconds, isInactive } = useCountdown({
    seconds: countdownTime,
    onCompleted: () => {},
  });

  // using useEffect instead of onCompleted from
  // useCountdown because components needs to be
  // rendered before changing round status state.
  useEffect(() => {
    if (isInactive && seconds === 0) {
      beginGuessing();
    }
  });

  return (
    <GameNavigatorContainer
      className="absolute max-w-xs origin-center overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800/50 shadow-xl shadow-zinc-900/30 backdrop-blur"
      initial={{ width: 50, height: 50, borderRadius: 35 }}
      animate={{
        width: "auto",
        height: "auto",
        borderRadius: 75,
        transition: { delay: 0.2, type: "spring", stiffness: 100 },
      }}
      exit={{ width: 50, height: 50, borderRadius: 35 }}
    >
      <CountdownPreloadAudio />
      <motion.div
        key="gamenavigator_countdown_content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex origin-center flex-col items-center justify-center gap-2 p-4 text-center"
      >
        <CircleProgress
          stroke="#404040"
          size={60}
          caption={String(seconds)}
          percents={((countdownTime - seconds + 1) / countdownTime) * 100}
        />
      </motion.div>
    </GameNavigatorContainer>
  );
};

export default CountdownNavigator;
