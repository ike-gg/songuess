import { cookies } from "next/headers";
import getAuthBufferSpotify from "./getAuthBufferSpotify";
import { redirect } from "next/navigation";
import { decrypt } from "@/utils/crypto";
import { routes } from "@/constants";

const exchangeRefreshSpotify = async () => {
  const { get } = cookies();
  const spotifyCredentials = get("spotify");

  if (!spotifyCredentials) {
    redirect(routes.sets.create.blank);
  }

  const { value: refreshTokenEncrypted } = spotifyCredentials;
  const refreshToken = decrypt(refreshTokenEncrypted);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: getAuthBufferSpotify(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  const data = (await response.json()) as {
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
    scope: string;
  };

  return data;
};

export default exchangeRefreshSpotify;
