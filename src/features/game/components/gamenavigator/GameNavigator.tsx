import { useAppSelector } from "@/hooks";
import CountdownNavigator from "./countdown/CountdownNavigator";
import GuessingNavigator from "./guessing/GuessingNavigator";
import { AnimatePresence } from "framer-motion";

const GameNavigator = () => {
  const { status } = useAppSelector((state) => state.game.round);

  return (
    <AnimatePresence mode="wait">
      {status === "countdown" && (
        <CountdownNavigator key="gamenavigator_countdown" />
      )}
      {(status === "guessing" ||
        status === "guessed" ||
        status === "timeout") && (
        <GuessingNavigator key="gamenavigator_guessing" />
      )}
    </AnimatePresence>
  );
};

export default GameNavigator;
