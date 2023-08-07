import parseDiacriticalChars from "./parseDiacriticalChars";
import removeParentheses from "./removeParentheses";

const parseTitleToGuess = (title: string) => {
  const _parsedTitle = removeParentheses(title);
  const parsedTitle = parseDiacriticalChars(_parsedTitle);

  const symbolsToKeep = ["&"];
  const expression = new RegExp(`[^a-zA-Z0-9 ${symbolsToKeep.join("")}]`, "g");

  const withoutSymbols = parsedTitle.replace(expression, "");

  const expressionForSpaces = /(\s{2,})/g;
  const withoutSpaces = withoutSymbols.replace(expressionForSpaces, " ");

  return withoutSpaces;
};

export default parseTitleToGuess;
