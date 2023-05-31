import HomeButtons from "./HomeButtons";
import HomeDesc from "./HomeDesc";
import HomeLogo from "./HomeLogo";
import HomeTitle from "./HomeTitle";

const Home = () => {
  return (
    <section className="my-12 flex flex-col items-center gap-6 px-6 md:my-24 md:gap-8">
      <HomeLogo />
      <HomeTitle />
      <HomeDesc />
      <HomeButtons />
    </section>
  );
};

export default Home;
