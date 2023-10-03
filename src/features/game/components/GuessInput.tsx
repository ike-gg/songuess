import { FormEvent, forwardRef, useState } from "react";
import { stringSimilarity } from "string-similarity-js";
import parseDiacriticalChars from "@/utils/parseDiacriticalChars";
import { Paragraph } from "@/components/ui";
import { useGameState } from "../store/gameSlice";

interface Props {
  onGuess?: () => void;
  secretPhrase: string;
  showHint?: boolean;
}

const GuessInput = forwardRef<HTMLInputElement, Props>(
  ({ secretPhrase, onGuess, showHint = false }, inputRef) => {
    const [guess, setGuess] = useState("");
    const [hint, setHint] = useState(
      secretPhrase
        .split("")
        .map((letter) => (letter !== " " ? "_" : " "))
        .join("")
    );

    const setSimilarity = useGameState((state) => state.setSimilarity);

    const handleGuessInput = (e: FormEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      const inputGuess = parseDiacriticalChars(inputValue).toLowerCase();
      const toGuess = secretPhrase.toLowerCase();

      setSimilarity(stringSimilarity(inputGuess, toGuess));

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
        <Paragraph className="mb-3 text-sm opacity-80">Type to guess</Paragraph>
        <input
          ref={inputRef}
          autoCorrect="off"
          autoComplete="off"
          autoFocus
          type="search"
          className="w-full rounded-t-lg bg-zinc-800/70 p-2 text-center text-zinc-100 outline-none"
          value={guess}
          onInput={handleGuessInput}
        />
      </div>
    );
  }
);

GuessInput.displayName = "gameGuessInput";

export default GuessInput;
