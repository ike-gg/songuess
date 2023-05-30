/* eslint-disable @next/next/no-img-element */
import SetPreview from "@/components/content/sets/SetPreview";
import getAlbumsArtistsFromSet from "@/lib/getAlbumsArtistsFromSet";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

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

  const setContent = setDetails?.songs
    ? await getAlbumsArtistsFromSet(setDetails.songs)
    : null;

  return <SetPreview set={setDetails} setContent={setContent} />;
};

export default SetPage;
