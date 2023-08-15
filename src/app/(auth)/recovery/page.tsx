import Recovery from "@/components/auth/recovery/Recovery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recovery password",
};

const RecoveryPage = () => {
  return <Recovery />;
};

export default RecoveryPage;
