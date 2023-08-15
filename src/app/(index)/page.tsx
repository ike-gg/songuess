import Home from "@/features/home/components/Home";
import getPopularAlbums from "@/lib/getPopularAlbums";
import getPopularSongs from "@/lib/getPopularSongs";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SonGuess",
  description: "Song guessing game.",
  themeColor: "#4F46E5",
  twitter: {
    card: "summary_large_image",
  },
};

const HomePage = async () => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const popularAlbums = await getPopularAlbums();
  const popularSongs = await getPopularSongs();
  const { data: featuredSets } = await supabase
    .from("sets")
    .select()
    .eq("featured", true);

  return (
    <Home
      albums={popularAlbums}
      songs={popularSongs}
      sets={featuredSets || []}
    />
  );
};

export default HomePage;
