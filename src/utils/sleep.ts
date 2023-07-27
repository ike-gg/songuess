const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default sleep;
