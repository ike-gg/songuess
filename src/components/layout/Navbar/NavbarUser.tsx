import LinkButton from "@/components/ui/LinkButton";
import { FiLogIn } from "react-icons/fi";
import useUserDataServer from "@/lib/getUserDataServer";
import { RxPerson } from "react-icons/rx";

const NavbarUser = async () => {
  const user = await useUserDataServer();

  return (
    <div className="flex justify-end gap-2">
      {user && (
        <LinkButton
          size="small"
          href="/user"
          variant="secondary"
          icon={<RxPerson />}
        >
          {user.username || "User"}
        </LinkButton>
      )}
      {!user && (
        <>
          <LinkButton size="small" href="/login" variant="secondary">
            Log in
          </LinkButton>
          <LinkButton size="small" icon={<FiLogIn />} href="/register">
            Sign up
          </LinkButton>
        </>
      )}
    </div>
  );
};

export default NavbarUser;
