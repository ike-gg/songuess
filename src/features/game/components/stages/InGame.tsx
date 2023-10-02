import { useAppDispatch, useAppSelector } from "@/hooks";
import Guessing from "./Guessing";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import CountdownNavigator from "../gamenavigator/countdown/CountdownNavigator";
import GuessingNavigator from "../gamenavigator/guessing/GuessingNavigator";
import { useGameState } from "../../zstore/gameSlice";

const InGame = () => {
  const { status, song } = useGameState((state) => state.round);

  if (!song) return <p>lol not found music</p>;

  return (
    <AnimatePresence>
      {status === "countdown" && (
        <CountdownNavigator key="gamenavigator_countdown" />
      )}
      {(status === "guessing" ||
        status === "guessed" ||
        status === "timeout") && (
        <GuessingNavigator key={`gamenavigator_guessing`} />
      )}
      {status !== "countdown" && <Guessing />}
    </AnimatePresence>
  );
};

export default InGame;
