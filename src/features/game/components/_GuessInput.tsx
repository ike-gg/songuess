import "regenerator-runtime/runtime";

import { FormEvent, forwardRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { stringSimilarity } from "string-similarity-js";
import { gameActions } from "@/features/game/store/gameSlice";
import parseDiacriticalChars from "@/utils/parseDiacriticalChars";
import { isIOS } from "react-device-detect";
import { Paragraph } from "@/components/ui";
import SpeechRecognition, {
  useSpeechRecognition,
  SpeechRecognitionOptions,
} from "react-speech-recognition";
import { AnimatePresence, motion } from "framer-motion";
import { generateUUID } from "three/src/math/MathUtils";

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

    const [t, st] = useState("");

    const commands: SpeechRecognitionOptions["commands"] = [
      {
        command: secretPhrase,
        callback: (a) => {
          console.log(a);
          onGuess && onGuess();
          SpeechRecognition.stopListening();
        },
        matchInterim: true,
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.5,
        bestMatchOnly: true,
      },
    ];

    const {
      browserSupportsSpeechRecognition,
      listening,
      transcript,
      resetTranscript,
    } = useSpeechRecognition({ commands });

    useEffect(() => {
      const debounceClear = setTimeout(() => {
        resetTranscript();
      }, 5000);

      return () => {
        clearTimeout(debounceClear);
      };
    }, [transcript, resetTranscript]);

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

    return (
      <div className="my-3">
        <Paragraph>
          secret: {secretPhrase}
          DEBUG
          {!browserSupportsSpeechRecognition && "NOTSUPPORT"}
          <p>Microphone: {listening ? "on" : "off"}</p>
          <div className="flex justify-center gap-2">
            <button onClick={() => SpeechRecognition.startListening()}>
              Start
            </button>
            <button onClick={() => SpeechRecognition.stopListening()}>
              Stop
            </button>
            <button onClick={() => resetTranscript()}>Reset</button>
          </div>
          <p>{transcript}</p>
        </Paragraph>

        <button onClick={() => st(generateUUID())}>reset</button>
        <div className="my-5 flex max-h-12 items-center justify-center font-mono">
          <AnimatePresence mode="popLayout">
            {t.split("").map((letter, index) => {
              return (
                <motion.span
                  layout
                  className="inline-block whitespace-pre"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  key={letter + index}
                >
                  {letter}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </div>
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
          onChange={handleGuessInput}
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
