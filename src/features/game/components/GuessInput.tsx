import { FormEvent, forwardRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
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

    const dispatch = useAppDispatch();
    const { isInputFocused, similarity } = useAppSelector(
      (state) => state.game.round
    );

    const handleGuessInput = (e: FormEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      const inputGuess = parseDiacriticalChars(inputValue).toLowerCase();
      const toGuess = secretPhrase.toLowerCase();

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

    // const nextround = (e: KeyboardEvent) => {
    //   console.log(e);
    // };

    // useEffect(() => {
    //   window.addEventListener("keydown", nextround);
    //   return () => window.removeEventListener("keydown", nextround);
    // }, []);

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
          className="w-full rounded-lg bg-zinc-800/70 p-2 text-center text-zinc-100 outline-none"
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
      </div>
    );
  }
);

GuessInput.displayName = "gameGuessInput";

export default GuessInput;
