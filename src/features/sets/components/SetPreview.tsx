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
  SubHeader,
  Dialog,
  ErrorBlock,
} from "@/components/ui";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { RxCopy, RxPencil2, RxPlay, RxShare2, RxTrash } from "react-icons/rx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useFeedback from "@/hooks/useFeedback";
import { routes } from "@/constants";

type Set = Database["public"]["Tables"]["sets"]["Row"];

interface Props {
  set: Set;
  setContent: { albums: string[]; artists: string[] };
  owner?: boolean;
}

const SetPreview = ({ set, setContent, owner }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { error, setError, loading, setLoading } = useFeedback();

  const supabase = createClientComponentClient<Database>();

  const router = useRouter();

  const removeSet = async () => {
    setLoading(true);
    const { error } = await supabase.from("sets").delete().eq("id", set.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.replace(routes.sets.browser);
  };

  const { description, featured, name, songs, cover, id } = set;

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
      <nav className="flex justify-between">
        <BackButton href={routes.sets.browser}>Back to sets</BackButton>
      </nav>
      <div>
        <div className="flex items-center gap-4">
          <Heading>{name}</Heading>
          <Badge>{featured ? "Featured" : "Community"}</Badge>
        </div>
        <Paragraph>{songs.length} tracks</Paragraph>
      </div>
      <ExtendingParagraph>
        {description || "Description not found."}
      </ExtendingParagraph>
      {setContent && (
        <div className="mt-8 flex flex-col gap-2">
          <SubHeader>Set includes:</SubHeader>
          <ExtendingParagraph>
            {`Albums: ${setContent.albums.join(", ")}`}
          </ExtendingParagraph>
          <ExtendingParagraph>
            {`Artists: ${setContent.artists.join(", ")}`}
          </ExtendingParagraph>
        </div>
      )}
      <CardFooter>
        <div className="flex justify-between gap-3">
          <div className="flex gap-2">
            {owner && (
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
              href={`/sets/create?setid=${id}`}
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
            <Button icon={<RxPlay />} href={`/game/${id}`}>
              Play
            </Button>
          </div>
        </div>
      </CardFooter>
    </>
  );
};

export default SetPreview;
