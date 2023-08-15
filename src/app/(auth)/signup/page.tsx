import Signup from "@/components/auth/signup/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

const SignupPage = () => {
  return <Signup />;
};

export default SignupPage;
