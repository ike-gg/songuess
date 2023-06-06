// "hello im tom" to ["hello ","im ","tom"]
const splitWordsWithSpaces = (text: string) => {
  const arrayed = text.split(" ");
  return arrayed.map((word, index) => {
    if (index === arrayed.length - 1) return word;
    return `${word} `;
  });
};

export default splitWordsWithSpaces;
