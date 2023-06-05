import { AlbumAttributes } from "./Album";

export interface PopularAlbums {
  results: {
    albums: {
      name: string;
      data: {
        id: string;
        type: "albums";
        attributes: AlbumAttributes;
      }[];
    }[];
  };
}
