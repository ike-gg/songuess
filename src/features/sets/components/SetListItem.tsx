/* eslint-disable @next/next/no-img-element */
import { Database } from "@/types/supabase";
import { useState } from "react";
import { motion } from "framer-motion";
import { CardItem, Paragraph, SubHeading } from "@/components/ui";

type Set = Database["public"]["Tables"]["sets"]["Row"];

interface Props {
  set: Set;
}

const SetListItem = ({ set }: Props) => {
  const { description, id, name, songs, cover } = set;
  const [loaded, setLoaded] = useState(false);

  return (
    <CardItem href={`/sets/${id}`}>
      {cover && (
        <motion.img
          onLoad={() => setLoaded(true)}
          loading="lazy"
          animate={{
            filter: `blur(${loaded ? 0 : 5}px)`,
          }}
          src={cover}
          alt="song artwork"
          className="aspect-square h-14 w-14 rounded-sm bg-zinc-700 object-cover"
        />
      )}
      {!cover && <div className="h-14 w-14 rounded-sm bg-zinc-700" />}
      <div className="flex grow items-center justify-between">
        <div className="flex basis-8/12 flex-col gap-1">
          <SubHeading className="text-lg leading-none">{name}</SubHeading>
          <Paragraph className="line-clamp-1 text-sm leading-tight">
            {description}
          </Paragraph>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400">
          {songs.length}
        </div>
      </div>
    </CardItem>
  );
};

export default SetListItem;
