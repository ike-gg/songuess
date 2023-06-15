import Badge from "@/components/ui/content/Badge";
import LinkButton from "../../ui/LinkButton";
import { RxPerson } from "react-icons/rx";

const HomeButtons = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <LinkButton href="/sets" icon={<RxPerson />}>
        Solo Mode
      </LinkButton>
      <LinkButton
        disabled
        href=""
        icon={
          <>
            <RxPerson />
            <RxPerson />
          </>
        }
        variant="secondary"
      >
        Play with friends
      </LinkButton>
    </div>
  );
};

export default HomeButtons;
