/* eslint-disable @next/next/no-img-element */
import { SetCategories, routes } from "@/constants";
import SetSelector, { SetSelectorProps } from "@/features/xsets/SetSelector";
import { DatabaseClient } from "@/lib/database/databaseClient";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SetsPage = async ({
  searchParams,
}: {
  searchParams: { category: SetCategories; query?: string };
}) => {
  const { category, query } = searchParams;

  if (
    category !== "community" &&
    category !== "featured" &&
    category !== "personal"
  ) {
    redirect(routes.sets.browser("featured", query));
  }

  const database = new DatabaseClient({ type: "serverComponent", cookies });

  const { data: sets } = await database.sets.getAll();

  const featuredSets = sets?.filter((set) => set.featured);
  const communitySets = sets?.filter((set) => !set.featured);

  const personalSets = await database.currentUser.sets();

  const preparedSets: SetSelectorProps["sets"] = {
    featured: featuredSets ?? [],
    community: communitySets ?? [],
    personal: !personalSets.error ? personalSets.data : null,
  };

  return <SetSelector sets={preparedSets} />;
};

export default SetsPage;
