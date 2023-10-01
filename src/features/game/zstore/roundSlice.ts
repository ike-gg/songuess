import { SongType } from "@/types/musicApi/Song";

export interface RoundSlice {
  status: "countdown" | "guessing" | "guessed" | "timeout";
  currentSong?: SongType["data"][0];
  similarity: number;
  isInputFocused: boolean;
  startTime: number;
}

