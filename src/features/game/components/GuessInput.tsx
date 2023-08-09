import { FormEvent, forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import splitWordsWithSpaces from "@/utils/splitWordsWithSpaces";
import { useAppDispatch, useAppSelector } from "@/hooks";
import parseTitleToGuess from "@/utils/parseTitleToGuess";
import { stringSimilarity } from "string-similarity-js";
import { gameActions } from "@/features/game/store/gameSlice";
import addAlpha from "@/utils/addAlphaHex";
import parseDiacriticalChars from "@/utils/parseDiacriticalChars";
import { isIOS } from "react-device-detect";
import { MotionWrapper, Paragraph } from "@/components/ui";

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
          {isInputFocused ? "Type to guess" : "Click to type"} {parsedSecret}
        </Paragraph>
        <input
          ref={inputRef}
          autoCorrect="off"
          type="text"
          className="static bottom-0 left-0 -z-50 block h-full w-full opacity-100 md:absolute md:hidden md:opacity-0"
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
        <div className="relative hidden flex-wrap gap-y-3 text-center md:flex">
          {secretWordsArray.map((word, wordIndex, wordsArray) => {
            return (
              <div className="flex" key={word + wordIndex}>
                {word.split("").map((letter, letterIndex) => {
                  //realIndex represents current char's index of whole phrase
                  //inside the splitted by words scope
                  const realIndex =
                    wordsArray.slice(0, wordIndex).reduce((prev, curr) => {
                      return curr.length + prev;
                    }, 0) + letterIndex;

                  const userLetterGuess = guess[realIndex];

                  const letterToGuess = letter.toLowerCase();
                  const userLetterGuessParsed = parseDiacriticalChars(
                    userLetterGuess || ""
                  ).toLowerCase();

                  const correctLetter = letterToGuess === userLetterGuessParsed;

                  let bgColor: string | null = null;

                  if (correctLetter) bgColor = textColor;
                  //statement to show current position
                  if (guess.length === realIndex)
                    bgColor = addAlpha(textColor, 0.2);
                  if (letterToGuess === " ") bgColor = addAlpha(textColor, 0);
                  if (!bgColor) bgColor = addAlpha(textColor, 0.1);

                  return (
                    <motion.div
                      key={wordIndex + letter + letterIndex}
                      style={{
                        backgroundColor: bgColor,
                        color: correctLetter ? backgroundColor : "currentcolor",
                        borderColor: addAlpha(textColor, 0.5),
                      }}
                      className={twMerge(
                        "flex h-[2.25rem] w-6 scale-[100.7%] items-center justify-center overflow-hidden text-center transition-all",
                        parsedSecret[realIndex + 1] === " " && "rounded-r-lg ",
                        parsedSecret[realIndex - 1] === " " && "rounded-l-lg ",
                        realIndex === 0 && "rounded-l-lg",
                        letter === " " && "w-5",
                        realIndex === parsedSecret.length - 1 && "rounded-r-lg "
                      )}
                    >
                      <AnimatePresence>
                        {userLetterGuess && (
                          <motion.div
                            key={wordIndex + letter + letterIndex + "inner"}
                            className="block"
                            initial={{ y: 20, scale: 1, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {userLetterGuess === " " ? (
                              <span>&nbsp;</span>
                            ) : (
                              userLetterGuess
                            )}
                          </motion.div>
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
