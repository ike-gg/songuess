"use client";

import PlaylistItem from "@/components/music/PlaylistItem";
import { CardItem, Input } from "@/components/ui";
import { routes } from "@/constants";
import useDebounceQuery from "@/hooks/useDebounceQuery";
import usePlaylistQuery from "@/hooks/usePlaylistQuery";
import {
  SearchQueryPlaylist,
  SearchQueryAlbums,
} from "@/types/musicApi/SearchQuery";
import { useState } from "react";
import { RxArrowRight, RxMagnifyingGlass } from "react-icons/rx";

interface Props {
  defaultPlaylists?: SearchQueryPlaylist[];
}

const SetImportPlaylist = ({ defaultPlaylists }: Props) => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounceQuery({ value: query });

  const { error, isLoading, playlists } = usePlaylistQuery(debouncedQuery, {
    defaultData: defaultPlaylists,
  });

  return (
    <div>
      <Input
        label="Playlist query"
        value={query}
        placeholder="Popular playlists"
        onInput={(e) => setQuery(e.currentTarget.value)}
        loading={isLoading}
        icon={<RxMagnifyingGlass />}
        error={error || undefined}
      />
      <div className="group/plitem mt-4 flex flex-col gap-3">
        {playlists.map((playlist) => {
          const { attributes, id } = playlist;
          const isAlbum = "artistName" in attributes ? true : false;
          return (
            <CardItem
              href={routes.sets.create.amPlaylist(id, isAlbum)}
              key={id}
            >
              <PlaylistItem showArtwork playlistData={attributes}>
                <RxArrowRight />
              </PlaylistItem>
            </CardItem>
          );
        })}
      </div>
    </div>
  );
};

export default SetImportPlaylist;
