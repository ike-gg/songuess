/* eslint-disable @next/next/no-img-element */
import SetSelector, {
  SetSelectorProps,
} from "@/features/sets/components/SetSelector";
import getUserDataServer from "@/lib/getUserDataServer";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const SetsPage = async () => {
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
