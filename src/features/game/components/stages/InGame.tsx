import { useAppDispatch, useAppSelector } from "@/hooks";
import Guessing from "./Guessing";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import CountdownNavigator from "../gamenavigator/countdown/CountdownNavigator";
import GuessingNavigator from "../gamenavigator/guessing/GuessingNavigator";

const InGame = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { status, currentSong } = useAppSelector((state) => state.game.round);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.focus();
  }, [ref]);

  if (!currentSong) return <p>lol not found music</p>;

  const { attributes, id } = currentSong;
  const { name } = attributes;

  const countdownStage = status === "countdown";

  return (
    <AnimatePresence>
      {/* <GameNavigator key="gamenavigator" /> */}
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
