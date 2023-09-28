/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { BackButton, Button, Heading, Paragraph } from "@/components/ui";
import { routes } from "@/constants";
import SetListItem from "@/features/sets/components/SetListItem";
import SetCardItem from "@/features/xsets/SetCardItem";
import { Set, User } from "@/types/databaseTypes";
import { useState } from "react";
import { RxCardStack, RxListBullet } from "react-icons/rx";

interface Props {
  userSets: Set[];
  userProfile: User;
  isOwner: boolean;
  privateCount: number;
}

const UserSets = ({ isOwner, userSets, privateCount, userProfile }: Props) => {
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
          icon={listView ? <RxListBullet /> : <RxCardStack />}
          onClick={() => {
            setListView((p) => !p);
          }}
        >
          {listView ? "List view" : "Card view"}
        </Button>
      </div>
      <div>
        <Heading>{userProfile.username} sets</Heading>
        <Paragraph>
          {isOwner
            ? `You have created ${userSets.length} sets and ${privateCount} of them are private.`
            : `User has created ${
                userSets.length + privateCount
              } sets, out of which ${privateCount} are private.`}
        </Paragraph>
      </div>
      {!listView && (
        <div className="grid grid-cols-4 gap-4">
          {userSets.map((set) => (
            <SetCardItem key={set.id} set={set} />
          ))}
        </div>
      )}
      {listView && (
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
