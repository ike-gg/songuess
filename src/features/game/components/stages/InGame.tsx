import { useAppDispatch, useAppSelector } from "@/hooks";
import Countdown from "./Countdown";
import Guessing from "./Guessing";
import { RxExit } from "react-icons/rx";
import { gameActions } from "@/features/game/store/gameSlice";
import { Button } from "@/components/ui";

const InGame = () => {
  const { round } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  return (
    <>
      {round.status === "countdown" && <Countdown />}
      {round.status !== "countdown" && <Guessing />}
      <Button
        className="absolute right-0 top-0 m-4"
        variant="transparent"
        icon={<RxExit />}
        onClick={() => dispatch(gameActions.restartState())}
      >
        Exit
      </Button>
    </>
  );
};

export default InGame;
