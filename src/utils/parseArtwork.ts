import { Artwork } from "@/types/musicApi/Common";

const parseArtwork = (artwork: Artwork) => {
  const { url, bgColor, textColor1, textColor4 } = artwork;
  const sizes = ["150", "250", "450"];
  const urlSizes = sizes.map((size) =>
    url.replace("{w}", size).replace("{h}", size)
  );

  return {
    artworkUrl: {
      small: urlSizes[0],
      medium: urlSizes[1],
      large: urlSizes[2],
    },
    bgColor: `#${textColor1}`,
    primColor: `#${bgColor}`,
  };
};

export default parseArtwork;
