import querySong from "@/lib/querySong";
import { SearchQuerySong } from "@/types/musicApi/SearchQuery";
import { useEffect, useState } from "react";

interface SongQueryOptions {}

const useSongQuery = (query: string, {}: SongQueryOptions = {}) => {
  const [songs, setSongs] = useState<SearchQuerySong[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setError(null);
      setIsLoading(false);
      setSongs([]);
      return;
    }

    const fetchSongs = async () => {
      setSongs([]);
      setError(null);
      setIsLoading(true);

      try {
        const data = await querySong(query);

        if (!data.results.songs) {
          setIsLoading(false);
          setError("Nothing found with provided query.");
          return;
        }

        setIsLoading(false);
        setSongs(data.results.songs.data);
      } catch (error) {
        setIsLoading(false);
        setError("Something went wrong while fetching songs...");
      }
    };

    fetchSongs();
  }, [query]);

  return { songs, isLoading, error };
};

export default useSongQuery;
