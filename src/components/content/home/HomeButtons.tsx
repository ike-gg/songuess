import { RxPerson } from "react-icons/rx";
import Button from "@/components/ui/Button";

const HomeButtons = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button href="/sets" icon={<RxPerson />}>
        Solo Mode
      </Button>
      <Button
        disabled
        icon={
          <>
            <RxPerson />
            <RxPerson />
          </>
        }
        variant="secondary"
      >
        Play with friends
      </Button>
    </div>
  );
};

export default HomeButtons;
