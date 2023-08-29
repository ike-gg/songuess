import Home from "@/features/home/components/Home";
import { DatabaseClient } from "@/lib/database/databaseClient";
import getPopularAlbums from "@/lib/getPopularAlbums";
import getPopularSongs from "@/lib/getPopularSongs";
import { cookies } from "next/headers";

const HomePage = async () => {
  const database = new DatabaseClient({ type: "serverComponent", cookies });

  const popularAlbums = await getPopularAlbums();
  const popularSongs = await getPopularSongs();
  const { data: featuredSets } = await database.sets.getFeatured();

  return (
    <Home
      albums={popularAlbums}
      songs={popularSongs}
      sets={featuredSets || []}
    />
  );
};

export default HomePage;
