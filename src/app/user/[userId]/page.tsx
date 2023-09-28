import { routes } from "@/constants";
import UserProfile from "@/features/user/components/UserProfile";
import { DatabaseClient } from "@/lib/database/databaseClient";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UserByIdPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  if (!userId) redirect(routes.user.profile);

  const db = new DatabaseClient({ type: "serverComponent", cookies });
  const { data: profile, error } = await db.users.getProfile(userId);
  const currentUser = await db.currentUser.auth();

  if (error) redirect(routes.user.profile);

  return (
    <UserProfile
      user={profile}
      currentUser={currentUser.data.user?.id === profile.id}
    />
  );
};

export default UserByIdPage;
