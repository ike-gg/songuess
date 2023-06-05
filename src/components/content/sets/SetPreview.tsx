/* eslint-disable @next/next/no-img-element */
"use client";

import BackButton from "@/components/ui/BackButton";
import Card from "@/components/ui/wrappers/Card/Card";
import Badge from "@/components/ui/content/Badge";
import Header from "@/components/ui/content/Header";
import Paragraph from "@/components/ui/content/Paragraph";
import SubHeader from "@/components/ui/content/SubHeader";
import { Database } from "@/types/supabase";
import { usePathname, useRouter } from "next/navigation";
import CardFooter from "@/components/ui/wrappers/Card/CardFooter";
import Button from "@/components/ui/Button";
import ExtendingParagraph from "@/components/ui/content/ExtendingParagraph";
import { RxPlay, RxShare2 } from "react-icons/rx";
import LinkButton from "@/components/ui/LinkButton";

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
    <Card>
      <div className="relative -m-6 mb-0">
        <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-white" />
        <img
          className="h-52 w-full shrink-0 animate-objectPosition object-cover"
          src={cover}
          alt="cover of music set"
        />
      </div>
      <nav className="flex justify-between">
        <BackButton href="/sets">Back to sets</BackButton>
      </nav>
      <div>
        <div className="flex items-center gap-4">
          <Header>{name}</Header>
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
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
            icon={<RxShare2 />}
          >
            Share
          </Button>
          <LinkButton icon={<RxPlay />} href={`/game/${id}`}>
            Play
          </LinkButton>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SetPreview;
