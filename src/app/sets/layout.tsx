import Navbar from "@/components/layout/Navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-h-screen">
      <Navbar displayLinks={false} />
      <div className="mx-auto max-w-3xl px-4">{children}</div>
    </section>
  );
}
