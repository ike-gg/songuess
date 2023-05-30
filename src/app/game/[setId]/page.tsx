/* eslint-disable @next/next/no-img-element */
import Game from "@/components/content/game/Game";
import Providers from "@/components/content/game/GameProvider";
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

  const { data: setDetails } = await supabase
    .from("sets")
    .select("*")
    .eq("id", setId)
    .limit(1)
    .single();

  if (!setDetails) {
    redirect("/sets");
  }

  const response = await fetch(
    `https://harmony-backend.vercel.app/api/getSongs?ids=${setDetails.songs.join(
      ","
    )}`
  );

  const songsData = (await response.json()) as SongType;

  return (
    <Providers>
      <Game setDetails={setDetails} songs={songsData.data} />
    </Providers>
  );
};

export default SetPage;
