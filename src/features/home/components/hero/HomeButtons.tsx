import { Button } from "@/components/ui";
import { routes } from "@/constants";
import { RxPerson } from "react-icons/rx";

const HomeButtons = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button href={routes.sets.browser()} icon={<RxPerson />}>
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
