import { SiApplemusic } from "react-icons/si";
import FeaturesCard from "./FeaturesCard";
import { Paragraph, SubHeading } from "@/components/ui";

const FeatureAppleMusic = () => {
  return (
    <FeaturesCard className="bg-gradient-to-br from-apple-400 to-apple-600">
      <SiApplemusic className="mb-6 text-3xl" />
      <SubHeading>Apple Music based</SubHeading>
      <Paragraph>Easily import public apple music playlists!</Paragraph>
    </FeaturesCard>
  );
};

export default FeatureAppleMusic;
