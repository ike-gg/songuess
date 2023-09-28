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
import { routes } from "@/constants";
import SetCardItem from "@/features/xsets/SetCardItem";
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
  const [userSets, setUserSets] = useState<Set[]>([]);

  const supabase = createClientComponentClient<Database>();
  const db = new DatabaseClient({ type: "clientComponent" });

  useEffect(() => {
    const fetchUserSets = async () => {
      const { data, error } = await db.users.getSets(user.id);
      if (error) {
        setError(error.message);
        return;
      }
      setUserSets(data);
    };

    fetchUserSets();
  }, [user]);

  const level = 8;
  const exp = 45;

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
        {[
          {
            name: `Sets created (includes ${
              userSets.filter((s) => s.private).length
            } private sets)`,
            value: userSets.length,
          },
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
      <div className="-mx-6 grid grid-flow-col-dense grid-rows-1 gap-4 overflow-x-auto pl-6">
        {userSets
          .filter((s) => !s.private)
          .map((set) => {
            return (
              <SetCardItem
                className="col-span-1 row-span-1 flex w-44"
                set={set}
                key={set.id}
              />
            );
          })}
      </div>
      <WarningBlock>
        Current data on profile page is static. More content on profile page
        coming soon...
      </WarningBlock>
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
