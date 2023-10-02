import { Set } from "@/types/databaseTypes";
import { SongType } from "@/types/musicApi/Song";
import getRandomElements from "@/utils/getRandomElements";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type GameStatus = "preparing" | "inprogress" | "ended";
type RoundStatus = "countdown" | "guessing" | "guessed" | "timeout";

interface GameConfigMutable {
  rounds: number;
  time: number;
}

interface GameConfigNotLoaded extends GameConfigMutable {
  loaded: false;
  set?: Set;
  songs?: SongType["data"];
  playlist?: SongType["data"];
}

interface GameConfigLoaded extends GameConfigMutable {
  loaded: true;
  set: Set;
  songs: SongType["data"];
  playlist: SongType["data"];
}

interface Round {
  status: RoundStatus;
  current: number;
  song?: SongType["data"][0];
  similarity: number;
}

export interface GameProperties {
  status: GameStatus;
  config: GameConfigLoaded | GameConfigNotLoaded;
  round: Round;
}

const initialState: GameProperties = {
  config: {
    loaded: false,
    rounds: 5,
    time: 30,
  },
  round: {
    current: 0,
    similarity: 0,
    status: "countdown",
  },
  status: "preparing",
};

export interface GameMethods {
  loadConfig: (set: Set, songs: SongType["data"]) => void;
  setConfig: (config: GameConfigMutable) => void;
  startGame: () => void;
  nextRound: () => void;
  beginGuessing: () => void;
  timeout: () => void;
  guessed: () => void;
  setSimilarity: (similarity: number) => void;
  resetState: () => void;
}

export type GameState = GameProperties & GameMethods;

export const useGameState = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,

      loadConfig: (newSet, newSongs) =>
        set((state) => {
          return {
            ...state,
            config: {
              ...state.config,
              loaded: true,
              set: newSet,
              songs: newSongs,
              playlist: getRandomElements(newSongs, state.config.rounds),
            },
          };
        }),

      setConfig: (newConfig) =>
        set((state) => {
          return {
            ...state,
            config: {
              ...state.config,
              ...newConfig,
            },
          };
        }),

      startGame: () =>
        set((state) => {
          if (!state.config.loaded)
            throw new Error("Game config not loaded, cant start the game");

          const randomizedPlaylist = getRandomElements(
            state.config.songs,
            state.config.rounds
          );

          return {
            status: "inprogress",
            config: {
              ...state.config,
              playlist: randomizedPlaylist,
            },
            round: {
              current: 0,
              similarity: 0,
              status: "countdown",
              song: randomizedPlaylist[0],
            },
          };
        }),

      nextRound: () =>
        set((state) => {
          const newRound = state.round.current + 1;
          if (newRound >= state.config.rounds) {
            return { ...state, status: "ended" };
          }

          const newSong = state.config.playlist?.at(newRound);
          if (!newSong) throw new Error("Playlist error");

          return {
            ...state,
            round: {
              ...state.round,
              status: "countdown",
              current: newRound,
              similarity: 0,
              song: newSong,
            },
          };
        }),

      beginGuessing: () =>
        set((state) => ({
          ...state,
          round: { ...state.round, status: "guessing" },
        })),

      timeout: () =>
        set((state) => ({
          ...state,
          round: { ...state.round, status: "timeout" },
        })),

      guessed: () =>
        set((state) => ({
          ...state,
          round: { ...state.round, status: "guessed" },
        })),

      setSimilarity: (newSimilarity) =>
        set((state) => ({
          ...state,
          round: { ...state.round, similarity: newSimilarity },
        })),

      resetState: () => set(initialState),
    }),
    { name: "game-data" }
  )
);

// isInputFocused: boolean;
// startTime: number;
// points: number;
