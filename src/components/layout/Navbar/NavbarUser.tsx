"use client";

import { FiLogIn } from "react-icons/fi";
import { RxPerson } from "react-icons/rx";
import { Button } from "@/components/ui";
import useUserClient from "@/hooks/useUserClient";
import { CgSpinner } from "react-icons/cg";
import { routes } from "@/constants";

const NavbarUser = () => {
  const { isLogged, loading, username } = useUserClient();
  return (
    <div className="flex h-8 items-center justify-end gap-2">
      {loading && <CgSpinner className="animate-spin" />}
      {!loading && isLogged && (
        <Button
          size="small"
          href={routes.user.profile}
          variant="secondary"
          icon={<RxPerson />}
        >
          {username}
        </Button>
      )}
      {!loading && !isLogged && (
        <>
          <Button size="small" href={routes.auth.signin} variant="secondary">
            Sign in
          </Button>
          <Button size="small" icon={<FiLogIn />} href={routes.auth.signup}>
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};

export default NavbarUser;
