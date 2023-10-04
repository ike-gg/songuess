import "regenerator-runtime/runtime";

import {
  Button,
  CardFooter,
  Dialog,
  Heading,
  Paragraph,
  WarningBlock,
} from "@/components/ui";
import SpeechRecognition, {
  useSpeechRecognition,
  SpeechRecognitionOptions,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import getRandomElements from "@/utils/getRandomElements";
import { twMerge } from "tailwind-merge";

interface Props {
  state: boolean;
  handleState: (state: boolean) => void;
  onComplete: () => void;
}

const testPhrases = [
  "Love Story",
  "Blank Space",
  "Shake It Off",
  "Bad Blood",
  "Delicate",
  "Style",
  "Wildest Dreams",
  "All Too Well",
  "Mean",
  "Red",
  "Fearless",
  "Mine",
  "Speak Now",
  "End Game",
  "Ours",
  "Back to December",
  "Everything Has Changed",
  "White Horse",
  "Begin Again",
  "Our Song",
  "Fifteen",
  "Sparks Fly",
  "Ronan",
  "Enchanted",
  "Long Live",
  "New Romantics",
  "State of Grace",
  "Holy Ground",
  "Starlight",
  "The Last Time",
  "Haunted",
  "Innocent",
  "The Lucky One",
  "Dear John",
  "Change",
  "Cruel Summer",
  "Lover",
  "The Archer",
  "The Man",
  "False God",
  "Paper Rings",
  "Cornelia Street",
  "London Boy",
  "Afterglow",
  "Daylight",
  "Willow",
  "Champagne Problems",
  "Gold Rush",
  "Tolerate It",
  "Happiness",
  "Coney Island",
  "Marjorie",
  "Closure",
  "Evermore",
];

const CheckVoiceCapability = ({ handleState, state, onComplete }: Props) => {
  const [phrases, setPhrases] = useState(
    getRandomElements(testPhrases, 3).map((testphrase) => {
      return {
        text: testphrase,
        catched: false,
      };
    })
  );

  const phrasesCommands: SpeechRecognitionOptions["commands"] = phrases.map(
    (phrase) => {
      return {
        command: phrase.text,
        callback: () => {
          setPhrases((prevState) => {
            const currentPhrase = prevState.findIndex(
              (p) => p.text === phrase.text
            );
            if (currentPhrase < 0) return prevState;
            prevState[currentPhrase].catched = true;

            const isAllCompleted = prevState.every((test) => test.catched);
            if (isAllCompleted) {
              SpeechRecognition.stopListening();
              onComplete();
            }

            return prevState;
          });
        },
        fuzzyMatchingThreshold: 0.6,
        isFuzzyMatch: true,
      };
    }
  );

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands: phrasesCommands });

  useEffect(() => {
    const timeout = setTimeout(resetTranscript, 5000);
    return () => clearTimeout(timeout);
  }, [transcript, resetTranscript]);

  useEffect(() => {
    if (state) {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [state]);

  return (
    <Dialog handleState={handleState} state={state}>
      <Heading className="flex items-center gap-4">
        Voice checking
        {listening && (
          <div className="relative mx-2 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-green-500">
            <div className="absolute h-2.5 w-2.5 animate-pulsePing rounded-full bg-green-500" />
          </div>
        )}
      </Heading>
      {!browserSupportsSpeechRecognition && (
        <Paragraph>
          Sorry but your browser not support speech recognition. Try on another
          web browser or device.
        </Paragraph>
      )}
      {browserSupportsSpeechRecognition && (
        <>
          <Paragraph>
            Please read out loud phrases that will display below. It will help
            to ensure your device is capable to play using your microphone!
          </Paragraph>
          <WarningBlock>
            Please note that the transcription may not be an exact match to what
            you said. Speech recognition has a margin of error, so the important
            aspect is for the spoken phrase to sound similar.
          </WarningBlock>
          <div className="grid max-h-48 grid-cols-3 gap-4 text-xl font-semibold capitalize">
            {phrases.map((phrase, index) => (
              <div
                key={phrase.text + index}
                className={twMerge(
                  "flex h-full flex-1 items-center justify-center rounded-lg bg-zinc-800 p-4 text-center text-zinc-400",
                  phrase.catched && "text-green-500"
                )}
              >
                {phrase.text}
              </div>
            ))}
          </div>
          <div className="flex min-h-[3rem] flex-wrap items-center justify-center gap-1.5 rounded-md bg-zinc-800 p-4">
            <AnimatePresence mode="popLayout">
              {transcript.split(" ").map((word, index) => (
                <motion.div
                  layout
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ scale: 1, x: 0, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  key={word + index}
                >
                  {word}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
      </CardFooter>
    </Dialog>
  );
};

export default CheckVoiceCapability;
