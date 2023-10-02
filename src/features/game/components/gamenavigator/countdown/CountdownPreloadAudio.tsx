import { useGameState } from "@/features/game/zstore/gameSlice";

const CountdownPreloadAudio = () => {
  const song = useGameState((state) => state.round.song);

  if (!song) return null;

  const [preview] = song.attributes.previews;
  const { url } = preview;

  return <audio src={url} autoPlay muted />;
};

export default CountdownPreloadAudio;
