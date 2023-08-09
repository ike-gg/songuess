import { useAppDispatch, useAppSelector } from "@/hooks";
import Countdown from "./Countdown";
import Guessing from "./Guessing";
import { RxCross2 } from "react-icons/rx";
import { gameActions } from "@/features/game/store/gameSlice";
import { Button } from "@/components/ui";
import { AnimatePresence } from "framer-motion";
import BackgroundImage from "../BackgroundImage";
import parseArtwork from "@/utils/parseArtwork";
import { Fragment } from "react";

const InGame = () => {
  const { status, currentSong } = useAppSelector((state) => state.game.round);
  const dispatch = useAppDispatch();

  if (!currentSong) return <p>lol not found music</p>;

  const { attributes } = currentSong;
  const { bgColor, artworkUrl } = parseArtwork(attributes.artwork);

  const countdownStage = status === "countdown";

  return (
    <>
      <AnimatePresence mode="wait">
        {countdownStage && <Countdown key="countdown" />}
        {!countdownStage && (
          <Fragment key="game">
            <BackgroundImage
              key={`background`}
              src={artworkUrl.small}
              color={bgColor}
            />
            <Guessing key="game" />
          </Fragment>
        )}
      </AnimatePresence>
      <Button
        className="border-full absolute right-0 top-0 m-4 rounded-full p-2"
        variant="transparent"
        icon={<RxCross2 />}
        onClick={() => dispatch(gameActions.restartState())}
      />
    </>
  );
};

export default InGame;
