"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameProvider = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default GameProvider;
