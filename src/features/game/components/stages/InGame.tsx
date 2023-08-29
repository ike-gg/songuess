import { useAppDispatch, useAppSelector } from "@/hooks";
import Countdown from "./Countdown";
import Guessing from "./Guessing";
import { RxCross2 } from "react-icons/rx";
import { gameActions } from "@/features/game/store/gameSlice";
import { Button } from "@/components/ui";
import { AnimatePresence } from "framer-motion";
import BackgroundImage from "../BackgroundImage";
import parseArtwork from "@/utils/parseArtwork";
import GameNavigator from "../gamenavigator/GameNavigator";
import GuessInput from "../GuessInput";
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
