import { routes } from "@/constants";
import UserSets from "@/features/user/components/UserSets";
import { DatabaseClient } from "@/lib/database/databaseClient";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UserSetsPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  if (!userId) redirect(routes.user.profile);

  const db = new DatabaseClient({ type: "serverComponent", cookies });

  const { data: allUserSets, error: setsError } = await db.users.getSets(
    userId
  );

  const { data: userData, error: userError } = await db.currentUser.auth();
  const { data: profileData, error: profileError } = await db.users.getProfile(
    userId
  );

  if (setsError || userError || profileError) redirect(routes.user.profile);

  const currentUserId = userData.user.id;
  const isOwner = currentUserId == userId;
  const publicUserSets = allUserSets.filter((s) => !s.private);
  const privateCount = allUserSets.filter((s) => s.private).length;

  return (
    <UserSets
      isOwner={isOwner}
      userSets={isOwner ? allUserSets : publicUserSets}
      privateCount={privateCount}
      userProfile={profileData}
    />
  );
};

export default UserSetsPage;
