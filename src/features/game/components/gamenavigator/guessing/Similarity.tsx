import { useGameState } from "@/features/game/zstore/gameSlice";
import { useAppSelector } from "@/hooks";
import { twMerge } from "tailwind-merge";

const Similarity = () => {
  const similarity = useGameState((state) => state.round.similarity);

  const pingState = twMerge(
    similarity < 0.25 && "bg-red-600 duration-1500",
    similarity >= 0.25 && similarity < 0.5 && "bg-orange-500 duration-1000",
    similarity >= 0.5 && similarity < 0.75 && "bg-yellow-400 duration-750",
    similarity >= 0.75 && "bg-green-500 duration-500"
  );

  return (
    <div
      className={twMerge(
        "relative mx-2 flex h-2.5 w-2.5 items-center justify-center rounded-full",
        pingState
      )}
    >
      <div
        className={twMerge(
          "absolute h-2.5 w-2.5 animate-pulsePing rounded-full",
          pingState
        )}
      />
    </div>
  );
};

export default Similarity;
