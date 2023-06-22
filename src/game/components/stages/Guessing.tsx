import { useAppDispatch, useAppSelector } from "@/hooks";
import GameCard from "../GameCard";
import { Fragment, useEffect, useRef } from "react";
import parseArtwork from "@/utils/parseArtwork";
import addAlpha from "@/utils/addAlphaHex";
import Player from "../Player";
import BackgroundImage from "../BackgroundImage";
import GamePanel from "../gamepanel/GamePanel";
import MotionWrapper from "@/components/ui/wrappers/MotionWrapper";
import { AnimatePresence } from "framer-motion";

const Guessing = () => {
  const inputGuessRef = useRef<HTMLInputElement>(null);

  const { currentSong } = useAppSelector((state) => state.game.round);

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
    <>
      <BackgroundImage
        key={`bg${id}`}
        src={artworkUrl.small}
        color={primColor}
      />
      <GameCard
        key={`gameBoard${id}`}
        className="flex-col border-transparent bg-transparent p-5 shadow-transparent md:w-full md:flex-row md:p-6"
        style={{
          backgroundColor: addAlpha(bgColor, 0.3),
          color: primColor,
        }}
        onClick={handleFocusToInput}
      >
        <Player />
        <GamePanel ref={inputGuessRef} />
      </GameCard>
    </>
  );
};

export default Guessing;
