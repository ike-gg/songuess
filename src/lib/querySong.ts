import { SearchQuery } from "@/types/musicApi/SearchQuery";

const querySong = async (query: string) => {
  const res = await fetch(
    `https://harmony-backend.vercel.app/api/searchQuery?query=${query}&types=songs`
  );

  if (!res.ok) {
    throw new Error("Something went wrong while fetching songs...");
  }

  const data = (await res.json()) as SearchQuery;

  return data;
};

export default querySong;
