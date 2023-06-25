const chunkArray = <T>(array: T[], numChunks: number): T[][] => {
  const arrayLength = array.length;
  const chunkSize = Math.ceil(arrayLength / numChunks);
  const chunkedArray: T[][] = [];

  for (let i = 0; i < arrayLength; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunkedArray.push(chunk);
  }

  return chunkedArray;
};

export default chunkArray;
