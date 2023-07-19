import { motion } from "framer-motion";
import VolumePicker from "./VolumePicker";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks";
import parseArtwork from "@/utils/parseArtwork";
import useCountdown from "@bradgarropy/use-countdown";
import { isIOS } from "react-device-detect";

const Player = () => {
  const { round, roundTime, volume } = useAppSelector((state) => state.game);
  const { currentSong, status } = round;
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const { seconds } = useCountdown({ seconds: roundTime });
  const blur = Math.max(0, seconds - roundTime / 2);

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
        onPlay={(e) => (e.currentTarget.volume = volume)}
      />
      <motion.img
        animate={{
          filter: status === "guessing" ? `blur(${blur}px)` : "blur(0px)",
          padding: status === "guessing" ? blur : 0,
        }}
        src={artworkUrl.large}
        className="w-full max-w-sm rounded-lg md:max-w-[275px]"
        alt="preview of song cover"
      />
      {!isIOS && <VolumePicker bgColor={bgColor} textColor={primColor} />}
    </section>
  );
};

export default Player;
