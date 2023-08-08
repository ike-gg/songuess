import { SearchQuery } from "@/types/musicApi/SearchQuery";

const queryPlaylist = async (query: string) => {
  const res = await fetch(
    `https://harmony-backend.vercel.app/api/searchQuery?query=${query}&types=playlists,albums`
  );

  if (!res.ok) {
    throw new Error("Something went wrong while fetching playlists...");
  }

  const data = (await res.json()) as SearchQuery;

  const { albums, playlists } = data.results;

  const mergedData = [];

  if (playlists) mergedData.push(...playlists.data);
  if (albums) mergedData.push(...albums.data);

  console.log(mergedData);

  return mergedData;
};

export default queryPlaylist;
