import SetCreator, {
  ProvidedValuesSetCreator,
} from "@/features/sets/components/creator/SetCreator";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SongType } from "@/types/musicApi/Song";
import { BackButton, Heading } from "@/components/ui";
import { routes } from "@/constants";

interface SearchParams {
  playlistid?: string;
  setid?: string;
  spotifyplaylistid?: string;
}

const UpdateSetPage = async ({
  searchParams: { setid },
}: {
  searchParams: SearchParams;
}) => {
  const supabase = await createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(routes.auth.signin);
  }

  let providedData: ProvidedValuesSetCreator | undefined;

  if (setid) {
    const { data: existingSet } = await supabase
      .from("sets")
      .select("*")
      .eq("id", setid)
      .single();

    if (!existingSet) return;

    if (existingSet.owner !== user.id) {
      redirect(routes.sets.browser);
    }

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
  }

  if (!providedData) {
    redirect(routes.sets.browser);
  }

  return (
    <>
      <nav className="flex items-start justify-between">
        <BackButton href="/sets">Back to sets</BackButton>
      </nav>
      <Heading>
        Update <b>{providedData.name}</b> set
      </Heading>
      <SetCreator existingId={setid} values={providedData} />
    </>
  );
};

export default UpdateSetPage;
