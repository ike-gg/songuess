/* eslint-disable @next/next/no-img-element */
import GameCard from "../GameCard";
import { BackButton, Button, Heading, Paragraph } from "@/components/ui";
import { routes } from "@/constants";
import { useGameState, GameType } from "../../store/gameSlice";
import { ReactNode, useState } from "react";
import { RxCircle } from "react-icons/rx";
import { HiMicrophone } from "react-icons/hi2";
import { useLocalStorage } from "usehooks-ts";
import CheckVoiceCapability from "./CheckVoiceCapability";

interface GameTypeOption {
  Icon: ReactNode;
  key: GameType;
  description: string;
}

const Preparing = () => {
  const [voiceAvailable, setVoiceAvailable] = useLocalStorage(
    "voiceCapability",
    false
  );

  const [checkingVoice, setCheckingVoice] = useState(false);

  const { loaded, rounds, time, set, type } = useGameState(
    (state) => state.config
  );
  const setConfig = useGameState((state) => state.setConfig);
  const startGame = useGameState((state) => state.startGame);

  const speechCapableDevice = () => {
    setVoiceAvailable(true);
    setCheckingVoice(false);
    setConfig({ rounds, time, type: "voice" });
  };

  if (!loaded) return null;

  const { cover, name, songs } = set;

  const availableRounds = [3, 5, 10, 15, 20].filter(
    (roundOption) => songs.length >= roundOption
  );

  const availableTimes = [5, 15, 20, 30];
  process.env.NODE_ENV === "development" && availableTimes.push(1200);
  process.env.NODE_ENV === "development" && availableTimes.push(1);

  const gameTypes: GameTypeOption[] = [
    {
      description: "Classic game mode with keyboard as input",
      Icon: <RxCircle />,
      key: "classic",
    },
    {
      description: "Play using your voice!",
      Icon: <HiMicrophone />,
      key: "voice",
    },
  ];

  return (
    <>
      <CheckVoiceCapability
        state={checkingVoice}
        handleState={(state: boolean) => {
          setCheckingVoice(state);
        }}
        onComplete={speechCapableDevice}
      />
      <GameCard
        key="preparing"
        className="max-w-2xl flex-col md:flex-row md:p-6"
      >
        <img
          src={cover || ""}
          className="rounded-lg md:h-40"
          alt="game cover"
        />
        <div className="flex flex-col gap-3">
          <BackButton href={routes.sets.browser()}>Back to sets</BackButton>
          <Heading>{name}</Heading>
          <Paragraph>{songs.length} tracks</Paragraph>
          <Paragraph>Choose number of rounds</Paragraph>
          <div className="flex gap-2">
            {availableRounds.map((setRounds, index) => {
              return (
                <Button
                  variant={setRounds === rounds ? "primary" : "secondary"}
                  key={index + "roundSelector"}
                  onClick={() => setConfig({ rounds: setRounds, time, type })}
                >
                  {setRounds}
                </Button>
              );
            })}
          </div>
          <Paragraph>Choose time per round</Paragraph>
          <div className="flex gap-2">
            {availableTimes.map((setTime, index) => {
              return (
                <Button
                  variant={setTime === time ? "primary" : "secondary"}
                  key={index + "timePicker"}
                  onClick={() => setConfig({ rounds, time: setTime, type })}
                >
                  {setTime}
                </Button>
              );
            })}
          </div>
          <Paragraph>Choose game mode</Paragraph>
          <div className="flex gap-2">
            {gameTypes.map(({ description, Icon, key }) => (
              <Button
                variant={key === type ? "primary" : "secondary"}
                onClick={() => {
                  if (key === "voice" && !voiceAvailable) {
                    setCheckingVoice(true);
                    return;
                  }
                  setConfig({ rounds, time, type: key });
                }}
                key={key + "typebutton"}
                className="flex w-52 items-center gap-4"
              >
                <div className="text-xl">{Icon}</div>
                <div className="flex flex-col items-start">
                  <h2 className="font-medium capitalize">{key}</h2>
                  <p className="whitespace-pre-wrap break-words text-left text-xs">
                    {description}
                  </p>
                </div>
              </Button>
            ))}
          </div>
          <Button onClick={() => startGame()}>Play lll</Button>
        </div>
      </GameCard>
    </>
  );
};

export default Preparing;
