/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SongType } from "@/types/musicApi/Song";
import { Database } from "@/types/supabase";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { gameActions } from "@/store/gameSlice";
import { useEffect, useLayoutEffect } from "react";
import Preparing from "./Preparing";
import InGame from "./ingame/InGame";

type Set = Database["public"]["Tables"]["sets"]["Row"];

interface Props {
  setDetails: Set;
  songs: SongType["data"];
}

const Game = ({ setDetails, songs }: Props) => {
  const { status, maxRounds, set } = useAppSelector((state) => state.game);
  const dispatcher = useAppDispatch();

  useEffect(() => {
    if (set && set.id !== setDetails.id) {
      console.log("resetting game...");
      dispatcher(gameActions.resetGame());
    }
    dispatcher(gameActions.loadSet(setDetails));
    dispatcher(gameActions.loadTracks(songs));
  }, [set]);

  return (
    <motion.main className="flex h-screen w-screen items-center justify-center p-3">
      {status === "preparing" && <Preparing />}
      {status === "inprogress" && <InGame />}
      {status === "ended" && <p>results</p>}
    </motion.main>
  );
};

export default Game;
