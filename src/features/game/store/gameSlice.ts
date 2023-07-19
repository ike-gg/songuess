import { SongType } from "@/types/musicApi/Song";
import { Database } from "@/types/supabase";
import calculatePoints from "@/utils/calculatePoints";
import getRandomElements from "@/utils/getRandomElements";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

type Set = Database["public"]["Tables"]["sets"]["Row"];

export interface RoundState {
  status: "countdown" | "guessing" | "guessed" | "timeout";
  currentSong?: SongType["data"][0];
  similarity: number;
  isInputFocused: boolean;
  startTime: number;
}

export interface GameSlice {
  status: "preparing" | "inprogress" | "ended";
  maxRounds: number;
  roundTime: number;
  currRound: number;
  set?: Set;
  tracks?: SongType["data"];
  playlist?: SongType["data"];
  round: RoundState;
  points: number;
  volume: number;
}

const initialState: GameSlice = {
  status: "preparing",
  maxRounds: 10,
  roundTime: 30,
  currRound: 0,
  points: 0,
  volume: 0.5,
  round: {
    status: "countdown",
    similarity: 0,
    isInputFocused: false,
    startTime: new Date().valueOf(),
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    loadSet: (
      state,
      action: PayloadAction<{ set: Set; tracks: SongType["data"] }>
    ) => {
      state.tracks = action.payload.tracks;
      state.set = action.payload.set;
    },
    setRounds: (state, action: PayloadAction<number>) => {
      state.maxRounds = action.payload;
      if (!state.tracks) return;
      state.playlist = getRandomElements(state.tracks, action.payload);
    },
    setTimeRound: (state, action: PayloadAction<number>) => {
      state.roundTime = action.payload;
    },
    setGameStatus: (state, action: PayloadAction<GameSlice["status"]>) => {
      state.status = action.payload;
    },
    startGame: (state) => {
      const { tracks, maxRounds, currRound } = current(state);
      if (!tracks) return;
      state.playlist = getRandomElements(tracks, maxRounds);
      state.round.currentSong = state.playlist![currRound];
      state.round.status = "countdown";
      state.status = "inprogress";
    },
    setRoundStatus: (state, action: PayloadAction<RoundState["status"]>) => {
      const { payload: newStatus } = action;
      if (newStatus === "guessing") {
        state.round.startTime = new Date().valueOf();
      }
      if (newStatus === "guessed") {
        if (state.round.status === "timeout") return;
        const { startTime } = state.round;
        const currentTime = new Date().valueOf();
        const guessedInSeconds = (currentTime - startTime) / 1000;
        const gainedPoints = calculatePoints(guessedInSeconds);
        state.points += gainedPoints;
      }
      state.round.status = newStatus;
    },
    nextRound: (state) => {
      const { currRound, playlist } = state;
      const newRound = currRound + 1;
      if (newRound >= state.maxRounds) {
        state.status = "ended";
        return;
      }
      state.currRound = newRound;
      state.round.similarity = 0;
      state.round.status = "countdown";
      if (playlist) state.round.currentSong = playlist[newRound];
    },
    setSimilarity: (state, action: PayloadAction<number>) => {
      state.round.similarity = action.payload;
    },
    setInputFocus: (state, action: PayloadAction<boolean>) => {
      state.round.isInputFocused = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    restartState: (state) => {
      return { ...initialState, volume: state.volume };
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
