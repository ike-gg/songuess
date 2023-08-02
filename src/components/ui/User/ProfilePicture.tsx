/* eslint-disable @next/next/no-img-element */
import { RxPerson } from "react-icons/rx";

interface Props {
  avatarUrl?: string;
}

const ProfilePicture = ({ avatarUrl }: Props) => {
  return (
    <div className="h-16 w-16 overflow-hidden rounded-full bg-zinc-800">
      {avatarUrl && (
        <img src={avatarUrl} className="w-full" alt="user profile picture" />
      )}
      {!avatarUrl && <RxPerson className="h-full w-full p-3" />}
    </div>
  );
};

export { ProfilePicture };
