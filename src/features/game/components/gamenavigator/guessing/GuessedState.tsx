import { TbConfetti } from "react-icons/tb";
import { motion } from "framer-motion";
import { useGameState } from "@/features/game/zstore/gameSlice";

const GuessedState = () => {
  const totalPoints = useGameState((state) => state.totalPoints);

  return (
    <div className="mx-3 flex items-center gap-3">
      <motion.span
        animate={{ rotate: [-15, 15], scale: [1.4, 1.8] }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
      >
        <TbConfetti />
      </motion.span>
      <p className="text-sm uppercase">
        <span className="opacity-50">points</span> {totalPoints}
      </p>
    </div>
  );
};

export default GuessedState;
