import { SearchQuery } from "@/types/musicApi/SearchQuery";

const queryPlaylist = async (query: string) => {
  const res = await fetch(
    `https://harmony-backend.vercel.app/api/searchQuery?query=${query}&types=playlists`
  );

  if (!res.ok) {
    throw new Error("Something went wrong while fetching playlists...");
  }

  const data = (await res.json()) as SearchQuery;

  return data.results.playlists?.data;
};

export default queryPlaylist;
