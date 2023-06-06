const removeParentheses = (string: string) => {
  return string
    .replaceAll(/ *\([^)]*\) */g, "")
    .replaceAll(/ *\[[^)]*\] */g, "");
};

export default removeParentheses;
