import { SongAttributes } from "@/types/musicApi/Song";
import FeaturesCard from "./FeaturesCard";
import { useEffect, useRef, useState } from "react";
import parseArtwork from "@/utils/parseArtwork";
import parseTitleToGuess from "@/utils/parseTitleToGuess";
import addAlpha from "@/utils/addAlphaHex";
import { IoMusicalNotes } from "react-icons/io5";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button, Paragraph } from "@/components/ui";
import { RxReload } from "react-icons/rx";
import { HiPlay, HiPause } from "react-icons/hi2";

interface Props {
  songs: SongAttributes[];
}

const FeatureGuess = ({ songs }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [audioState, setAudioState] = useState(false);
  const [song, setSong] = useState(songs[25]);
  const [lastLetterIndex, setLastLetterIndex] = useState(0);
  const [guessed, setGuessed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.2;
    if (audioState) audioRef.current.play();
    else audioRef.current.pause();
  }, [audioState, audioRef, song]);

  const { artworkUrl, bgColor, primColor } = parseArtwork(song.artwork);

  const title = parseTitleToGuess(song.name);
  const { albumName, artistName } = song;

  const guessingProgress = useTransform(
    scrollYProgress,
    [0.2, 0.4],
    [0, title.length + 1]
  );

  useMotionValueEvent(guessingProgress, "change", (v) => {
    const floor = Math.floor(v);
    if (lastLetterIndex !== floor) setLastLetterIndex(floor);
    if (floor >= title.length) setGuessed(true);
    else setGuessed(false);
  });

  return (
    <FeaturesCard
      ref={containerRef}
      animate={{
        background: `linear-gradient(to bottom right, ${bgColor}, ${addAlpha(
          bgColor,
          0.6
        )})`,
        color: primColor,
        boxShadow: `0 0 50px ${addAlpha(bgColor, 0.5)}`,
      }}
      className="row-span-2 h-80 md:col-span-2 md:h-full "
    >
      <audio ref={audioRef} src={song.previews[0].url} />
      <div className="flex items-center gap-4">
        <IoMusicalNotes className="text-3xl" />
        <h3>Guess music!</h3>
      </div>
      <AnimatePresence>
        <motion.h4
          key={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, position: "absolute" }}
          className="relative z-50 mt-12 whitespace-pre-wrap text-4xl font-semibold md:mt-16"
        >
          {title.split("").map((letter, index) => {
            const show = index < lastLetterIndex;
            return (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: show ? 1 : 0, y: show ? -5 : 0 }}
                transition={{ duration: 0.2, delay: 0 }}
                key={letter + index}
                className="inline-block"
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.h4>
      </AnimatePresence>
      <AnimatePresence>
        {guessed && (
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 0.6 }}
            exit={{ y: -10, opacity: 0 }}
            className="relative z-50"
          >
            by {artistName} from {albumName}
          </motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.img
          initial={{ y: "100%", rotate: -4 }}
          animate={{ y: "0%", rotate: 8 }}
          exit={{ y: "100%", rotate: -4 }}
          key={artworkUrl.medium}
          src={artworkUrl.medium}
          className="absolute -bottom-11 -right-4 rotate-6 rounded-2xl"
        />
      </AnimatePresence>
      <Button
        variant="transparent"
        icon={<RxReload />}
        className="absolute right-0 top-0 m-2 bg-transparent p-2 "
        onClick={() => setSong(songs[Math.floor(Math.random() * songs.length)])}
      />
      <Button
        variant="transparent"
        icon={audioState ? <HiPause /> : <HiPlay />}
        onClick={() => setAudioState((p) => !p)}
        className="absolute bottom-0 left-0 m-5 rounded-full p-2"
      />
    </FeaturesCard>
  );
};

export default FeatureGuess;
