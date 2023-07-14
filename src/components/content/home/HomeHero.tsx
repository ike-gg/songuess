/* eslint-disable @next/next/no-img-element */
import ScrollingMarquee from "@/components/content/home/ScrollingMarquee";
import { AlbumAttributes } from "@/types/musicApi/Album";
import { twMerge } from "tailwind-merge";
import HomeLogo from "./HomeLogo";
import HomeTitle from "./HomeTitle";
import chunkArray from "@/utils/chunkArray";
import parseArtwork from "@/utils/parseArtwork";

interface Props {
  albums: AlbumAttributes[];
}

const HomeHero = ({ albums }: Props) => {
  const albumsChunks = chunkArray(albums, 3);

  const albumElements = albumsChunks.map((albumsArray) => {
    return albumsArray.map((album) => {
      const { name, artistName, artwork } = album;
      const {
        artworkUrl: { small },
      } = parseArtwork(artwork);
      return (
        <img
          src={small}
          key={`${name}${artistName}`}
          alt={`album ${name} artwork by ${artistName}`}
          className="h-36 w-36 rounded-lg bg-zinc-800 "
        />
      );
    });
  });

  return (
    <div
      className={twMerge(
        "relative z-50 flex w-full flex-col",
        "bg-transparent before:absolute before:-left-1 before:z-20 before:h-full before:w-12 before:bg-gradient-to-r before:from-zinc-950 before:to-transparent md:before:w-56",
        "after:absolute after:-right-1 after:z-20 after:h-full after:w-12 after:bg-gradient-to-l after:from-zinc-950 after:to-transparent md:after:w-56 "
      )}
    >
      <div className="flex flex-col gap-6">
        <ScrollingMarquee basedElement={false} speed={1.6}>
          {albumElements[0]}
        </ScrollingMarquee>
        <ScrollingMarquee basedElement={false} speed={0.8} direction="right">
          {albumElements[1]}
        </ScrollingMarquee>
        <ScrollingMarquee basedElement={false} speed={1.3}>
          {albumElements[2]}
        </ScrollingMarquee>
      </div>
      <div className="absolute top-1/2 z-50 flex w-full -translate-y-1/2 flex-col items-center justify-center gap-4">
        <HomeLogo />
        <HomeTitle />
      </div>
    </div>
  );
};

export default HomeHero;
