import { Badge } from "@/components/ui";
import MultiplayerChat from "./MultiplayerChat";
import HomeSectionHeader from "../shared/HomeSectionHeader";
import HomeSectionParagraph from "../shared/HomeSectionParagraph";
import HomeSectionContent from "../shared/HomeSectionContent";
import HomeSectionWrapper from "../shared/HomeSectionWrapper";

const HomeMultiplayer = () => {
  return (
    <HomeSectionWrapper>
      <div className="mx-auto flex max-w-2xl flex-col gap-2 text-center">
        <HomeSectionHeader
          above={<Badge className="mx-auto w-fit">COMING SOON</Badge>}
        >
          Multiplayer
        </HomeSectionHeader>
        <HomeSectionParagraph>
          We give you full control over your music experience. Enjoy pre-made
          playlists from various categories or have fun crafting your own.
        </HomeSectionParagraph>
      </div>
      <HomeSectionContent>
        <MultiplayerChat />
      </HomeSectionContent>
    </HomeSectionWrapper>
  );
};

export default HomeMultiplayer;
