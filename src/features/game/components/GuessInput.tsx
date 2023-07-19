import { FormEvent, forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import splitWordsWithSpaces from "@/utils/splitWordsWithSpaces";
import { useAppDispatch, useAppSelector } from "@/hooks";
import parseTitleToGuess from "@/utils/parseTitleToGuess";
import { stringSimilarity } from "string-similarity-js";
import { gameActions } from "@/features/game/store/gameSlice";
import addAlpha from "@/utils/addAlphaHex";
import parseDiacriticalChars from "@/utils/parseDiacriticalChars";
import MotionWrapper from "@/components/ui/wrappers/MotionWrapper";
import Paragraph from "@/components/ui/content/Paragraph";
import { isIOS } from "react-device-detect";

interface Props {
  onGuess?: () => void;
  secretPhrase: string;
  textColor: string;
  backgroundColor: string;
}

const GuessInput = forwardRef<HTMLInputElement, Props>(
  ({ secretPhrase, onGuess, backgroundColor, textColor }, inputRef) => {
    const [guess, setGuess] = useState("");

    const dispatch = useAppDispatch();
    const { isInputFocused } = useAppSelector((state) => state.game.round);

    const parsedSecret = parseTitleToGuess(secretPhrase);
    const secretWordsArray = splitWordsWithSpaces(parsedSecret);

    const handleGuessInput = (e: FormEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      const inputGuess = parseDiacriticalChars(inputValue).toLowerCase();
      const toGuess = parsedSecret.toLowerCase();

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
      <MotionWrapper
        className="relative mb-12"
        style={{
          color: textColor,
        }}
      >
        <Paragraph className="mb-2 text-sm opacity-80">
          {isInputFocused ? "Type to guess" : "Click to type"}
        </Paragraph>
        <input
          ref={inputRef}
          autoCorrect="off"
          type="text"
          className="opacity-1 absolute left-0 top-0 -z-50 h-full w-full opacity-0"
          value={guess}
          autoFocus
          style={{ caretColor: "transparent" }}
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
        <div className="relative flex flex-wrap gap-y-3 text-center">
          {secretWordsArray.map((word, wordIndex, wordsArray) => {
            return (
              <div className="flex" key={word + wordIndex}>
                {word.split("").map((letter, letterIndex) => {
                  const realIndex =
                    wordsArray.slice(0, wordIndex).reduce((prev, curr) => {
                      return curr.length + prev;
                    }, 0) + letterIndex;

                  const guessLetter = guess[realIndex];

                  let bgColor =
                    letter === " " ? "transparent" : backgroundColor;
                  if (
                    letter?.toLowerCase() ===
                    parseDiacriticalChars(guessLetter || "").toLowerCase()
                  )
                    bgColor = addAlpha(bgColor, 0.3);
                  else if (guess.length === realIndex)
                    bgColor = addAlpha(bgColor, 0.2);
                  else bgColor = addAlpha(bgColor, 0.1);

                  return (
                    <motion.div
                      key={wordIndex + letter + letterIndex}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: addAlpha(textColor, 0.2),
                      }}
                      className={twMerge(
                        "h-[2.25rem] w-6 overflow-hidden border-b border-t p-1 text-center transition-all",
                        parsedSecret[realIndex + 1] === " " &&
                          "rounded-r-lg border-r",
                        parsedSecret[realIndex - 1] === " " &&
                          "rounded-l-lg border-l",
                        realIndex === 0 && "rounded-l-lg border-l",
                        letter === " " && "w-5 border-none",
                        realIndex === parsedSecret.length - 1 &&
                          "rounded-r-lg border-r"
                      )}
                    >
                      <AnimatePresence>
                        {guessLetter && (
                          <motion.span
                            key={wordIndex + letter + letterIndex + "inner"}
                            className="block"
                            initial={{ scale: 0 }}
                            animate={{ y: 0, scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            exit={{ scale: 0, opacity: 0 }}
                          >
                            {guessLetter === " " ? (
                              <span>&nbsp;</span>
                            ) : (
                              guessLetter
                            )}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </MotionWrapper>
    );
  }
);

GuessInput.displayName = "gameGuessInput";

export default GuessInput;
