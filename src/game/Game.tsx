/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SongType } from "@/types/musicApi/Song";
import { Database } from "@/types/supabase";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { gameActions } from "@/store/gameSlice";
import { useEffect } from "react";
import Preparing from "./components/stages/Preparing";
import InGame from "./components/stages/InGame";
import Button from "@/components/ui/Button";
import Results from "./components/stages/Results";
import Motion from "../components/providers/Motion";

type Set = Database["public"]["Tables"]["sets"]["Row"];

interface Props {
  setDetails: Set;
  songs: SongType["data"];
}

const Game = ({ setDetails, songs }: Props) => {
  const { status, set, playlist, currRound } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (set && set.id !== setDetails.id) {
      dispatch(gameActions.restartState());
    }
    dispatch(gameActions.loadSet({ set: setDetails, tracks: songs }));
  }, [set]);

  return (
    <Motion duration={0.5}>
      <motion.main className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden p-3">
        {status === "preparing" && <Preparing />}
        {status === "inprogress" && <InGame />}
        {status === "ended" && <Results />}
        {/* <div key="devbuttons" className="fixed bottom-0 left-0 m-4 flex gap-2">
          <Button onClick={() => dispatch(gameActions.restartState())}>
            Clear state
          </Button>
          <Button onClick={() => dispatch(gameActions.nextRound())}>
            increment round ({currRound})
          </Button>
        </div> */}
      </motion.main>
    </Motion>
  );
};

export default Game;
