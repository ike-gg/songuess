import FeaturesCard from "./FeaturesCard";
import { Badge, Heading, Paragraph, SubHeading } from "@/components/ui";
import { RxPerson } from "react-icons/rx";

const FeatureMulti = () => {
  return (
    <FeaturesCard>
      <div className="mb-6 flex text-3xl">
        <RxPerson />
        <RxPerson />
      </div>
      <SubHeading className="relative">Multiplayer</SubHeading>
      <Paragraph>
        Challenge your friends to thrilling real-time multiplayer battles,
        putting your music knowledge to the ultimate test!
      </Paragraph>
      <Badge className="absolute right-0 top-0 m-3">SOON</Badge>
    </FeaturesCard>
  );
};

export default FeatureMulti;
