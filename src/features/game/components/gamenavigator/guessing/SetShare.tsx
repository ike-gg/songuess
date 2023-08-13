import { Button } from "@/components/ui";
import { Database } from "@/types/supabase";
import { RxShare2 } from "react-icons/rx";

type Set = Database["public"]["Tables"]["sets"]["Row"];

interface Props {
  set: Set;
}

const SetShare = ({ set }: Props) => {
  return (
    <>
      <Button
        className="relative rounded-full bg-transparent p-2"
        size="small"
        variant="navigator"
      >
        <RxShare2 className="text-xl" />
      </Button>
    </>
  );
};

export default SetShare;
