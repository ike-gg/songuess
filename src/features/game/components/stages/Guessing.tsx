import { useAppDispatch, useAppSelector } from "@/hooks";
import GameCard from "../GameCard";
import { useEffect, useRef } from "react";
import parseArtwork from "@/utils/parseArtwork";
import GuessInput from "../GuessInput";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Heading, MotionWrapper, Paragraph } from "@/components/ui";
import { gameActions } from "../../store/gameSlice";
import useCountdown from "@bradgarropy/use-countdown";
import { RxArrowRight } from "react-icons/rx";

const Guessing = () => {
  const inputGuessRef = useRef<HTMLInputElement>(null);

  const { round, roundTime } = useAppSelector((state) => state.game);
  const { currentSong, status } = round;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputGuessRef.current) inputGuessRef.current.focus();
  }, [inputGuessRef]);

  const { seconds } = useCountdown({ seconds: roundTime });
  const blur = Math.max(0, seconds - roundTime / 5);

  if (!currentSong) return <p>current song empty</p>;

  const handleFocusToInput = () => {
    inputGuessRef.current?.focus();
  };

  const { attributes } = currentSong;
  const { artwork, name, artistName, albumName } = attributes;

  const { artworkUrl, bgColor } = parseArtwork(artwork);

  return (
    <GameCard
      onClick={() => handleFocusToInput()}
      className="flex w-full flex-col pt-4 text-center md:max-w-lg md:pt-6"
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "guessing" && (
          <MotionWrapper key={"guessinput_element"}>
            <GuessInput
              ref={inputGuessRef}
              secretPhrase={name}
              onGuess={() => {
                dispatch(gameActions.setRoundStatus("guessed"));
              }}
            />
          </MotionWrapper>
        )}
        {(status === "guessed" || status === "timeout") && (
          <MotionWrapper key={"results_element"}>
            <Heading className="bg-gradient-to-br from-zinc-300 to-zinc-100 bg-clip-text text-transparent">
              {name}
            </Heading>
            <Paragraph className="bg-gradient-to-br from-zinc-400 to-zinc-100 bg-clip-text text-transparent">
              by {artistName} from {albumName}{" "}
            </Paragraph>
          </MotionWrapper>
        )}
      </AnimatePresence>
      <div className="overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.img
            className="aspect-square w-full object-cover"
            key={artworkUrl.large}
            animate={{
              opacity: 1,
              filter: status === "guessing" ? `blur(${blur}px)` : "blur(0px)",
              padding: status === "guessing" ? blur : 0,
            }}
            style={{ backgroundColor: bgColor }}
            exit={{ opacity: 0 }}
            src={artworkUrl.large}
          />
        </AnimatePresence>
      </div>
    </GameCard>
  );
};

export default Guessing;
