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
import { routes } from "@/constants";
import getAlbumDetails from "@/lib/getAlbumDetails";

interface SearchParams {
  playlistid?: string;
  setid?: string;
  spotifyplaylistid?: string;
  album?: string;
}

const CreateSetPage = async ({
  searchParams: { playlistid, setid, spotifyplaylistid, album },
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
  let isrcs: {
    album: string;
    isrc: string;
  }[] = [];

  if (playlistid) {
    try {
      const playlistDetails =
        album === "true"
          ? await getAlbumDetails(playlistid)
          : await getPlaylistDetails(playlistid);

      const { attributes, relationships } = playlistDetails;
      const { name, artwork } = attributes;

      const {
        artworkUrl: { large },
      } = parseArtwork(artwork);

      const description =
        "artistName" in attributes
          ? removeTags(attributes.editorialNotes?.standard || "")
          : removeTags(attributes.description?.standard || "");

      providedData = {
        name,
        playlist: relationships.tracks?.data || [],
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

    console.log(tracks.items.map((i) => i.track.album.name));

    const tracksISRC = tracks.items
      .filter((t) => t.track.external_ids.isrc)
      .map((t) => {
        const { album, external_ids } = t.track;
        return {
          album: album.name,
          isrc: external_ids.isrc!,
        };
      });

    isrcs = tracksISRC;

    providedData = {
      name,
      playlist: [],
      cover: images[0].url,
      description,
    };
  }

  return (
    <>
      <nav className="flex items-start justify-between">
        <BackButton href="/sets">Back to sets</BackButton>
        <div className="flex flex-row gap-2">
          <Button variant="apple" size="small" href={routes.sets.amimport}>
            Templates
          </Button>
          <Button variant="spotify" size="small" href={spotifyAuthUrl}>
            Your Spotify
          </Button>
        </div>
      </nav>
      <Heading>Create set</Heading>
      <SetCreator isrcs={isrcs} values={providedData} />
    </>
  );
};

export default CreateSetPage;
