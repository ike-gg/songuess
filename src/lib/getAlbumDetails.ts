import { AlbumType } from "@/types/musicApi/Album";

const getAlbumDetails = async (albumId: string) => {
  const res = await fetch(
    `https://harmony-backend.vercel.app/api/getAlbum?id=${albumId}`
  );

  if (!res.ok) {
    throw new Error("Something went wrong while fetching album details...");
  }

  const data = (await res.json()) as AlbumType;

  return data.data[0];
};

export default getAlbumDetails;
