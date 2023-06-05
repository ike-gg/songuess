import { SongType } from "@/types/musicApi/Song";
import { Database } from "@/types/supabase";
import getRandomElements from "@/utils/getRandomElements";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Set = Database["public"]["Tables"]["sets"]["Row"];

export interface GameSlice {
  status: "preparing" | "inprogress" | "ended";
  maxRounds: number;
  roundTime: number;
  currRound: number;
  set?: Set;
  tracks?: SongType["data"];
  playlist?: SongType["data"];
}

const initialState: GameSlice = {
  status: "preparing",
  maxRounds: 10,
  roundTime: 30,
  currRound: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    loadSet: (state, action: PayloadAction<Set>) => {
      state.set = action.payload;
    },
    loadTracks: (state, action: PayloadAction<SongType["data"]>) => {
      state.tracks = action.payload;
    },
    randomizePlaylist: (state) => {
      if (!state.tracks) return;
      state.playlist = getRandomElements(state.tracks, state.maxRounds);
    },
    resetGame: (state) => {
      state.status = "preparing";
    },
    setRounds: (state, action: PayloadAction<number>) => {
      state.maxRounds = action.payload;
      if (!state.tracks) return;
      state.playlist = getRandomElements(state.tracks, action.payload);
    },
    setTimeRound: (state, action: PayloadAction<number>) => {
      state.roundTime = action.payload;
    },
    startGame: (state) => {
      state.status = "inprogress";
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
