import Home from "@/features/home/components/Home";
import getPopularAlbums from "@/lib/getPopularAlbums";
import getPopularSongs from "@/lib/getPopularSongs";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

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
