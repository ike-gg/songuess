const getRandomElements = (arr: any[], count: number) => {
  if (!Array.isArray(arr)) return [];
  return arr.sort(() => Math.random() - Math.random()).slice(0, count);
};

export default getRandomElements;
