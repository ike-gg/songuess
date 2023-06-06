const trimTextByWords = (text: string, words: number) => {
  const arrayedString = text.split(" ");
  const trimmedArrayString = arrayedString.slice(0, words);
  return trimmedArrayString.join(" ");
};

export default trimTextByWords;
