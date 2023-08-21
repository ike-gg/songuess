import SetPreview from "@/features/sets/components/SetPreview";
import getAlbumsArtistsFromSet from "@/lib/getAlbumsArtistsFromSet";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SetPage = async ({
  params: { setId },
}: {
  params: { setId: string };
}) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: setDetails } = await supabase
    .from("sets")
    .select("*")
    .eq("id", setId)
    .single();

  if (!setDetails) redirect("/sets");

  const {
    data: { user: requestingUser },
  } = await supabase.auth.getUser();

  const setContent = await getAlbumsArtistsFromSet(setDetails.songs);

  const isOwner = requestingUser?.id === setDetails.owner;

  return (
    <SetPreview set={setDetails} setContent={setContent} owner={isOwner} />
  );
};

export default SetPage;
