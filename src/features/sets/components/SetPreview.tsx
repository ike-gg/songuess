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
} from "@/components/ui";
import { Database } from "@/types/supabase";
import { usePathname, useRouter } from "next/navigation";

import { RxCopy, RxPlay, RxShare2 } from "react-icons/rx";

type Set = Database["public"]["Tables"]["sets"]["Row"];

interface Props {
  set: Set | null;
  setContent: { albums: string[]; artists: string[] } | null;
}

const SetPreview = ({ set, setContent }: Props) => {
  const router = useRouter();
  const url = usePathname();

  if (!set) {
    router.replace("/sets");
    return null;
  }

  const { description, featured, name, songs, cover, id } = set;

  return (
    <>
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
        <BackButton href="/sets">Back to sets</BackButton>
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
          <Button
            icon={<RxCopy />}
            variant="secondary"
            href={`/sets/create?setid=${id}`}
          >
            Duplicate
          </Button>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(url);
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
