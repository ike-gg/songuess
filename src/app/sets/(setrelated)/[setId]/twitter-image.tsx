import { Logo } from "@/components/ui";
import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "Music set";
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
  params: { setId },
}: {
  params: { setId: string };
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

  const { data, error } = await supabase
    .from("sets")
    .select()
    .eq("id", setId)
    .single();

  return new ImageResponse(
    (
      <div
        className={inter.className}
        style={{
          fontSize: 78,
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
            alignItems: "flex-start",
            justifyContent: "flex-end",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: 35,
          }}
        >
          {data?.cover && (
            <img
              src={data.cover}
              style={{
                width: 250,
                height: 250,
                borderRadius: 15,
                marginBottom: 20,
              }}
            />
          )}
          <p style={{ margin: 0 }}>{data?.name || "Music set"}</p>
          <p style={{ margin: 0, opacity: 0.5 }}>
            {data?.songs.length + " tracks" || "SonGuess"}
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
