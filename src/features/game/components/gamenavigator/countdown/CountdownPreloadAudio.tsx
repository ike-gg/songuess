import { useAppSelector } from "@/hooks";

const CountdownPreloadAudio = () => {
  const { currentSong } = useAppSelector((state) => state.game.round);

  if (!currentSong) return null;

  const [preview] = currentSong.attributes.previews;
  const { url } = preview;

  return <audio src={url} autoPlay muted />;
};

export default CountdownPreloadAudio;
