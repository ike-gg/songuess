import { Paragraph, SubHeading } from "@/components/ui";
import FeaturesCard from "./FeaturesCard";
import { RxClock } from "react-icons/rx";

const FeatureGameOptions = () => {
  return (
    <FeaturesCard className="bg-gradient-to-br">
      <RxClock className="mb-6 text-3xl" />
      <SubHeading>Custom options</SubHeading>
      <Paragraph>
        Customize round durations and the number of rounds, making each game
        tailored to your preferences!
      </Paragraph>
    </FeaturesCard>
  );
};

export default FeatureGameOptions;
