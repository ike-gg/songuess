import { DatabaseClient } from "@/lib/database/databaseClient";
import { cookies } from "next/headers";

const PageTest = async () => {
  const database = new DatabaseClient({ type: "serverComponent", cookies });

  const auth = await database.currentUser.profile();

  return <pre>{JSON.stringify(auth)}</pre>;
};

export default PageTest;
