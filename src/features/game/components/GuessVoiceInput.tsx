import { forwardRef, useEffect } from "react";
import { Heading, Paragraph } from "@/components/ui";
import { useGameState } from "../store/gameSlice";
import SpeechRecognition, {
  useSpeechRecognition,
  SpeechRecognitionOptions,
} from "react-speech-recognition";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  onGuess?: () => void;
  secretPhrase: string;
}

const GuessVoiceInput = forwardRef<HTMLInputElement, Props>(
  ({ secretPhrase, onGuess }, inputRef) => {
    const roundStatus = useGameState((state) => state.round.status);

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
    } = useSpeechRecognition({
      commands: [
        {
          command: secretPhrase,
          callback: () => {
            onGuess && onGuess();
          },
          fuzzyMatchingThreshold: 0.75,
          isFuzzyMatch: true,
        },
      ],
    });

    useEffect(() => {
      if (transcript.toLowerCase().includes(secretPhrase.toLowerCase())) {
        onGuess && onGuess();
        console.log("catched exactly phrase.");
      }
    }, [transcript, onGuess, secretPhrase, resetTranscript]);

    useEffect(() => {
      if (roundStatus === "guessing") {
        SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
        });
      } else {
        SpeechRecognition.stopListening();
        console.log("stopping listening due to different round status.");
      }
    }, [roundStatus, resetTranscript]);

    return (
      <div className="my-3">
        {/* <Heading>{secretPhrase}</Heading> */}
        <Paragraph className="mb-3 text-sm opacity-80">
          Speak to guess
        </Paragraph>
        <div className="flex min-h-[3rem] flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 rounded-md bg-zinc-800 bg-opacity-60 p-4">
          <AnimatePresence mode="popLayout">
            {transcript.split(" ").map((word, index) => (
              <motion.div
                layout
                initial={{ x: 10, opacity: 0 }}
                animate={{ scale: 1, x: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                key={word.toLowerCase() + index}
              >
                {word}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

GuessVoiceInput.displayName = "gameGuessVoiceInput";

export default GuessVoiceInput;
