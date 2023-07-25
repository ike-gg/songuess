import exchangeRefreshSpotify from "./exchangeRefreshSpotify";

interface SpotifyAPIUserPlaylists {
  items: {
    description: string;
    images: {
      url: string;
    }[];
    name: string;
    tracks: {
      total: number;
    };
    id: string;
  }[];
}

const getUserPlaylistsSpotify = async () => {
  const { access_token } = await exchangeRefreshSpotify();

  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  const data = (await response.json()) as SpotifyAPIUserPlaylists;

  return data;
};

export default getUserPlaylistsSpotify;
