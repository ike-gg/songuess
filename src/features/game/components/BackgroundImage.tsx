import { useAppSelector } from "@/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  src: string;
  color: string;
}

const BackgroundImage = ({ color, src }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { status } = useAppSelector((state) => state.game.round);

  useEffect(() => {
    if (status !== "countdown") {
      document.body.style.backgroundColor = color;
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [status, color]);

  return (
    <motion.img
      src={src}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      onLoad={() => setIsLoaded(true)}
      className="fixed left-0 top-0 -z-50 h-screen w-screen animate-slowlyRotate object-cover blur-[60px]"
    />
  );
};

export default BackgroundImage;
