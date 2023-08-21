import { Heading, Paragraph, BackButton } from "@/components/ui";
import { routes } from "@/constants";
import SetImportPlaylist from "@/features/sets/components/importplaylist/SetImportPlaylist";
import getPopularPlaylists from "@/lib/getPopularPlaylists";

const SetTemplatesPage = async () => {
  const popularPlaylists = await getPopularPlaylists();

  return (
    <>
      <BackButton href={routes.sets.create.blank}>
        Back to set creator
      </BackButton>
      <div>
        <Heading>Import playlist as a set template</Heading>
        <Paragraph>
          Start typing and results will show up. Based on Apple Music
        </Paragraph>
      </div>
      <SetImportPlaylist defaultPlaylists={popularPlaylists} />
    </>
  );
};

export default SetTemplatesPage;
