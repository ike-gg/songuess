import { Logo } from "./Logo";

const FullLogo = () => {
  return (
    <span className="flex items-center gap-2 text-lg font-medium text-indigo-700">
      <span className="text-3xl">
        <Logo />
      </span>{" "}
      SonGuess
    </span>
  );
};

export { FullLogo };
