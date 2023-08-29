export const dynamic = "force-dynamic";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SonGuess",
  description:
    "Guess the song titles from a wide range of sets. Test your music knowledge now!",
  keywords: [
    "song",
    "guessing",
    "game",
    "titles",
    "playlists",
    "sets",
    "games",
    "play",
    "friends",
    "multiplayer",
    "music quiz",
    "song title guessing",
    "music puzzle game",
    "guess the tune",
    "name that song",
    "song lyrics quiz",
    "music trivia",
    "playlist challenge",
    "music knowledge",
    "song guessing",
    "melody puzzle",
    "music brain teaser",
    "play and guess",
    "music recognition",
    "hit song quiz",
    "tune riddle",
    "name the artist",
    "song lyric challenge",
    "music guessing game",
    "beat the melody",
  ],
  themeColor: "#4F46E5",
  twitter: {
    card: "summary_large_image",
  },
  authors: [{ name: "ike", url: "https://github.com/ike-gg" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-zinc-950 text-zinc-100 transition-colors duration-500">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
