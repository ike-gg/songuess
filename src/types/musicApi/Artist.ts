import {
  AlbumsRelationship,
  Artwork,
  EditorialNotes,
  MusicVideosRelationship,
  PlaylistsRelationship,
} from "./Common";

export interface ArtistType {
  data: {
    id: string;
    type: "artists";
    attributes: ArtistAttributes;
    relationships: ArtistRelationships;
  }[];
}

export interface ArtistAttributes {
  artwork?: Artwork;
  editorialNotes?: EditorialNotes;
  genreNames: string[];
  name: string;
  url: string;
}

interface ArtistRelationships {
  albums?: AlbumsRelationship;
  "music-videos"?: MusicVideosRelationship;
  playlists?: PlaylistsRelationship;
}
