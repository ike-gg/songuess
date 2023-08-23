import {
  BackButton,
  Badge,
  Button,
  CardFooter,
  Dialog,
  Divider,
  Heading,
  Paragraph,
  SubHeading,
} from "@/components/ui";
import { routes } from "@/constants";
import Lobby from "@/features/multiplayer/components/lobby/Lobby";
import { DatabaseClient } from "@/lib/database/databaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
      <Dialog state>
        <Heading>Sign in to continue</Heading>
        <CardFooter>
          <Button href={routes.auth.signin}>Sign in</Button>
        </CardFooter>
      </Dialog>
    );

  return <Lobby id={lobbyId} />;
};

export default MultiplayerIndexPage;
