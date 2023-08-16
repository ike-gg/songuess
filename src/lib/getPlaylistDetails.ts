import { PlaylistType } from "@/types/musicApi/Playlist";

const getPlaylistDetails = async (playlistId: string) => {
  const res = await fetch(
    `https://harmony-backend.vercel.app/api/getPlaylist?id=${playlistId}`
  );

  if (!res.ok) {
    throw new Error("Something went wrong while fetching playlist details...");
  }

  const data = (await res.json()) as PlaylistType;

  return data.data[0];
};

export default getPlaylistDetails;
