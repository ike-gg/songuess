/* eslint-disable @next/next/no-img-element */
import Paragraph from "@/components/ui/content/Paragraph";
import SubHeader from "@/components/ui/content/SubHeader";
import { Database } from "@/types/supabase";
import Link from "next/link";

type Set = Database["public"]["Tables"]["sets"]["Row"];

interface Props {
  set: Set;
}

const SetListItem = ({ set }: Props) => {
  const { description, id, name, songs, cover } = set;

  return (
    <Link
      href={`/sets/${id}`}
      className="flex items-center gap-3 rounded-md border border-zinc-700/30 bg-zinc-800 p-3"
    >
      <img src={cover} alt="song artwork" className="w-14 rounded-[5px]" />
      <div className="flex grow items-center justify-between">
        <div className="flex basis-8/12 flex-col gap-1">
          <SubHeader className="leading-none">{name}</SubHeader>

          <Paragraph className="text-sm leading-tight line-clamp-1">
            {description}
          </Paragraph>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400">
          {songs.length}
        </div>
      </div>
    </Link>
  );
};

export default SetListItem;
