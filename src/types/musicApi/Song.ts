import {
  AlbumsRelationship,
  ArtistsRelationship,
  Artwork,
  EditorialNotes,
  MusicVideosRelationship,
} from "./Common";

export interface SongType {
  data: {
    id: string;
    type: "songs";
    attributes: SongAttributes;
    relationships: SongRelationships;
  }[];
}

export interface SongAttributes {
  albumName: string;
  artistName: string;
  artwork: Artwork;
  composerName?: string;
  discNumber: number;
  durationInMillis: number;
  editorialNotes?: EditorialNotes;
  genreNames: string[];
  name: string;
  previews: {
    url: string;
  }[];
  releaseDate?: string;
  trackNumber?: number;
  url: string;
}

export interface SongRelationships {
  albums?: AlbumsRelationship;
  artists?: ArtistsRelationship;
  "music-videos": MusicVideosRelationship;
}
