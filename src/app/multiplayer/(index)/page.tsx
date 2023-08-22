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

const MultiplayerLobbyPage = async () => {
  const database = new DatabaseClient({ type: "serverComponent", cookies });

  const { error } = await database.currentUser.auth();

  if (error) redirect(routes.auth.signin);

  return (
    <>
      <BackButton href={routes.home}>Back home</BackButton>
      <div className="flex items-center gap-2">
        <Heading>Multiplayer</Heading>
        <Badge>BETA</Badge>
      </div>
      <Paragraph>
        We&apos;re excited to introduce a brand new feature to our game:
        Multiplayer Mode- allows players to team up and test their song-guessing
        skills together.
      </Paragraph>
      <Paragraph>
        In Multiplayer Mode, you and your friends can connect, compete, and
        collaborate as you delve into the world of music trivia. Challenge each
        other to see who can identify songs from various genres and eras, and
        experience the thrill of real-time gameplay. Your feedback during this
        phase will be invaluable as we fine-tune and optimize the multiplayer
        experience.
      </Paragraph>
      <Paragraph>
        Since this is a beta release, it&apos;s important to keep in mind that
        you might encounter occasional hiccups or unexpected behavior. To report
        any problems or provide feedback, click on the following link:{" "}
      </Paragraph>
      <Button
        href={routes.github.issues}
        variant="white"
        size="small"
        icon={<CgFlag />}
      >
        Report issue
      </Button>
      <Divider />
      <SubHeading>Create lobby</SubHeading>
      <CreateLobbyForm />
    </>
  );
};

export default MultiplayerLobbyPage;
