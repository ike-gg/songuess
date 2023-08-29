import { routes } from "@/constants";
import { DatabaseClient } from "@/lib/database/databaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UserPage = async () => {
  const database = new DatabaseClient({ type: "serverComponent", cookies });

  const currentUser = await database.currentUser.profile();

  if (currentUser.error) redirect(routes.auth.signin);

  redirect(routes.user.id(currentUser.data.id));
};

export default UserPage;
