import GameCard from "../GameCard";
import { useEffect, useRef } from "react";
import parseArtwork from "@/utils/parseArtwork";
import GuessInput from "../GuessInput";
import { AnimatePresence, motion } from "framer-motion";
import { Heading, MotionWrapper, Paragraph } from "@/components/ui";
import useCountdown from "@bradgarropy/use-countdown";
import parseTitleToGuess from "@/utils/parseTitleToGuess";
import { useGameState } from "../../zstore/gameSlice";

const Guessing = () => {
  const inputGuessRef = useRef<HTMLInputElement>(null);

  const { song, status } = useGameState((state) => state.round);
  const { time } = useGameState((state) => state.config);
  const guessed = useGameState((state) => state.guessed);

  useEffect(() => {
    if (inputGuessRef.current) inputGuessRef.current.focus();
  }, [inputGuessRef]);

  const { seconds } = useCountdown({ seconds: time });
  const blur = Math.max(0, seconds - time / 5);

  if (!song) return <p>current song empty</p>;

  const handleFocusToInput = () => {
    inputGuessRef.current?.focus();
  };

  const { attributes } = song;
  const { artwork, name, artistName, albumName } = attributes;

  const { artworkUrl, bgColor } = parseArtwork(artwork);

  const titleToGuess = parseTitleToGuess(name);

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
              secretPhrase={titleToGuess}
              onGuess={() => guessed()}
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
