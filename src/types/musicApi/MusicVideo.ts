import { AlbumAttributes } from "./Album";
import {
  AlbumsRelationship,
  ArtistsRelationship,
  Artwork,
  EditorialNotes,
  SongsRelationship,
} from "./Common";
import { SongAttributes } from "./Song";
import { ArtistAttributes } from "./Artist";

export interface MusicVideoType {
  data: {
    id: string;
    type: "music-videos";
    attributes: MusicVideoAttributes;
    relationships: MusicVideoRelationships;
  }[];
}

export interface MusicVideoAttributes {
  albumName?: string;
  artistName: string;
  artwork: Artwork;
  editorialNotes?: EditorialNotes;
  genreNames: string[];
  name: string;
  previews: { artwork: Artwork; url: string }[];
  releaseDate?: string;
  trackNumber?: number;
  url: string;
}

export interface MusicVideoRelationships {
  albums?: AlbumsRelationship;
  songs?: SongsRelationship;
  artists?: ArtistsRelationship;
}
