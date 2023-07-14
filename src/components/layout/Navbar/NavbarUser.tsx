import { FiLogIn } from "react-icons/fi";
import useUserDataServer from "@/lib/getUserDataServer";
import { RxPerson } from "react-icons/rx";
import Button from "@/components/ui/Button";

const NavbarUser = async () => {
  const user = await useUserDataServer();

  return (
    <div className="flex justify-end gap-2">
      {user && (
        <Button
          size="small"
          href="/user"
          variant="secondary"
          icon={<RxPerson />}
        >
          {user.username || "User"}
        </Button>
      )}
      {!user && (
        <>
          <Button size="small" href="/signin" variant="secondary">
            Sign in
          </Button>
          <Button size="small" icon={<FiLogIn />} href="/signup">
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};

export default NavbarUser;
