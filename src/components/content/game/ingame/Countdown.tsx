import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { AnimatePresence, motion } from "framer-motion";
import useCountdown from "@bradgarropy/use-countdown";

const Countdown = () => {
  const { seconds } = useCountdown({
    seconds: 5,
    onCompleted: () => {
      console.log("lub");
    },
  });

  return (
    <GameCard>
      <AnimatePresence>
        <motion.div
          className="text-center text-6xl"
          key={seconds}
          style={{ perspective: "1200px" }}
          initial={{ y: "-125%", opacity: 0, rotateX: 95 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: "125%", opacity: 0, position: "absolute", rotateX: -95 }}
          transition={{
            ease: "easeOut",
            duration: 2,
          }}
        >
          {seconds}
        </motion.div>
      </AnimatePresence>
    </GameCard>
  );
};

export default Countdown;
