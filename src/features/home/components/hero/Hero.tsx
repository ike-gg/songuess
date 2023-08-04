import { AlbumAttributes } from "@/types/musicApi/Album";
import HomeButtons from "./HomeButtons";
import HomeDesc from "./HomeDesc";
import HomeHero from "./HomeHero";
import HomeSectionContent from "../shared/HomeSectionContent";

interface Props {
  albums: AlbumAttributes[];
}

const Hero = ({ albums }: Props) => {
  return (
    <section className="mx-auto my-12 flex max-w-screen-xl flex-col items-center justify-center gap-6 px-4 md:gap-8">
      <HomeHero albums={albums} />
      <HomeSectionContent className="flex flex-col gap-6">
        <HomeDesc />
        <HomeButtons />
      </HomeSectionContent>
    </section>
  );
};

export default Hero;
