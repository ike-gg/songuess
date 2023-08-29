import Navbar from "@/components/layout/Navbar/Navbar";
import { Card } from "@/components/ui";
import { ReactNode } from "react";

const MultiplayerIndexLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="h-screen">
      <Navbar displayLinks={false} />
      <div className="mx-auto max-w-3xl px-4 pb-10">
        <Card>{children}</Card>
      </div>
    </section>
  );
};

export default MultiplayerIndexLayout;
