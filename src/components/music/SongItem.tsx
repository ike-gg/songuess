/* eslint-disable @next/next/no-img-element */

import { SongAttributes } from "@/types/musicApi/Song";
import parseArtwork from "@/utils/parseArtwork";
import { ReactNode, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { RxPlay, RxPause } from "react-icons/rx";
import removeParentheses from "@/utils/removeParentheses";

interface Props {
  songData: SongAttributes;
  colorful?: boolean;
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
  className,
  children,
}: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.4;
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
  return (
    <div
      style={{
        backgroundColor: colorful ? bgColor : undefined,
        color: colorful ? primColor : undefined,
      }}
      className={twMerge(
        "flex items-center gap-3 rounded p-3 transition-all duration-150",
        className
      )}
      onClick={onClick}
    >
      {children && <div>{children}</div>}
      {showPreview && <audio loop ref={audioRef} src={previewUrl} />}
      {showArtwork && (
        <img src={mini} className="rounded-sm" alt={`cover of ${albumName}`} />
      )}
      <div className="flex shrink flex-col gap-1 leading-none">
        <span className="font-semibold line-clamp-2">
          {shortName ? removeParentheses(name) : name}
        </span>
        {(showArtist || showAlbum) && (
          <span className="font-lights opacity-60 line-clamp-1">
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
          {isPlaying && <RxPause />}
          {!isPlaying && <RxPlay />}
        </div>
      )}
    </div>
  );
};

export default SongItem;
