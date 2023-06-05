import {
  ArtistsRelationship,
  Artwork,
  EditorialNotes,
  SongsRelationship,
} from "./Common";
import { SongAttributes, SongRelationships } from "./Song";

export interface AlbumType {
  data: {
    id: string;
    type: "albums";
    attributes: AlbumAttributes;
    relationships: AlbumRelationships;
  }[];
}

export interface AlbumAttributes {
  artistName: string;
  artwork: Artwork;
  copyright?: string;
  editorialNotes?: EditorialNotes;
  genreNames: string[];
  isCompilation: boolean;
  isComplete: boolean;
  isSingle: boolean;
  name: string;
  recordLabel?: string;
  releaseDate?: string;
  trackCount: number;
  url: string;
}

export interface AlbumRelationshipsTracks {
  data: {
    id: string;
    type: "music-videos" | "songs";
    attributes: SongAttributes;
  }[];
}

export interface AlbumRelationships {
  artists?: ArtistsRelationship;
  tracks?: AlbumRelationshipsTracks;
}
