import { Artwork } from "@/types/musicApi/Common";

const parseArtwork = (artwork: Artwork) => {
  const { url, bgColor, textColor1, textColor4 } = artwork;
  const sizes = ["50", "150", "250", "450"];
  const urlSizes = sizes.map((size) =>
    url.replace("{w}", size).replace("{h}", size)
  );

  return {
    artworkUrl: {
      mini: urlSizes[0],
      small: urlSizes[1],
      medium: urlSizes[2],
      large: urlSizes[3],
    },
    bgColor: `#${textColor1}`,
    primColor: `#${bgColor}`,
  };
};

export default parseArtwork;
