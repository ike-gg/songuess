/* eslint-disable @next/next/no-img-element */
"use client";

import {
  BackButton,
  Badge,
  Button,
  CardFooter,
  ExtendingParagraph,
  Heading,
  Paragraph,
  Dialog,
  ErrorBlock,
  SubHeading,
} from "@/components/ui";

import { RxCopy, RxPencil2, RxPlay, RxShare2, RxTrash } from "react-icons/rx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useFeedback from "@/hooks/useFeedback";
import { routes } from "@/constants";
import { DatabaseClient } from "@/lib/database/databaseClient";
import { Set, User } from "@/types/databaseTypes";

interface Props {
  set: Set;
  setContent: { albums: string[]; artists: string[] };
  isOwner: boolean;
  owner?: User | null;
}

const SetPreview = ({ set, setContent, owner, isOwner }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { error, setError, loading, setLoading } = useFeedback();

  const database = new DatabaseClient({ type: "clientComponent" });

  const router = useRouter();

  const removeSet = async () => {
    setLoading(true);
    const { error } = await database.sets.remove(set.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.replace(routes.sets.browser());
  };

  const {
    description,
    featured: isFeatured,
    private: isPrivate,
    name,
    songs,
    cover,
    id,
  } = set;

  return (
    <>
      <Dialog handleState={setDialogOpen} state={dialogOpen}>
        <Heading>Are you sure?</Heading>
        <Paragraph>
          Are you sure you want to delete <b>{set.name}</b> set?
        </Paragraph>
        {error && <ErrorBlock>{error}</ErrorBlock>}
        <CardFooter className="flex flex-row justify-end gap-2">
          <Button
            onClick={() => setDialogOpen(false)}
            variant="secondary"
            size="small"
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            onClick={() => removeSet()}
            icon={<RxTrash />}
            variant="danger"
            size="small"
          >
            Delete
          </Button>
        </CardFooter>
      </Dialog>
      <div className="relative -m-6 mb-0">
        {cover && (
          <img
            className="h-52 w-full shrink-0 animate-objectPosition object-cover shadow-xl shadow-zinc-900"
            src={cover}
            alt="cover of music set"
          />
        )}
        {!cover && <div className="h-52 w-full" />}
      </div>
      <nav className="flex items-start justify-between">
        <BackButton href={routes.sets.browser()}>Back to sets</BackButton>
      </nav>
      <div>
        <div className="flex flex-col-reverse items-start gap-2 break-all md:flex-row md:items-center md:gap-4">
          <Heading>{name}</Heading>
          <Badge className="whitespace-nowrap">
            {isPrivate ? "Private" : isFeatured ? "Featured" : "Community"}
          </Badge>
        </div>
        <Paragraph>{songs.length} tracks</Paragraph>
      </div>
      <ExtendingParagraph>
        {description || "Description not found."}
      </ExtendingParagraph>
      {setContent && (
        <div className="mt-4 flex flex-col gap-2">
          <SubHeading>Set includes:</SubHeading>
          <ExtendingParagraph>
            {`Albums: ${setContent.albums.join(", ")}`}
          </ExtendingParagraph>
          <ExtendingParagraph>
            {`Artists: ${setContent.artists.join(", ")}`}
          </ExtendingParagraph>
        </div>
      )}
      {owner && (
        <div className="mt-2 flex flex-col gap-2">
          <SubHeading>Created by</SubHeading>
          <Button
            href={routes.user.id(owner.id)}
            size="small"
            variant="secondary"
          >
            <div className="flex items-center gap-2">
              {owner.avatar_url && (
                <img
                  className="h-7 w-7 rounded-full bg-zinc-500"
                  alt="user profile image"
                  src={owner.avatar_url || ""}
                />
              )}
              {!owner.avatar_url && (
                <div className="h-7 w-7 rounded-full bg-zinc-500" />
              )}
              <p>{owner.username}</p>
            </div>
          </Button>
        </div>
      )}
      <CardFooter>
        <div className="flex justify-between gap-3">
          <div className="flex gap-2">
            {isOwner && (
              <>
                <Button
                  icon={<RxTrash />}
                  variant="danger"
                  onClick={() => setDialogOpen(true)}
                >
                  Delete
                </Button>
                <Button
                  href={routes.sets.update(id)}
                  icon={<RxPencil2 />}
                  variant="secondary"
                >
                  Edit
                </Button>
              </>
            )}
            <Button
              icon={<RxCopy />}
              variant="secondary"
              href={routes.sets.create.existingSet(id)}
            >
              Duplicate
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(location.href);
              }}
              icon={<RxShare2 />}
            >
              Share
            </Button>
            <Button icon={<RxPlay />} href={routes.game.set(id)}>
              Play
            </Button>
          </div>
        </div>
      </CardFooter>
    </>
  );
};

export default SetPreview;
