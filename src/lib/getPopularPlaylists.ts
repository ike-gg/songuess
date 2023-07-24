import { PopularPlaylists } from "@/types/musicApi/PopularPlaylists";

const getPopularPlaylists = async () => {
  const res = await fetch(
    "https://harmony-backend.vercel.app/api/popularPlaylists"
  );

  if (!res.ok) {
    throw new Error("Something went wrong while fetching popular playlists...");
  }

  const data = (await res.json()) as PopularPlaylists;

  return data.results.playlists[0].data;
};

export default getPopularPlaylists;
