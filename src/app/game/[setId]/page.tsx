/* eslint-disable @next/next/no-img-element */
import { routes } from "@/constants";
import Game from "@/features/game/Game";
import GameProvider from "@/features/game/GameProvider";
import { SongType } from "@/types/musicApi/Song";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const SetPage = async ({
  params: { setId },
}: {
  params: { setId: string };
}) => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  if (!setId) {
    redirect(routes.sets.browser());
  }

  const { data: setDetails } = await supabase
    .from("sets")
    .select("*")
    .eq("id", setId)
    .limit(1)
    .single();

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
