"use client";

import {
  BackButton,
  Button,
  CardFooter,
  ErrorBlock,
  Heading,
  Label,
  Paragraph,
  ProfilePicture,
} from "@/components/ui";
import { routes } from "@/constants";
import useFeedback from "@/hooks/useFeedback";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { RxExit } from "react-icons/rx";

interface Props {
  user: Database["public"]["Tables"]["users"]["Row"];
}

const UserProfile = ({ user }: Props) => {
  const { loading, setLoading, error, setError } = useFeedback();
  const { replace } = useRouter();

  const supabase = createClientComponentClient<Database>();

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
      return;
    }
    replace(routes.home);
  };

  return (
    <>
      <BackButton href={routes.sets.browser}>Back to sets</BackButton>
      {error && <ErrorBlock>{error}</ErrorBlock>}
      <div className="flex gap-4 rounded-lg border border-zinc-700 bg-gradient-to-br from-zinc-800 via-zinc-800/50 to-zinc-800 p-4">
        <ProfilePicture avatarUrl={user.avatar_url || undefined} />
        <div className="flex flex-col justify-around">
          <Label className="leading-none">user profile</Label>
          <Heading className="leading-none">{user.username}</Heading>
          <Paragraph className="leading-none">
            @{user.username.toLowerCase().replaceAll(" ", "")}
          </Paragraph>
        </div>
      </div>
      <CardFooter>
        <Button
          loading={loading}
          onClick={signOut}
          variant="danger"
          size="small"
          icon={<RxExit />}
        >
          Sign out
        </Button>
      </CardFooter>
    </>
  );
};

export default UserProfile;
