import { Button } from "@/components/ui";
import GameNavigatorContainer from "../GameNavigatorContainer";
import { AnimatePresence, motion } from "framer-motion";
import { RxArrowRight, RxCross2 } from "react-icons/rx";
import { ReactNode, forwardRef } from "react";
import GuessingState from "./GuessingState";
import GuessedState from "./GuessedState";
import NavigatorDivider from "../NavigatorDivider";
import TimeoutState from "./TimeoutState";
import SongMusicState from "./SongMusicState";
import { useGameState } from "@/features/game/zstore/gameSlice";

const NavigatorItemWrapper = forwardRef<
  HTMLDivElement,
  { children: ReactNode }
>(({ children }, ref) => {
  return (
    <motion.div
      layout
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring" }}
    >
      {children}
    </motion.div>
  );
});

NavigatorItemWrapper.displayName = "itemwrapper";

const GuessingNavigator = () => {
  const { song, status } = useGameState((state) => state.round);
  const nextRound = useGameState((state) => state.nextRound);
  const resetState = useGameState((state) => state.resetState);

  if (!song) return <p>not found</p>;

  return (
    <GameNavigatorContainer
      className="absolute top-4 overflow-hidden border border-zinc-700/50 bg-zinc-800/50 shadow-lg shadow-zinc-900/20 backdrop-blur"
      initial={{ borderRadius: 35 }}
      animate={{ borderRadius: 35 }}
      exit={{ width: 60, borderRadius: 35, height: 56 }}
    >
      <motion.div
        key="gamenavigator_guessing_content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap p-2"
      >
        <AnimatePresence mode="popLayout">
          {(status === "guessed" || status === "timeout") && (
            <NavigatorItemWrapper key="nextround_button">
              <Button
                variant="navigator"
                className="bg-zinc-100 text-zinc-800 hover:bg-zinc-300 active:border-zinc-100 active:bg-zinc-300"
                icon={<RxArrowRight />}
                onClick={() => nextRound()}
              />
            </NavigatorItemWrapper>
          )}
          {status === "guessing" && (
            <NavigatorItemWrapper key="guessingState">
              <GuessingState />
            </NavigatorItemWrapper>
          )}
          {status === "guessed" && (
            <NavigatorItemWrapper key="guessedState">
              <GuessedState />
            </NavigatorItemWrapper>
          )}
          {status === "timeout" && (
            <NavigatorItemWrapper key="timeoutState">
              <TimeoutState />
            </NavigatorItemWrapper>
          )}
          <NavigatorDivider key="dividerGameState" />
          {status !== "countdown" && (
            <NavigatorItemWrapper key="audioState">
              <SongMusicState />
            </NavigatorItemWrapper>
          )}
          <NavigatorDivider key="dividerAudioState" />
          <NavigatorItemWrapper key="RxCross2restartState">
            <Button
              variant="navigator"
              className="text-red-600 hover:bg-red-600/20 active:bg-red-600/40"
              icon={<RxCross2 />}
              onClick={() => resetState()}
            />
          </NavigatorItemWrapper>
        </AnimatePresence>
      </motion.div>
    </GameNavigatorContainer>
  );
};

export default GuessingNavigator;
