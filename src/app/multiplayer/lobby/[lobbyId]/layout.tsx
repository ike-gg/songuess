import { ReactNode } from "react";

const MultiplayerLobbyLayout = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto max-w-screen-xl px-4 pb-10">{children}</div>;
};

export default MultiplayerLobbyLayout;
