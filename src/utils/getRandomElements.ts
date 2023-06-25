const getRandomElements = (arr: any[], count: number) => {
  const arrayCopy = arr;
  if (!Array.isArray(arrayCopy)) return [];
  return [...arrayCopy]
    .sort(() => Math.random() - Math.random())
    .slice(0, count);
};

export default getRandomElements;
