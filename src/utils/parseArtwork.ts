import { Artwork } from "@/types/musicApi/Common";

const parseArtwork = (artwork: Artwork) => {
  const { url, bgColor, textColor1, textColor4, textColor2, textColor3 } =
    artwork;
  const sizes = ["50", "150", "250", "450", "80"];
  const urlSizes = sizes.map((size) =>
    url.replace("{w}", size).replace("{h}", size)
  );

  return {
    artworkUrl: {
      mini: urlSizes[0],
      small: urlSizes[1],
      medium: urlSizes[2],
      large: urlSizes[3],
      tile: urlSizes[4],
    },
    bgColor: `#${bgColor}`,
    primColor: `#${textColor1}`,
    textColor2: `#${textColor2}`,
    textColor3: `#${textColor3}`,
    textColor4: `#${textColor4}`,
  };
};

export default parseArtwork;
