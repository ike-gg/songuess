/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { BackButton, Button, Heading, Paragraph } from "@/components/ui";
import { routes } from "@/constants";
import SetListItem from "@/features/sets/components/SetListItem";
import SetCardItem from "@/features/xsets/SetCardItem";
import { Set, User } from "@/types/databaseTypes";
import { useState } from "react";
import { RxCardStack, RxListBullet, RxPlus } from "react-icons/rx";

interface Props {
  userSets: Set[];
  userProfile: User;
  isOwner: boolean;
  privateCount: number;
  setsCount: number;
}

const UserSets = ({
  isOwner,
  userSets,
  privateCount,
  userProfile,
  setsCount,
}: Props) => {
  const [listView, setListView] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between">
        <BackButton href={routes.user.id(userProfile.id)}>
          <b>{userProfile.username}</b> profile
        </BackButton>
        <Button
          variant="secondary"
          size="small"
          icon={listView ? <RxCardStack /> : <RxListBullet />}
          onClick={() => {
            setListView((p) => !p);
          }}
        >
          {listView ? "Card view" : "List view"}
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <Heading>{userProfile.username} sets</Heading>
        <Paragraph>
          {isOwner &&
            setsCount > 0 &&
            `You have created ${userSets.length} sets and ${privateCount} of them are private.`}
          {isOwner && setsCount === 0 && "You have not created any set."}

          {!isOwner &&
            setsCount > 0 &&
            `User has created ${setsCount} sets, out of which ${privateCount} are private.`}
          {!isOwner && setsCount === 0 && "User has not created any set."}
        </Paragraph>
      </div>
      {isOwner && setsCount === 0 && (
        <Button icon={<RxPlus />} href={routes.sets.create.blank}>
          Create your first set
        </Button>
      )}
      {setsCount > 0 && !listView && (
        <div className="grid grid-cols-4 gap-4">
          {userSets.map((set) => (
            <SetCardItem key={set.id} set={set} />
          ))}
        </div>
      )}
      {setsCount > 0 && listView && (
        <div className="flex flex-col gap-4">
          {userSets.map((set) => (
            <SetListItem set={set} key={set.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default UserSets;
