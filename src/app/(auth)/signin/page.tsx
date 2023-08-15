import Signin from "@/components/auth/signin/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

const SigninPage = () => {
  return <Signin />;
};

export default SigninPage;
