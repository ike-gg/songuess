import { routes } from "@/constants";
import UserProfile from "@/features/user/components/UserProfile";
import { DatabaseClient } from "@/lib/database/databaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UserPage = async () => {
  const database = new DatabaseClient({ type: "serverComponent", cookies });

  const userProfile = await database.currentUser.profile();

  if (userProfile.error) redirect(routes.auth.signin);

  return <UserProfile user={userProfile.data} />;
};

export default UserPage;
