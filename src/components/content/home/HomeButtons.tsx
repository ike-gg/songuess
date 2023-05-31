import LinkButton from "../../ui/LinkButton";
import { RxPlay, RxBookmark, RxPerson } from "react-icons/rx";

const HomeButtons = () => {
  return (
    <div className="flex gap-3">
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
