/* eslint-disable @next/next/no-img-element */
import { SetCategories, routes } from "@/constants";
import SetSelector, { SetSelectorProps } from "@/features/xsets/SetSelector";
import getUserDataServer from "@/lib/getUserDataServer";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SetsPage = async ({
  searchParams,
}: {
  searchParams: { category: SetCategories; query?: string };
}) => {
  const { category, query } = searchParams;

  await new Promise((resolve) => setTimeout(resolve, 5000));

  if (
    category !== "community" &&
    category !== "featured" &&
    category !== "personal"
  ) {
    redirect(routes.sets.browser("featured", query));
  }

  const user = await getUserDataServer();
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: sets } = await supabase
    .from("sets")
    .select("*")
    .eq("private", false);

  const featuredSets = sets?.filter((set) => set.featured);
  const communitySets = sets?.filter((set) => !set.featured);

  const { data: personalSets } = await supabase
    .from("sets")
    .select("*")
    .eq("owner", user?.id);

  const preparedSets: SetSelectorProps["sets"] = {
    featured: featuredSets ?? [],
    community: communitySets ?? [],
    personal: user ? personalSets : null,
  };

  return <SetSelector sets={preparedSets} />;
};

export default SetsPage;
