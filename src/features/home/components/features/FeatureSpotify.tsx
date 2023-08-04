import { ImSpotify } from "react-icons/im";
import FeaturesCard from "./FeaturesCard";
import { Paragraph, SubHeading } from "@/components/ui";

const FeatureSpotify = () => {
  return (
    <FeaturesCard className="bg-gradient-to-br from-spotify-400 to-spotify-600">
      <ImSpotify className="mb-8 text-3xl" />
      <SubHeading>Spotify integration</SubHeading>
      <Paragraph>Import your library into songuess with ease.</Paragraph>
    </FeaturesCard>
  );
};

export default FeatureSpotify;
