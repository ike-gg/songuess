import {
  BackButton,
  Badge,
  Button,
  Divider,
  Heading,
  Paragraph,
  SubHeading,
} from "@/components/ui";
import { routes } from "@/constants";
import CreateLobbyForm from "@/features/multiplayer/components/lobby/CreateLobbyForm";
import { DatabaseClient } from "@/lib/database/databaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CgFlag } from "react-icons/cg";

const MultiplayerIndexPage = async ({
  params: { lobbyId },
}: {
  params: { lobbyId: string };
}) => {
  if (!lobbyId) redirect(routes.multiplayer.index);

  const database = new DatabaseClient({ type: "serverComponent", cookies });
  const { error } = await database.currentUser.auth();

  if (error)
    return (
      <>
        <Paragraph>login to continue</Paragraph>
        <Button href={routes.auth.signin}></Button>
      </>
    );

  return <>witam :D</>;
};

export default MultiplayerIndexPage;
