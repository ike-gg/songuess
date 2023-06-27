function chunkArrayBySize<T>(arr: T[], size: number): T[][] {
  const chunkedArray: T[][] = [];
  let index = 0;

  while (index < arr.length) {
    chunkedArray.push(arr.slice(index, index + size));
    index += size;
  }

  return chunkedArray;
}

export default chunkArrayBySize;
