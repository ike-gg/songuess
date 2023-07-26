import { PlaylistAttributes } from "./Playlist";

export interface PopularPlaylists {
  results: {
    playlists: {
      name: string;
      data: {
        id: string;
        type: "playlists";
        attributes: PlaylistAttributes;
      }[];
    }[];
  };
}
