"use client";
import { SongAttributes } from "@/types/musicApi/Song";
import FeatureGuess from "./FeatureGuess";
import FeatureSpotify from "./FeatureSpotify";
import FeatureAppleMusic from "./FeautreAppleMusic";
import FeatureLevels from "./FeatureLevels";
import FeatureGameOptions from "./FeatureGameOptions";
import FeatureMulti from "./FeatureMulti";
import * as HomeSection from "../shared/HomeSection";

interface Props {
  songs: SongAttributes[];
}

const FeaturesHome = ({ songs }: Props) => {
  return (
    <HomeSection.Wrapper className="max-w-screen-lg">
      <div className="mx-auto flex max-w-2xl flex-col gap-2 text-center">
        <HomeSection.Header>Features of SonGuess</HomeSection.Header>
        <HomeSection.Paragraph>
          SongGuess offers a plenty of features to enhance your music gaming
          experience. Customize round durations, participate in real-time
          multiplayer games, create sets, and conquer challenges to climb the
          leaderboard.
        </HomeSection.Paragraph>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FeatureGuess songs={songs} />
        <FeatureSpotify />
        <FeatureAppleMusic />
        <FeatureMulti />
        <FeatureLevels />
        <FeatureGameOptions />
      </div>
    </HomeSection.Wrapper>
  );
};

export default FeaturesHome;
