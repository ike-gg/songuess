import { Logo } from "@/components/ui";
import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "SonGuess";
export const size = {
  width: 1200,
  height: 600,
};

import { Inter } from "next/font/google";
import { headers } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const requestHeaders = headers();
  const url = requestHeaders.get("host");

  const interFont = fetch(new URL("./Inter-Medium.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        className={inter.className}
        style={{
          fontSize: 128,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          position: "relative",
          color: "white",
          background: "radial-gradient(circle at center, #27272A, #18181B)",
        }}
      >
        <img style={{ position: "absolute" }} src={`http://${url}/card.jpg`} />
        <Logo />
        SonGuess
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
