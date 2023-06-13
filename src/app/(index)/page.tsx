import HomeButtons from "@/components/content/home/HomeButtons";
import HomeDesc from "@/components/content/home/HomeDesc";
import HomeHero from "@/components/content/home/HomeHero";
import { PopularAlbums } from "@/types/musicApi/PopularAlbums";

const Page = async () => {
  const fetchData = await fetch(
    "https://harmony-backend.vercel.app/api/popularAlbums",
    { next: { revalidate: 3600 } }
  );

  const data = (await fetchData.json()) as PopularAlbums;

  const albumsData = data.results.albums[0].data;
  const albums = albumsData.map((album) => album.attributes);

  return (
    <section className="my-8 flex flex-col items-center gap-6 px-4 md:gap-8">
      <HomeHero albums={albums} />
      <HomeDesc />
      <HomeButtons />
    </section>
  );
};

export default Page;
