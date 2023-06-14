/* eslint-disable @next/next/no-img-element */
import SetSelector from "@/components/sets/SetSelector";
import useUserDataServer from "@/lib/getUserDataServer";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

const SetsPage = async () => {
  const user = await useUserDataServer();
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: featuredSets } = await supabase
    .from("sets")
    .select("*")
    .eq("featured", true);

  const { data: communitySets } = await supabase
    .from("sets")
    .select("*")
    .eq("featured", false);

  const { data: setsUserData } = await supabase
    .from("sets")
    .select("*")
    .eq("owner", user?.id);

  return (
    <SetSelector
      featuredSets={featuredSets}
      communitySets={communitySets}
      userSets={setsUserData}
    />
  );
};

export default SetsPage;
