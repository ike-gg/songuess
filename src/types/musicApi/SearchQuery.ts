import { AlbumAttributes } from "./Album";
import { ArtistAttributes } from "./Artist";
import { ArtistsRelationship } from "./Common";
import { MusicVideoAttributes } from "./MusicVideo";
import { SongAttributes } from "./Song";

interface SearchQueryAlbums {
  id: string;
  type: "albums";
  attributes: AlbumAttributes;
}

interface SearchQuerySongs {
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

export interface SearchQuery {
  results: {
    artists?: { data: SearchQueryArtists[] };
    albums?: { data: SearchQueryAlbums[] };
    songs?: { data: SearchQuerySongs[] };
    ["music-videos"]?: { data: SearchQueryMusicVideos[] };
  };
}

export type SearchResults =
  | SearchQueryAlbums
  | SearchQueryArtists
  | SearchQueryMusicVideos
  | SearchQuerySongs;
