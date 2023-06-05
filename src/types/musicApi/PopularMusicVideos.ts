import { MusicVideoAttributes } from "./MusicVideo";

export interface PopularMusicVideos {
  results: {
    "music-videos": {
      name: string;
      data: {
        id: string;
        type: "music-videos";
        attributes: MusicVideoAttributes;
      }[];
    }[];
  };
}
