import { SongType } from "@/types/musicApi/Song";

const getSongsByISRC = async (isrc: string[] | string) => {
  const isrcQuery = Array.isArray(isrc) ? isrc.join(",") : isrc;
  const res = await fetch(
    `https://harmony-backend.vercel.app/api/getSongs?ids=${isrcQuery}&isrc=true`
  );

  if (!res.ok) {
    throw new Error("Something went wrong while fetching songs...");
  }

  const { data } = (await res.json()) as SongType;

  return data;

  // const uniqueISRC: string[] = [];
  // const songs: SongType["data"] = [];

  // for (const song of data) {
  //   const { isrc } = song.attributes;
  //   if (uniqueISRC.includes(isrc)) continue;
  //   if (song.attributes.previews.length === 0) continue;
  //   songs.push(song);
  //   uniqueISRC.push(isrc);
  // }

  // return songs;
};

export default getSongsByISRC;
