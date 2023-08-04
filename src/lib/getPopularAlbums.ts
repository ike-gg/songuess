import { PopularAlbums } from "@/types/musicApi/PopularAlbums";

const getPopularAlbums = async () => {
  const res = await fetch(
    "https://harmony-backend.vercel.app/api/popularAlbums",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong while fetching popular albums...");
  }

  const data = (await res.json()) as PopularAlbums;

  return data.results.albums[0].data.map((album) => album.attributes);
};

export default getPopularAlbums;
