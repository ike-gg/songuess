import { Heading, Paragraph, BackButton } from "@/components/ui";
import SetImportPlaylist from "@/features/sets/components/importplaylist/SetImportPlaylist";
import getPopularPlaylists from "@/lib/getPopularPlaylists";

const SetImportPlaylistPage = async () => {
  const popularPlaylists = await getPopularPlaylists();

  return (
    <>
      <BackButton href="/sets/create">Back to set creator</BackButton>
      <div>
        <Heading>Import public playlist from Apple Music</Heading>
        <Paragraph>Start typing and results will show up.</Paragraph>
      </div>
      <SetImportPlaylist defaultPlaylists={popularPlaylists} />
    </>
  );
};

export default SetImportPlaylistPage;
