/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SongType } from "@/types/musicApi/Song";
import { Database } from "@/types/supabase";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { gameActions } from "@/features/game/store/gameSlice";
import { useEffect } from "react";
import Preparing from "./components/stages/Preparing";
import InGame from "./components/stages/InGame";
import Results from "./components/stages/Results";
import Motion from "../../components/providers/Motion";
import BackgroundImage from "./components/BackgroundImage";
import parseArtwork from "@/utils/parseArtwork";
import { AnimatePresence } from "framer-motion";
import { Set } from "@/types/databaseTypes";

interface Props {
  setDetails: Set;
  songs: SongType["data"];
}

const Game = ({ setDetails, songs }: Props) => {
  const { status, set, playlist, currRound, round } = useAppSelector(
    (state) => state.game
  );

  const { currentSong, status: roundStatus } = round;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (set && set.id !== setDetails.id) {
      dispatch(gameActions.restartState());
    }
    dispatch(gameActions.loadSet({ set: setDetails, tracks: songs }));
  }, [set]);

  let backgroundColor: string = "#09090b";
  let accentColor: string = "#52525b";
  if (roundStatus !== "countdown" && currentSong) {
    const { bgColor, primColor } = parseArtwork(currentSong.attributes.artwork);
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
