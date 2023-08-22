/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "Lobby preview";
export const size = {
  width: 1200,
  height: 600,
};

import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
const inter = Inter({ subsets: ["latin"] });

export const contentType = "image/png";

// Image generation
export default async function Image({
  params: { lobbyId },
}: {
  params: { lobbyId: string };
}) {
  const requestHeaders = headers();
  const url = requestHeaders.get("host");

  const interFont = fetch(new URL("./Inter-Medium.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: lobbyData, error } = await supabase
    .from("lobbies")
    .select("id, name, leader, users!lobbies_leader_fkey (username)")
    .eq("id", lobbyId)
    .single();

  console.log(lobbyData);

  lobbyData?.users?.username;

  return new ImageResponse(
    (
      <div
        className={inter.className}
        style={{
          fontSize: 64,
          width: "100%",
          height: "100%",
          position: "relative",
          color: "white",
          display: "flex",
        }}
      >
        <img style={{ position: "absolute" }} src={`http://${url}/card.jpg`} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: 35,
            gap: 10,
          }}
        >
          <p style={{ margin: "0 0 35px 0", fontSize: 25 }}>
            Multiplayer invitation
          </p>
          <h1 style={{ margin: 0, fontSize: 72 }}>
            {lobbyData?.users?.username || "user"} invites you
          </h1>
          <p style={{ margin: 0, fontSize: 64 }}>
            {lobbyData?.name || "Lobby"}
          </p>
          <p style={{ margin: "20px 0 0 0", fontSize: 16 }}>
            powered by songu.es
          </p>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interFont,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
