import { AlbumAttributes } from "./Album";
import { ArtistAttributes } from "./Artist";
import { MusicVideoAttributes } from "./MusicVideo";
import { PlaylistAttributes } from "./Playlist";
import { SongAttributes } from "./Song";

export interface Artwork {
  bgColor?: string;
  height: number;
  width: number;
  textColor1?: string;
  textColor2?: string;
  textColor3?: string;
  textColor4?: string;
  url: string;
}

export interface EditorialNotes {
  short?: string;
  standard?: string;
  name?: string;
  tagline?: string;
}

export interface AlbumsRelationship {
  data: {
    id: string;
    type: "albums";
    attributes: AlbumAttributes;
  }[];
}

export interface SongsRelationship {
  data: {
    id: string;
    type: "songs";
    attributes: SongAttributes;
  }[];
}

export interface ArtistsRelationship {
  data: {
    id: string;
    type: "artists";
    attributes: ArtistAttributes;
  }[];
}

export interface MusicVideosRelationship {
  data: {
    id: string;
    type: "music-videos";
    attributes: MusicVideoAttributes;
  }[];
}

export interface PlaylistsRelationship {
  data: {
    id: string;
    type: "playlists";
    attributes: PlaylistAttributes;
  }[];
}

export interface LibraryAlbums {
  id: string;
  type: "albums";
  attributes: AlbumAttributes;
}

export interface LibrarySongs {
  id: string;
  type: "songs";
  attributes: SongAttributes;
}

export interface LibraryArtists {
  id: string;
  type: "artists";
  attributes: ArtistAttributes;
}

export interface LibraryPlaylists {
  id: string;
  type: "playlists";
  attributes: PlaylistAttributes;
}

export type LibraryItem =
  | LibraryAlbums
  | LibrarySongs
  | LibraryArtists
  | LibraryPlaylists;
