import getAuthBufferSpotify from "./getAuthBufferSpotify";

const getAccessTokenSpotify = async (code: string) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: getAuthBufferSpotify(),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_CALLBACK_URL || "",
    }),
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  const data = (await response.json()) as {
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
    refresh_token: string;
    scope: string;
  };

  return data;
};

export default getAccessTokenSpotify;
