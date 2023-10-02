import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";

const TimeoutState = () => {
  // const { points } = useAppSelector((state) => state.game);

  return (
    <div className="mx-3 flex items-center gap-3">
      <motion.span
        animate={{ scale: [0.9, 1.4] }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
      >
        <IoCloseCircleOutline />
      </motion.span>
      <p className="text-sm uppercase">
        <span className="opacity-50">points</span> POINTS UNAVAILABLE
      </p>
    </div>
  );
};

export default TimeoutState;
