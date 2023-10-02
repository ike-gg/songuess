/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SongType } from "@/types/musicApi/Song";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { gameActions } from "@/features/game/store/gameSlice";
import { useEffect } from "react";
import Preparing from "./components/stages/Preparing";
import InGame from "./components/stages/InGame";
import Results from "./components/stages/Results";
import Motion from "../../components/providers/Motion";
import BackgroundImage from "./components/BackgroundImage";
import { AnimatePresence } from "framer-motion";
import { Set } from "@/types/databaseTypes";
import { useGameState } from "./zstore/gameSlice";
import parseArtwork from "@/utils/parseArtwork";

interface Props {
  setDetails: Set;
  songs: SongType["data"];
}

const Game = ({ setDetails, songs }: Props) => {
  const status = useGameState((state) => state.status);
  const loadedSet = useGameState((state) => state.config.set);
  const { song, status: roundStatus } = useGameState((state) => state.round);
  const loadConfig = useGameState((state) => state.loadConfig);
  const resetState = useGameState((state) => state.resetState);

  useEffect(() => {
    if (loadedSet && loadedSet.id !== setDetails.id) {
      resetState();
    }
    loadConfig(setDetails, songs);
  }, [loadedSet]);

  let backgroundColor: string = loadedSet?.bgColor || "#09090b";
  let accentColor: string = loadedSet?.textColor || "#52525b";

  if (song && roundStatus !== "countdown") {
    const { bgColor, primColor } = parseArtwork(song.attributes.artwork);
    backgroundColor = bgColor;
    accentColor = primColor;
  }

  return (
    <Motion duration={0.5}>
      <AnimatePresence>
        <BackgroundImage
          key={backgroundColor + accentColor}
          c1={backgroundColor}
          acc={accentColor}
        />
      </AnimatePresence>
      <main className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden p-3">
        <AnimatePresence mode="wait">
          {status === "preparing" && <Preparing key="preparing_stage" />}
          {status === "inprogress" && <InGame key="inprogress_stage" />}
          {status === "ended" && <Results key="ended_stage" />}
        </AnimatePresence>
      </main>
    </Motion>
  );
};

export default Game;
