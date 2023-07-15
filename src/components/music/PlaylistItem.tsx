/* eslint-disable @next/next/no-img-element */

import parseArtwork from "@/utils/parseArtwork";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { PlaylistAttributes } from "@/types/musicApi/Playlist";

interface Props {
  playlistData: PlaylistAttributes;
  colorful?: boolean;
  showArtwork?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

const PlaylistItem = ({
  playlistData,
  onClick,
  colorful = false,
  showArtwork = false,
  className,
  children,
}: Props) => {
  const { artwork, name, description } = playlistData;

  const {
    artworkUrl: { mini },
    bgColor,
    primColor,
  } = parseArtwork(artwork);
  return (
    <div
      style={{
        backgroundColor: colorful ? bgColor : undefined,
        color: colorful ? primColor : undefined,
      }}
      className={twMerge(
        "flex items-center gap-3 rounded transition-all duration-150",
        className
      )}
      onClick={onClick}
    >
      {children && <div>{children}</div>}
      {showArtwork && (
        <img
          src={mini}
          className="h-12 w-12 rounded-md bg-zinc-700"
          alt={`cover of ${name} playlist`}
        />
      )}
      <div className="flex shrink flex-col gap-1 leading-none">
        <span className="font-semibold line-clamp-2">{name}</span>
        {
          <span className="font-lights pb-0.5 opacity-60 line-clamp-1">
            {description?.short}
          </span>
        }
      </div>
    </div>
  );
};

export default PlaylistItem;
