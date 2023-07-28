/* eslint-disable @next/next/no-img-element */
import {
  Badge,
  CardItem,
  Heading,
  Paragraph,
  BackButton,
} from "@/components/ui";
import { sets } from "@/constants/routes";
import getUserPlaylistsSpotify from "@/lib/spotify/getUserPlaylistsSpotify";
import removeTags from "@/utils/removeTags";

const SetSpotifyPage = async () => {
  const userPlaylists = await getUserPlaylistsSpotify();

  return (
    <>
      <BackButton href="/sets/create">Back to set creator</BackButton>
      <div>
        <Heading className="flex items-center gap-2">
          Import your playlist from Spotify <Badge>BETA</Badge>
        </Heading>
        <Paragraph>
          Keep in mind that the feature is in beta. Currently limited to only
          take up to 50 first tracks from the playlist.
        </Paragraph>
      </div>
      <div className="flex flex-col gap-3">
        {userPlaylists.items.map((playlist) => {
          const { description: _desc, id, images, name, tracks } = playlist;
          const description = removeTags(_desc);

          return (
            <CardItem key={id} href={sets.create.spotifyPlaylist(id)}>
              <div className="flex items-center gap-3 rounded transition-all duration-150">
                <img
                  src={images[0].url}
                  className="h-12 w-12 rounded-md bg-zinc-700"
                  alt={`cover of xd playlist`}
                />
                <div className="flex shrink flex-col gap-1 leading-none">
                  <span className="font-semibold line-clamp-2">{name}</span>
                  {
                    <span className="font-lights pb-0.5 opacity-60 line-clamp-1">
                      {description}
                    </span>
                  }
                </div>
              </div>
            </CardItem>
          );
        })}
      </div>
    </>
  );
};

export default SetSpotifyPage;
