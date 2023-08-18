import { FormEvent, forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import splitWordsWithSpaces from "@/utils/splitWordsWithSpaces";
import { useAppDispatch, useAppSelector } from "@/hooks";
import parseTitleToGuess from "@/utils/parseTitleToGuess";
import { stringSimilarity } from "string-similarity-js";
import { gameActions } from "@/features/game/store/gameSlice";
import parseDiacriticalChars from "@/utils/parseDiacriticalChars";
import { isIOS } from "react-device-detect";
import { Paragraph } from "@/components/ui";

interface Props {
  onGuess?: () => void;
  secretPhrase: string;
}

const GuessInput = forwardRef<HTMLInputElement, Props>(
  ({ secretPhrase, onGuess }, inputRef) => {
    const [guess, setGuess] = useState("");
    const [hint, setHint] = useState(
      secretPhrase
        .split("")
        .map((letter) => (letter !== " " ? "_" : " "))
        .join("")
    );

    const dispatch = useAppDispatch();
    const { isInputFocused } = useAppSelector((state) => state.game.round);

    const handleGuessInput = (e: FormEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      const inputGuess = parseDiacriticalChars(inputValue).toLowerCase();
      const toGuess = secretPhrase.toLowerCase();

      const input = inputGuess.split("");
      const guess = toGuess.split("");

      setHint((current) => {
        const newHint = current
          .split("")
          .map((place, index) => {
            if (place !== "_") return place;
            if (input[index] === guess[index]) return input[index];
            return "_";
          })
          .join("");

        return newHint;
      });

      dispatch(
        gameActions.setSimilarity(stringSimilarity(inputGuess, toGuess))
      );

      if (inputGuess === toGuess) onGuess && onGuess();

      if (e.currentTarget.value.length > toGuess.length) {
        const slicedText = e.currentTarget.value.slice(0, toGuess.length);
        setGuess(slicedText);
        return;
      }
      setGuess(e.currentTarget.value);
    };

    return (
      <div className="my-3">
        <Paragraph className="mb-3 text-sm opacity-80">
          {isInputFocused ? "Type to guess" : "Click to type"}
        </Paragraph>
        <input
          ref={inputRef}
          autoCorrect="off"
          autoComplete="off"
          autoFocus
          type="search"
          className="w-full rounded-t-lg bg-zinc-800/70 p-2 text-center text-zinc-100 outline-none"
          value={guess}
          onInput={handleGuessInput}
          onFocus={() => dispatch(gameActions.setInputFocus(true))}
          onBlur={(e) => {
            if (isIOS) {
              dispatch(gameActions.setInputFocus(false));
              return;
            }
            e.target.focus();
          }}
        />
        <AnimatePresence>
          {hint
            .split("")
            .some((letter) => letter !== "_" && letter !== " ") && (
            <motion.div
              className="overflow-hidden rounded-b-lg bg-zinc-800/40 font-mono text-sm text-zinc-100/50"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              onClick={() =>
                setHint(
                  secretPhrase
                    .split("")
                    .map((letter) => (letter !== " " ? "_" : " "))
                    .join("")
                )
              }
            >
              <h5 className="">HINT</h5>
              <AnimatePresence>
                {hint.split("").map((letter, index) => {
                  return (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, position: "absolute" }}
                      key={letter + index}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GuessInput.displayName = "gameGuessInput";

export default GuessInput;
