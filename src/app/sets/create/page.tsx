import SetCreator, {
  ProvidedValuesSetCreator,
} from "@/features/sets/components/creator/SetCreator";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getPlaylistDetails from "@/lib/getPlaylistDetails";
import parseArtwork from "@/utils/parseArtwork";
import { SongType } from "@/types/musicApi/Song";
import getUrlAuthSpotify from "@/lib/spotify/getUrlAuthSpotify";
import getPlaylistSpotify from "@/lib/spotify/getPlaylistSpotify";
import getSongsByISRC from "@/lib/getSongsByISRC";
import removeTags from "@/utils/removeTags";
import { BackButton, Button, Heading } from "@/components/ui";

interface SearchParams {
  playlistid?: string;
  setid?: string;
  spotifyplaylistid?: string;
}

const CreateSetPage = async ({
  searchParams: { playlistid, setid, spotifyplaylistid },
}: {
  searchParams: SearchParams;
}) => {
  const spotifyAuthUrl = getUrlAuthSpotify();
  const supabase = await createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  let providedData: ProvidedValuesSetCreator | undefined;

  if (playlistid) {
    try {
      const playlistDetails = await getPlaylistDetails(playlistid);

      const { attributes, relationships } = playlistDetails.data[0];
      const { name, artwork, description: _desc } = attributes;
      const {
        artworkUrl: { large },
      } = parseArtwork(artwork);

      const description = _desc?.standard && removeTags(_desc.standard);

      providedData = {
        name,
        playlist: relationships.tracks.data,
        cover: large,
        description: description,
      };
    } catch (error) {
      console.log(error);
    }
  }

  if (setid) {
    const { data: existingSet } = await supabase
      .from("sets")
      .select("*")
      .eq("id", setid)
      .eq("private", false)
      .single();

    if (!existingSet) return;

    const { name, cover, description, songs } = existingSet;

    const response = await fetch(
      `https://harmony-backend.vercel.app/api/getSongs?ids=${songs.join(",")}`
    );

    const songsData = (await response.json()) as SongType;

    providedData = {
      name,
      playlist: songsData.data,
      cover: cover || "",
      description: description || "",
    };
  }

  if (spotifyplaylistid) {
    const playlist = await getPlaylistSpotify(spotifyplaylistid);
    const { description: _desc, images, name, tracks } = playlist;
    const description = removeTags(_desc);

    const tracksISRC = tracks.items
      .filter((t) => t.track.external_ids.isrc)
      .map((t) => t.track.external_ids.isrc) as string[];

    const songs = await getSongsByISRC(tracksISRC);

    providedData = {
      name,
      playlist: songs,
      cover: images[0].url,
      description,
    };
  }

  return (
    <>
      <nav className="flex items-start justify-between">
        <BackButton href="/sets">Back to sets</BackButton>
        <div className="flex flex-row gap-2">
          <Button variant="apple" size="small" href="/sets/importplaylist">
            Prepared playlists
          </Button>
          <Button variant="spotify" size="small" href={spotifyAuthUrl}>
            Your Spotify
          </Button>
        </div>
      </nav>
      <Heading>Create set</Heading>
      <SetCreator values={providedData} />
    </>
  );
};

export default CreateSetPage;
