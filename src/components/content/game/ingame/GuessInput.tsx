import { FormEvent, forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import splitWordsWithSpaces from "@/utils/splitWordsWithSpaces";
import { useAppDispatch, useAppSelector } from "@/hooks";
import parseTitleToGuess from "@/utils/parseTitleToGuess";
import { roundActions } from "@/store/roundSlice";
import { stringSimilarity } from "string-similarity-js";

interface Props {
  onGuess?: () => void;
  secretPhrase: string;
}

const GuessInput = forwardRef<HTMLInputElement, Props>(
  ({ secretPhrase, onGuess }, inputRef) => {
    const { status, guessSimilarity, currentSong } = useAppSelector(
      (state) => state.round
    );

    console.log(currentSong);

    const [guess, setGuess] = useState("");
    const dispatch = useAppDispatch();

    const parsedSecret = parseTitleToGuess(secretPhrase);
    const secret = splitWordsWithSpaces(parsedSecret);

    const handleGuessInput = (e: FormEvent<HTMLInputElement>) => {
      const newGuess = e.currentTarget.value.toLowerCase();
      const toGuess = parsedSecret.toLowerCase();

      dispatch(
        roundActions.setGuessSimilarity(stringSimilarity(newGuess, toGuess))
      );

      if (newGuess === toGuess) {
        if (onGuess) onGuess();
        // dispatch(roundActions.)
      }

      if (e.currentTarget.value.length > secretPhrase.length) {
        const slicedText = e.currentTarget.value.slice(0, secretPhrase.length);
        setGuess(slicedText);
        return;
      }
      setGuess(e.currentTarget.value);
    };

    return (
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="absolute left-0 top-0 z-50 w-1 translate-x-5 opacity-0"
          value={guess}
          onInput={handleGuessInput}
          onFocus={() => dispatch(roundActions.setInputFocus(true))}
          onBlur={() => dispatch(roundActions.setInputFocus(false))}
        />
        <div className="relative flex flex-wrap p-2 text-center">
          {secret.map((word, wordIndex, wordsArray) => {
            return (
              <div className="flex" key={word + wordIndex}>
                {word.split("").map((letter, letterIndex) => {
                  const realIndex =
                    wordsArray.slice(0, wordIndex).reduce((prev, curr) => {
                      return curr.length + prev;
                    }, 0) + letterIndex;

                  const guessLetter = guess[realIndex];

                  return (
                    <div
                      key={wordIndex + letter + letterIndex}
                      className={twMerge(
                        "overflow-hidden border-b border-white/25 p-2 text-center transition-all",
                        letter === " " && "border-b-0",
                        letter !== " " && "bg-white",
                        parsedSecret[realIndex + 1] === " " && "rounded-r-lg",
                        parsedSecret[realIndex - 1] === " " && "rounded-l-lg",
                        realIndex === 0 && "rounded-l-lg",
                        realIndex === parsedSecret.length - 1 && "rounded-r-lg",
                        guess.length === realIndex && "border-b border-white"
                      )}
                    >
                      <AnimatePresence>
                        {guessLetter && (
                          <motion.span
                            className="block"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                          >
                            {guessLetter === " " ? (
                              <span>&nbsp;</span>
                            ) : (
                              guessLetter
                            )}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

GuessInput.displayName = "gameGuessInput";

export default GuessInput;
