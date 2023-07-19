import Button from "@/components/ui/Button";
import MotionWrapper from "@/components/ui/wrappers/MotionWrapper";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { gameActions } from "@/features/game/store/gameSlice";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const FooterPanel = () => {
  const { points, round } = useAppSelector((state) => state.game);
  const { status } = round;
  const dispatch = useAppDispatch();

  const handleButtonAction = () => {
    if (status === "guessing") {
      dispatch(gameActions.setRoundStatus("timeout"));
    }
    if (status === "guessed" || status === "timeout") {
      dispatch(gameActions.nextRound());
    }
  };

  const buttonLabel = status === "guessing" ? "Give up" : "Next round";

  return (
    <footer className="flex items-end justify-between text-sm font-bold uppercase">
      <p>
        points:{" "}
        <AnimatePresence mode="wait">
          <motion.span
            initial={{ y: -10, opacity: 0, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{
              y: 10,
              opacity: 0,
              scale: 0.6,
              transition: { delay: 0.5 },
            }}
            key={`roundPoints${String(points)}`}
            className="inline-block"
          >
            {String(points)}
          </motion.span>
        </AnimatePresence>
      </p>
      <AnimatePresence mode="wait">
        <MotionWrapper
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { delay: 0.1 } }}
          key={buttonLabel}
        >
          <Button
            size="small"
            variant="transparent"
            onClick={handleButtonAction}
          >
            {buttonLabel}
          </Button>
        </MotionWrapper>
      </AnimatePresence>
    </footer>
  );
};

export default FooterPanel;
