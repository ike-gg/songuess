"use client";

const SetErrorPage = (a: any) => {
  console.log(a);
  return <div onClick={() => a.reset()}>{a.error.message}</div>;
};

export default SetErrorPage;
