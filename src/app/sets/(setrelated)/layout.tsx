import Navbar from "@/components/layout/Navbar/Navbar";
import { Card } from "@/components/ui";

export default function SetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-h-screen">
      <Navbar displayLinks={false} />
      <div className="mx-auto max-w-4xl px-4 pb-10">
        <Card>{children}</Card>
      </div>
    </section>
  );
}
