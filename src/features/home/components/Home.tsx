import { SongAttributes, SongType } from "@/types/musicApi/Song";
import Hero from "./hero/Hero";
import { AlbumAttributes } from "@/types/musicApi/Album";
import HomeSets from "./sets/HomeSets";
import FeaturesHome from "./features/FeaturesHome";
import HomeMultiplayer from "./multiplayer/HomeMultiplayer";
import { Set } from "@/types/databaseTypes";

interface Props {
  songs: SongAttributes[];
  albums: AlbumAttributes[];
  sets: Set[];
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
