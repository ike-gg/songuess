/* eslint-disable @next/next/no-img-element */

import { SongAttributes } from "@/types/musicApi/Song";
import parseArtwork from "@/utils/parseArtwork";
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { HiPlay, HiPause } from "react-icons/hi2";
import removeParentheses from "@/utils/removeParentheses";
import addAlpha from "@/utils/addAlphaHex";

interface Props extends HTMLAttributes<HTMLDivElement> {
  songData: SongAttributes;
  colorful?: boolean;
  colorfulPlay?: boolean;
  showArtist?: boolean;
  showAlbum?: boolean;
  showPreview?: boolean;
  showArtwork?: boolean;
  shortName?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

const SongItem = ({
  songData,
  onClick,
  colorful = false,
  showAlbum = false,
  showArtist = false,
  showArtwork = false,
  showPreview = false,
  shortName = false,
  colorfulPlay = false,
  className,
  children,
  ...props
}: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.3;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, audioRef]);

  const { albumName, artistName, artwork, previews, name } = songData;
  const previewUrl = previews[0] ? previews[0].url : "";
  const {
    artworkUrl: { mini },
    bgColor,
    primColor,
  } = parseArtwork(artwork);

  const colored = colorful || (colorfulPlay && isPlaying);

  return (
    <div
      style={{
        backgroundColor: colored ? bgColor : undefined,
        color: colored ? primColor : undefined,
        borderColor: colored ? addAlpha(primColor, 0.25) : undefined,
      }}
      className={twMerge(
        "flex items-center gap-3 rounded p-3 transition-all duration-150",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children && children}
      {showPreview && <audio loop ref={audioRef} src={previewUrl} />}
      {showArtwork && (
        <img src={mini} className="rounded-sm" alt={`cover of ${albumName}`} />
      )}
      <div className="flex shrink flex-col gap-1 leading-none">
        <span className="line-clamp-2 font-semibold">
          {shortName ? removeParentheses(name) : name}
        </span>
        {(showArtist || showAlbum) && (
          <span className="font-lights line-clamp-1 opacity-60">
            {showArtist && !showAlbum && artistName}
            {showAlbum && !showArtist && albumName}
            {showAlbum && showArtist && `${artistName} from ${albumName}`}
          </span>
        )}
      </div>
      {showPreview && (
        <div
          className="ml-auto cursor-pointer text-xl"
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying((p) => !p);
          }}
        >
          {isPlaying && <HiPause />}
          {!isPlaying && <HiPlay />}
        </div>
      )}
    </div>
  );
};

export default SongItem;
