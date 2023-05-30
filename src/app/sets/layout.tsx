import Navbar from "@/components/layout/Navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar displayLinks={false} />
      <div className="mx-auto mb-60 max-w-3xl px-4">{children}</div>
    </div>
  );
}
