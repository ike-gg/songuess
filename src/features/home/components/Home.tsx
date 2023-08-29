import { SongAttributes, SongType } from "@/types/musicApi/Song";
import Hero from "./hero/Hero";
import { AlbumAttributes } from "@/types/musicApi/Album";
import HomeSets from "./sets/HomeSets";
import { Database } from "@/types/supabase";
import FeaturesHome from "./features/FeaturesHome";
import HomeMultiplayer from "./multiplayer/HomeMultiplayer";

interface Props {
  songs: SongAttributes[];
  albums: AlbumAttributes[];
  sets: Database["public"]["Tables"]["sets"]["Row"][];
}

const Home = ({ albums, songs, sets }: Props) => {
  return (
    <>
      <Hero albums={albums} />
      <FeaturesHome songs={songs} />
      <HomeSets sets={sets} />
      <HomeMultiplayer />
    </>
  );
};

export default Home;
