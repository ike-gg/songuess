import { Badge } from "@/components/ui";
import MultiplayerChat from "./MultiplayerChat";
import * as HomeSection from "../shared/HomeSection";

const HomeMultiplayer = () => {
  return (
    <HomeSection.Wrapper>
      <div className="mx-auto flex max-w-2xl flex-col gap-2 text-center">
        <HomeSection.Header
          above={<Badge className="mx-auto w-fit">COMING SOON</Badge>}
        >
          Multiplayer
        </HomeSection.Header>
        <HomeSection.Paragraph>
          Challenge friends and music enthusiasts worldwide to thrilling
          real-time multiplayer battles. Test your music knowledge, compete for
          high scores, and reign supreme in the ultimate music showdowns!
        </HomeSection.Paragraph>
      </div>
      <HomeSection.Content>
        <MultiplayerChat />
      </HomeSection.Content>
    </HomeSection.Wrapper>
  );
};

export default HomeMultiplayer;
