import removeParentheses from "@/utils/removeParentheses";

const getAlbumsArtistsFromSet = async (songsId: string[]) => {
  const ids = songsId.join(",");
  const response = await fetch(
    `https://harmony-backend.vercel.app/api/getSongs?ids=${ids}`
  );

  if (!response.ok) {
    throw new Error("Fetching artists and albums failed.");
  }

  const { data: songDetails } = (await response.json()) as {
    data: {
      attributes: {
        albumName: string;
        artistName: string;
      };
    }[];
  };

  const albums = [
    ...new Set(
      songDetails.map((song) => removeParentheses(song.attributes.albumName))
    ),
  ];
  const artists = [
    ...new Set(
      songDetails.map((song) => removeParentheses(song.attributes.artistName))
    ),
  ];

  return { albums, artists };
};

export default getAlbumsArtistsFromSet;
