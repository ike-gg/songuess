/* eslint-disable @next/next/no-img-element */
import { routes } from "@/constants";
import Game from "@/features/game/Game";
import GameProvider from "@/features/game/GameProvider";
import { DatabaseClient } from "@/lib/database/databaseClient";
import { SongType } from "@/types/musicApi/Song";
import { redirect } from "next/navigation";

const SetPage = async ({
  params: { setId },
}: {
  params: { setId: string };
}) => {
  const database = new DatabaseClient({ type: "server" });

  if (!setId) {
    redirect(routes.sets.browser());
  }

  const { data: setDetails } = await database.sets.get(setId);

  if (!setDetails) {
    redirect(routes.sets.browser());
  }

  const response = await fetch(
    `https://harmony-backend.vercel.app/api/getSongs?ids=${setDetails.songs.join(
      ","
    )}`
  );

  const songsData = (await response.json()) as SongType;

  return (
    <GameProvider>
      <Game setDetails={setDetails} songs={songsData.data} />
    </GameProvider>
  );
};

export default SetPage;
