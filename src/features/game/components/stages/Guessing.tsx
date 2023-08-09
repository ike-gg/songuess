import { useAppDispatch, useAppSelector } from "@/hooks";
import GameCard from "../GameCard";
import { useEffect, useRef } from "react";
import parseArtwork from "@/utils/parseArtwork";
import addAlpha from "@/utils/addAlphaHex";
import Player from "../Player";
import BackgroundImage from "../BackgroundImage";
import GamePanel from "../gamepanel/GamePanel";
import { motion } from "framer-motion";

const Guessing = () => {
  const inputGuessRef = useRef<HTMLInputElement>(null);

  const { currentSong, isInputFocused } = useAppSelector(
    (state) => state.game.round
  );

  useEffect(() => {
    if (inputGuessRef.current) inputGuessRef.current.focus();
  }, [inputGuessRef]);

  if (!currentSong) return <p>current song empty</p>;

  const handleFocusToInput = () => {
    inputGuessRef.current?.focus();
  };

  const { id, attributes } = currentSong;
  const { artwork } = attributes;

  const { artworkUrl, bgColor, primColor } = parseArtwork(artwork);

  return (
    <GameCard
      className="flex-col border-transparent bg-transparent p-5 shadow-transparent md:w-full md:flex-row md:p-6"
      style={{
        backgroundColor: addAlpha(bgColor, 0.25),
        color: primColor,
      }}
      onMouseUp={handleFocusToInput}
    >
      <Player />
      <GamePanel ref={inputGuessRef} />
    </GameCard>
  );
};

export default Guessing;
