import BackButton from "@/components/ui/BackButton";
import Heading from "@/components/ui/content/Heading";
import Paragraph from "@/components/ui/content/Paragraph";
import SetImportPlaylist from "@/features/sets/components/importplaylist/SetImportPlaylist";
import getPopularPlaylists from "@/lib/getPopularPlaylists";

const SetImportPlaylistPage = async () => {
  const popularPlaylists = await getPopularPlaylists();

  return (
    <>
      <BackButton href="/sets/create">Back to set creator</BackButton>
      <div>
        <Heading>Import prepared playlist from Apple Music</Heading>
        <Paragraph>Start typing and results will show up.</Paragraph>
      </div>
      <SetImportPlaylist defaultPlaylists={popularPlaylists} />
    </>
  );
};

export default SetImportPlaylistPage;
