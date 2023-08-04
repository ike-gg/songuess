import { PopularSongs } from "@/types/musicApi/PopularSongs";

const getPopularSongs = async () => {
  const res = await fetch(
    "https://harmony-backend.vercel.app/api/popularSongs",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong while fetching popular songs...");
  }

  const data = (await res.json()) as PopularSongs;

  return data.results.songs[0].data.map((song) => song.attributes);
};

export default getPopularSongs;
