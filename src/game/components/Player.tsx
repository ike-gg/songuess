import { motion } from "framer-motion";
import VolumePicker from "./VolumePicker";
import { useRef } from "react";
import { useAppSelector } from "@/hooks";
import parseArtwork from "@/utils/parseArtwork";
import useCountdown from "@bradgarropy/use-countdown";

const Player = () => {
  const { round, roundTime } = useAppSelector((state) => state.game);
  const { currentSong } = round;
  const audioRef = useRef<HTMLAudioElement>(null);

  const { seconds } = useCountdown({ seconds: roundTime });
  const blur = Math.max(0, seconds - roundTime / 2);

  const handleVolumeChange = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  if (!currentSong) return null;

  const { previews, artwork } = currentSong.attributes;
  const { bgColor, primColor, artworkUrl } = parseArtwork(artwork);
  const [audio] = previews;

  return (
    <section className="flex shrink-0 flex-col gap-3">
      <audio
        src={audio.url}
        autoPlay
        ref={audioRef}
        onPlay={(e) => (e.currentTarget.volume = 0.5)}
      />
      <div className="overflow-hidden rounded-lg">
        <motion.img
          animate={{ filter: `blur(${blur}px)` }}
          src={artworkUrl.large}
          className="w-full max-w-sm md:max-w-[275px]"
          alt="preview of song cover"
        />
      </div>
      <VolumePicker
        handleVolume={handleVolumeChange}
        bgColor={bgColor}
        textColor={primColor}
      />
    </section>
  );
};

export default Player;
