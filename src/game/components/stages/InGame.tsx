import { useAppSelector } from "@/hooks";
import Countdown from "./Countdown";
import Guessing from "./Guessing";

const InGame = () => {
  const { round } = useAppSelector((state) => state.game);

  if (round.status === "countdown") return <Countdown />;
  else return <Guessing />;
};

export default InGame;
