import { routes } from "@/constants";
import SetPreview from "@/features/sets/components/SetPreview";
import { DatabaseClient } from "@/lib/database/databaseClient";
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
  const database = new DatabaseClient({ type: "serverComponent", cookies });

  const { data: setDetails } = await database.sets.get(setId);

  if (!setDetails) redirect(routes.sets.browser());

  const {
    data: { user: requestingUser },
  } = await database.currentUser.auth();

  const setContent = await getAlbumsArtistsFromSet(setDetails.songs);

  const isOwner = requestingUser?.id === setDetails.owner;

  return (
    <SetPreview set={setDetails} setContent={setContent} owner={isOwner} />
  );
};

export default SetPage;
