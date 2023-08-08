import { Heading, Paragraph, BackButton } from "@/components/ui";
import SetImportPlaylist from "@/features/sets/components/importplaylist/SetImportPlaylist";
import getPopularPlaylists from "@/lib/getPopularPlaylists";

const SetImportPlaylistPage = async () => {
  const popularPlaylists = await getPopularPlaylists();

  return (
    <>
      <BackButton href="/sets/create">Back to set creator</BackButton>
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

export default SetImportPlaylistPage;
