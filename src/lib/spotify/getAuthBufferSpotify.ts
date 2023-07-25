const getAuthBufferSpotify = () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID || "";
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET || "";

  const base64 = Buffer.from(client_id + ":" + client_secret).toString(
    "base64"
  );

  return `Basic ${base64}`;
};

export default getAuthBufferSpotify;
