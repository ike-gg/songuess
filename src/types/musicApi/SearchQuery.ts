import { AlbumAttributes } from "./Album";
import { ArtistAttributes } from "./Artist";
import { MusicVideoAttributes } from "./MusicVideo";
import { PlaylistAttributes } from "./Playlist";
import { SongAttributes } from "./Song";

export interface SearchQueryAlbums {
  id: string;
  type: "albums";
  attributes: AlbumAttributes;
}

export interface SearchQuerySong {
  id: string;
  type: "songs";
  attributes: SongAttributes;
}

interface SearchQueryArtists {
  id: string;
  type: "artists";
  attributes: ArtistAttributes;
}

interface SearchQueryMusicVideos {
  id: string;
  type: "music-videos";
  attributes: MusicVideoAttributes;
}

export interface SearchQueryPlaylist {
  id: string;
  type: "playlists";
  attributes: PlaylistAttributes;
}

export interface SearchQuery {
  results: {
    artists?: { data: SearchQueryArtists[] };
    albums?: { data: SearchQueryAlbums[] };
    songs?: { data: SearchQuerySong[] };
    ["music-videos"]?: { data: SearchQueryMusicVideos[] };
    playlists?: { data: SearchQueryPlaylist[] };
  };
}

export type SearchResults =
  | SearchQueryAlbums
  | SearchQueryArtists
  | SearchQueryMusicVideos
  | SearchQuerySong;
