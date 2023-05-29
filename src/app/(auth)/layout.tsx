import Navbar from "@/components/layout/Navbar/Navbar";

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-white">
      <div className="mx-auto max-w-screen-xl">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
