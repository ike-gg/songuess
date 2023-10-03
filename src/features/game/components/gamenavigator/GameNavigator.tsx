import CountdownNavigator from "./countdown/CountdownNavigator";
import GuessingNavigator from "./guessing/GuessingNavigator";
import { AnimatePresence } from "framer-motion";
import { useGameState } from "../../store/gameSlice";

const GameNavigator = () => {
  const status = useGameState((state) => state.round.status);

  return (
    <AnimatePresence mode="wait">
      {status === "countdown" && (
        <CountdownNavigator key="gamenavigator_countdown" />
      )}
      {status !== "countdown" && (
        <GuessingNavigator key="gamenavigator_guessing" />
      )}
    </AnimatePresence>
  );
};

export default GameNavigator;
