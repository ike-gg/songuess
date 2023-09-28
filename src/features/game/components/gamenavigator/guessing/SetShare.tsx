import { Button } from "@/components/ui";
import { Set } from "@/types/databaseTypes";
import { RxShare2 } from "react-icons/rx";

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
