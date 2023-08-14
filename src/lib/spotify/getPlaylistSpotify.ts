import exchangeRefreshSpotify from "./exchangeRefreshSpotify";

interface SpotifyAPIPlaylist {
  description: string;
  id: string;
  images: {
    url: string;
  }[];
  name: string;
  tracks: {
    items: {
      track: {
        external_ids: {
          isrc?: string;
        };
      };
    }[];
  };
}

const getPlaylistSpotify = async (id: string) => {
  const { access_token } = await exchangeRefreshSpotify();

  const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  const data = (await response.json()) as SpotifyAPIPlaylist;

  console.log(data.tracks.items[0]);

  return data;
};

export default getPlaylistSpotify;
