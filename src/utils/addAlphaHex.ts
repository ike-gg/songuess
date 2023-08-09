const addAlpha = (color: string, opacity: number) => {
  if (opacity === 0) return color + "00";
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};

export default addAlpha;
