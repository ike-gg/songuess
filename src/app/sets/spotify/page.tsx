/* eslint-disable @next/next/no-img-element */
import BackButton from "@/components/ui/BackButton";
import CardItem from "@/components/ui/Card/CardItem";
import { sets } from "@/constants/routes";
import getUserPlaylistsSpotify from "@/lib/spotify/getUserPlaylistsSpotify";

const SetSpotifyPage = async () => {
  const userPlaylists = await getUserPlaylistsSpotify();

  return (
    <>
      <BackButton href="/sets/create">Back to set creator</BackButton>
      {userPlaylists.items.map((playlist) => {
        return (
          <CardItem
            key={playlist.id}
            href={sets.create.spotifyPlaylist(playlist.id)}
          >
            <div className="flex items-center gap-3 rounded transition-all duration-150">
              <img
                src={playlist.images[0].url}
                className="h-12 w-12 rounded-md bg-zinc-700"
                alt={`cover of xd playlist`}
              />
              <div className="flex shrink flex-col gap-1 leading-none">
                <span className="font-semibold line-clamp-2">
                  {playlist.name}
                </span>
                {
                  <span className="font-lights pb-0.5 opacity-60 line-clamp-1">
                    {playlist.description}
                  </span>
                }
              </div>
            </div>
          </CardItem>
        );
      })}
    </>
  );
};

export default SetSpotifyPage;
