import { AnimatedText } from "@/components/ui";

const HomeTitle = () => {
  return (
    <h1
      style={{
        filter:
          "drop-shadow(0 0 50px black) drop-shadow(0 0 30px black) drop-shadow(0 0 20px black)",
      }}
      className="z-40 max-w-sm pb-2 text-center text-5xl font-bold md:max-w-2xl md:text-6xl"
    >
      <AnimatedText className="bg-gradient-to-b from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
        Tune into the Ultimate Song Guessing Challenge!
      </AnimatedText>
    </h1>
  );
};

export default HomeTitle;
