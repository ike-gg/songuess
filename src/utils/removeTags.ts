const removeTags = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
};

export default removeTags;
