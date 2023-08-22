import SetCreator, {
  ProvidedValuesSetCreator,
} from "@/features/sets/components/creator/SetCreator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getPlaylistDetails from "@/lib/getPlaylistDetails";
import parseArtwork from "@/utils/parseArtwork";
import { SongType } from "@/types/musicApi/Song";
import getUrlAuthSpotify from "@/lib/spotify/getUrlAuthSpotify";
import getPlaylistSpotify from "@/lib/spotify/getPlaylistSpotify";
import removeTags from "@/utils/removeTags";
import { BackButton, Button, Heading } from "@/components/ui";
import { routes } from "@/constants";
import getAlbumDetails from "@/lib/getAlbumDetails";
import { DatabaseClient } from "@/lib/database/databaseClient";

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
  const database = new DatabaseClient({ type: "serverComponent", cookies });

  const {
    data: { user },
  } = await database.currentUser.auth();

  if (!user) {
    redirect(routes.auth.signin);
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
        bgColor,
        primColor,
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
        private: false,
        bgColor,
        textColor: primColor,
      };
    } catch (error) {
      console.log(error);
    }
  }

  if (setid) {
    const { data: existingSet } = await database.sets.get(setid);

    if (!existingSet) return;

    const { name, cover, description, songs, private: isPrivate } = existingSet;

    console.log(isPrivate);

    const response = await fetch(
      `https://harmony-backend.vercel.app/api/getSongs?ids=${songs.join(",")}`
    );

    const songsData = (await response.json()) as SongType;

    providedData = {
      name,
      playlist: songsData.data,
      cover: cover || "",
      description: description || "",
      private: isPrivate,
    };
  }

  if (spotifyplaylistid) {
    const playlist = await getPlaylistSpotify(spotifyplaylistid);
    const { description: _desc, images, name, tracks } = playlist;
    const description = removeTags(_desc);

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
      private: false,
    };
  }

  return (
    <>
      <nav className="flex items-start justify-between">
        <BackButton href={routes.sets.browser()}>Back to sets</BackButton>
        <div className="flex flex-row gap-2">
          <Button variant="apple" size="small" href={routes.sets.amimport}>
            Templates
          </Button>
        </div>
      </nav>
      <Heading>Create set</Heading>
      <SetCreator
        isrcs={isrcs}
        values={providedData}
        spotifyAuthUrl={spotifyAuthUrl}
      />
    </>
  );
};

export default CreateSetPage;
