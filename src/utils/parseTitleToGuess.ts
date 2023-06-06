const parseTitleToGuess = (title: string) => {
  const symbolsToKeep = ["&"];

  const expression = new RegExp(`[^a-zA-Z0-9 ${symbolsToKeep.join("")}]`, "g");

  return title.replace(expression, "");
};

export default parseTitleToGuess;
