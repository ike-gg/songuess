"use client";

import {
  BackButton,
  Button,
  CardFooter,
  CircleProgress,
  ErrorBlock,
  Heading,
  Label,
  Paragraph,
  ProfilePicture,
  SubHeading,
  WarningBlock,
} from "@/components/ui";
import { routes } from "@/constants";
import useFeedback from "@/hooks/useFeedback";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RxExit } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface Props {
  user: Database["public"]["Tables"]["users"]["Row"];
}

const UserProfile = ({ user }: Props) => {
  const { loading, setLoading, error, setError } = useFeedback();
  const { replace } = useRouter();
  const [level, setLevel] = useState<number>(0);
  const [exp, setExp] = useState<number>(0);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    setLevel(Math.floor(Math.random() * 10));
    setExp(Math.floor(Math.random() * 100));
  }, []);

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
      <BackButton href={routes.sets.browser()}>Back to sets</BackButton>
      {error && <ErrorBlock>{error}</ErrorBlock>}
      <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-800/30 p-4">
        <ProfilePicture avatarUrl={user.avatar_url || undefined} />
        <div className="flex h-full flex-col justify-between">
          <Label className="leading-none">user profile</Label>
          <SubHeading className="leading-none">{user.username}</SubHeading>
          <Paragraph className="text-xs leading-none">
            @{user.username.toLowerCase().replaceAll(" ", "")}
          </Paragraph>
        </div>
        {level && exp && (
          <div
            className={twMerge(
              "ml-auto flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full",
              level <= 3 && "bg-emerald-900/25 text-emerald-400",
              level >= 4 && level <= 7 && "bg-blue-900/25 text-blue-400",
              level >= 8 && level <= 10 && "bg-purple-900/25 text-purple-400"
            )}
          >
            <CircleProgress
              percents={exp}
              size={74}
              strokeWidth={4}
              currentColor
              className="absolute"
              emptyStrokeOpacity={0}
            />
            <Label className="leading-none">level</Label>
            <span className="text-xl font-semibold leading-none">{level}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          { name: "Sets created", value: 4 },
          { name: "Sets played", value: 54 },
          { name: "Received feedback", value: 5.4 },
        ].map((data) => (
          <div
            key={data.name + data.value}
            className="rounded-lg bg-zinc-800/50 p-6 pt-12 text-right hover:bg-zinc-800"
          >
            <SubHeading className="text-5xl">{data.value}</SubHeading>
            <Paragraph>{data.name}</Paragraph>
          </div>
        ))}
      </div>
      <WarningBlock>
        Current data on profile page is static. More content on profile page
        coming soon...
      </WarningBlock>
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
