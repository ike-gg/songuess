const getUrlAuthSpotify = () => {
  const basicUrl = new URL("https://accounts.spotify.com/authorize?");

  const queryParams = {
    client_id: process.env.SPOTIFY_CLIENT_ID || "",
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_CALLBACK_URL || "",
    scope:
      "playlist-read-private user-top-read user-read-recently-played user-library-read",
    show_dialog: process.env.NODE_ENV === "development" ? "true" : "false",
  };

  basicUrl.search = new URLSearchParams(queryParams).toString();

  return basicUrl.toString();
};

export default getUrlAuthSpotify;
