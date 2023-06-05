import { SongAttributes } from "./Song";

export interface PopularSongs {
  results: {
    songs: {
      name: "Top Songs";
      data: {
        id: string;
        type: "songs";
        attributes: SongAttributes;
      }[];
    }[];
  };
}
