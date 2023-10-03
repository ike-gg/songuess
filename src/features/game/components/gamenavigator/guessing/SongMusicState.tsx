import { ReactNode, forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { RxPause, RxPlay, RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { Button } from "@/components/ui";
import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";
import { isIOS } from "react-device-detect";
import { useGameState } from "@/features/game/store/gameSlice";
import { useLocalStorage } from "usehooks-ts";

const Element = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <motion.div
        layout
        ref={ref}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.6, opacity: 0 }}
      >
        {children}
      </motion.div>
    );
  }
);

Element.displayName = "sound_navigatorElement";

const SongMusicState = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const song = useGameState((state) => state.round.song);
  const status = useGameState((state) => state.round.status);
  const [volumeSaved, setVolumeSaved] = useLocalStorage("volumeLevel", 0.5);

  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(volumeSaved);
  const [playing, setPlaying] = useState(!audioRef.current?.paused || false);

  useEffect(() => {
    setVolumeSaved(volume);

    if (!audioRef.current) return;

    if (status === "countdown") {
      audioRef.current.volume = 0;
      return;
    }

    playing
      ? audioRef.current.play().catch(() => {
          setPlaying(false);
        })
      : audioRef.current.pause();
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, playing, muted, setVolumeSaved, status]);

  useEffect(() => {
    setPlaying(false);
  }, [song]);

  if (!song) return null;

  const { previews } = song.attributes;
  const [audio] = previews;
  const audioPreview = audio.url;

  if (!audioPreview) return <p>missing song</p>;

  const supportedDevice = !isIOS;

  return (
    <MotionConfig transition={{ type: "tween" }}>
      <motion.div
        layout
        className="flex items-center overflow-hidden"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.6, opacity: 0 }}
      >
        <audio
          onPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
          autoPlay
          ref={audioRef}
          src={audioPreview}
        />
        <AnimatePresence mode="popLayout">
          {!playing && (
            <Element key="musicstate-play">
              <Button
                onClick={() => {
                  setMuted(false);
                  setPlaying(true);
                }}
                variant="navigator"
                icon={<RxPlay />}
              />
            </Element>
          )}
          {!supportedDevice && playing && (
            <Element key="notsupported-pause">
              <Button
                onClick={() => setPlaying(false)}
                variant="navigator"
                icon={<RxPause />}
              />
            </Element>
          )}
          {supportedDevice && muted && playing && (
            <Element key="musicstate-mute">
              <Button
                onClick={() => setMuted(false)}
                variant="navigator"
                icon={<RxSpeakerOff />}
              />
            </Element>
          )}
          {supportedDevice && !muted && playing && (
            <Element key="musicstate-speaker">
              <Button
                onClick={() => setMuted(true)}
                variant="navigator"
                icon={<RxSpeakerLoud />}
              />
            </Element>
          )}
          {supportedDevice && playing && (
            <Element key="volumecontrols">
              <Root
                value={[volume]}
                max={1}
                min={0}
                step={0.01}
                onValueChange={(values) => {
                  setMuted(false);
                  const [volume] = values;
                  setVolume(volume);
                }}
                className="relative mx-2 flex h-full w-28 cursor-pointer touch-none items-center transition-all"
              >
                <Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/50 transition-all group-hover:h-2.5">
                  <Range className="absolute h-full bg-white" />
                </Track>
                <Thumb className="rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
              </Root>
            </Element>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
};

export default SongMusicState;
