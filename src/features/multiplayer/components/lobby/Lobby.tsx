import { Card, Heading } from "@/components/ui";

interface Props {
  id: string;
}

const Lobby = ({ id }: Props) => {
  return (
    <Card>
      <Heading>Lobby</Heading>
    </Card>
  );
};

export default Lobby;
