import SetCreator, {
  ProvidedValuesSetCreator,
} from "@/features/sets/components/creator/SetCreator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SongType } from "@/types/musicApi/Song";
import { BackButton, Heading } from "@/components/ui";
import { routes } from "@/constants";
import { DatabaseClient } from "@/lib/database/databaseClient";

const UpdateSetPage = async ({
  searchParams: { setid },
}: {
  searchParams: { setid?: string };
}) => {
  if (!setid) redirect(routes.sets.browser());

  const database = new DatabaseClient({ type: "serverComponent", cookies });

  const {
    data: { user },
  } = await database.currentUser.auth();
  if (!user) redirect(routes.auth.signin);

  const { data: existingSet } = await database.sets.get(setid);
  if (!existingSet) return;

  if (existingSet.owner !== user.id) {
    redirect(routes.sets.browser());
  }

  let providedData: ProvidedValuesSetCreator | undefined;

  const {
    name,
    cover,
    description,
    songs,
    id,
    private: isPrivate,
  } = existingSet;

  const response = await fetch(
    `https://harmony-backend.vercel.app/api/getSongs?ids=${songs.join(",")}`
  );

  const songsData = (await response.json()) as SongType;

  providedData = {
    name,
    playlist: songsData.data,
    cover: cover || "",
    description: description || "",
    private: isPrivate,
  };

  if (!providedData) {
    redirect(routes.sets.browser());
  }

  return (
    <>
      <nav className="flex items-start justify-between">
        <BackButton href={routes.sets.browser()}>Back to sets</BackButton>
      </nav>
      <Heading>
        Update <b>{providedData.name}</b> set
      </Heading>
      <SetCreator existingId={setid} values={providedData} />
    </>
  );
};

export default UpdateSetPage;
