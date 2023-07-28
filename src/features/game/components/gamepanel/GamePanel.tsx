import { useAppDispatch, useAppSelector } from "@/hooks";
import parseArtwork from "@/utils/parseArtwork";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";
import GuessInput from "../GuessInput";
import { gameActions } from "@/features/game/store/gameSlice";
import HeaderPanel from "./HeaderPanel";
import FooterPanel from "./FooterPanel";
import { Heading, MotionWrapper, Paragraph } from "@/components/ui";

const GamePanel = forwardRef<HTMLInputElement>((_, ref) => {
  const { round, points } = useAppSelector((state) => state.game);
  const { status, currentSong } = round;
  const dispatch = useAppDispatch();

  if (!currentSong) return null;

  const { artwork, name, artistName, albumName } = currentSong.attributes;
  const { bgColor, primColor } = parseArtwork(artwork);

  return (
    <div className="flex flex-col justify-between gap-4 md:grow">
      <HeaderPanel />
      <AnimatePresence mode={"wait"}>
        {status === "guessing" && (
          <GuessInput
            key={"guessInput"}
            ref={ref}
            secretPhrase={name}
            onGuess={() => {
              dispatch(gameActions.setRoundStatus("guessed"));
            }}
            backgroundColor={bgColor}
            textColor={primColor}
          />
        )}
        {(status === "guessed" || status === "timeout") && (
          <MotionWrapper>
            <Heading className="text-inherit">{name}</Heading>
            <Paragraph className="text-inherit opacity-60">
              by {artistName} from {albumName}{" "}
            </Paragraph>
          </MotionWrapper>
        )}
      </AnimatePresence>
      <FooterPanel />
    </div>
  );
});

GamePanel.displayName = "GamePanel";

export default GamePanel;
