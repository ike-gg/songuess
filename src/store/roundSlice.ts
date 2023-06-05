import { SongType } from "@/types/musicApi/Song";
import { Database } from "@/types/supabase";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { store } from ".";

type Set = Database["public"]["Tables"]["sets"]["Row"];

export interface RoundSlice {
  status: "countdown" | "guessing" | "guessed" | "timeout";
  currentSong?: SongType["data"][0];
  guessSimilarity: number;
  isInputFocused: boolean;
}

const initialState: RoundSlice = {
  status: "countdown",
  guessSimilarity: 0,
  isInputFocused: false,
};

export const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    loadSong: (state, action: PayloadAction<SongType["data"][0]>) => {
      state.currentSong = action.payload;
    },
    startCountDown: (state, action: PayloadAction) => {},
    setGuessSimilarity: (state, action: PayloadAction<number>) => {
      state.guessSimilarity = action.payload;
    },
    setInputFocus: (state, action: PayloadAction<boolean>) => {
      state.isInputFocused = action.payload;
    },
    setSong: (state) => {
      const storeState = store.getState();
    },
  },
});

export const roundActions = roundSlice.actions;
export default roundSlice.reducer;
