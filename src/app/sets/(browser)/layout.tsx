import Navbar from "@/components/layout/Navbar/Navbar";

export default function SetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar displayLinks={false} />
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-6 px-4 md:flex-row">
        {children}
      </div>
    </section>
  );
}
