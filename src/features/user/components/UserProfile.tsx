/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  BackButton,
  Button,
  CardFooter,
  CircleProgress,
  ErrorBlock,
  Label,
  Paragraph,
  ProfilePicture,
  SubHeading,
  WarningBlock,
} from "@/components/ui";
import { AnimatedCounter } from "@/components/ui/ContentComponents/AnimatedCounter";
import { routes } from "@/constants";
import useFeedback from "@/hooks/useFeedback";
import { DatabaseClient } from "@/lib/database/databaseClient";
import { Set, User } from "@/types/databaseTypes";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RxExit } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface Props {
  user: User;
  currentUser?: boolean;
}

const UserProfile = ({ user, currentUser }: Props) => {
  const { loading, setLoading, error, setError } = useFeedback();
  const { replace } = useRouter();

  const [setsCount, setSetsCount] = useState(0);

  const supabase = createClientComponentClient<Database>();
  const db = new DatabaseClient({ type: "clientComponent" });

  const level = 8;
  const exp = 45;

  useEffect(() => {
    const getSetsCount = async () => {
      const { count, data, error } = await db.users.getSets(user.id);
      if ((!count && !data) || error) setError("Fetching sets failed");
      setSetsCount(count || data?.length || 0);
    };

    getSetsCount();
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
      <div className="flex justify-between">
        <BackButton href={routes.sets.browser()}>Back to sets</BackButton>
      </div>
      {error && <ErrorBlock>{error}</ErrorBlock>}
      <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-800/30 p-4">
        <ProfilePicture avatarUrl={user.avatar_url || undefined} />
        <div className="flex h-full flex-col justify-between gap-1.5">
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
        <Button
          className="h-36 w-full flex-col items-end justify-end"
          variant="secondary"
          size="large"
          href={routes.user.sets(user.id)}
        >
          <SubHeading className="text-5xl">
            <AnimatedCounter value={setsCount}></AnimatedCounter>
          </SubHeading>
          <Paragraph>Created sets</Paragraph>
        </Button>
      </div>
      {currentUser && (
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
      )}
    </>
  );
};

export default UserProfile;
