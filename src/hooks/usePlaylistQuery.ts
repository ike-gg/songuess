import queryPlaylist from "@/lib/queryPlaylist";
import {
  SearchQueryAlbums,
  SearchQueryPlaylist,
} from "@/types/musicApi/SearchQuery";
import { useEffect, useState } from "react";

interface PlaylistQueryOptions {
  defaultData?: SearchQueryPlaylist[];
}

const usePlaylistQuery = (
  query: string,
  options: PlaylistQueryOptions = {}
) => {
  const { defaultData } = options;

  const [playlists, setPlaylists] = useState<
    (SearchQueryPlaylist | SearchQueryAlbums)[]
  >(defaultData || []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setError(null);
      setIsLoading(false);
      return;
    }

    const fetchPlaylists = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const playlists = await queryPlaylist(query);

        if (!playlists) {
          setIsLoading(false);
          setError("Nothing found with provided query.");
          setPlaylists([]);
          return;
        }

        setIsLoading(false);
        setPlaylists(playlists);
      } catch (error) {
        setIsLoading(false);
        setError("Something went wrong while fetching playlists...");
      }
    };

    fetchPlaylists();
  }, [query]);

  return { playlists, isLoading, error };
};

export default usePlaylistQuery;
