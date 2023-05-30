import Navbar from "@/components/layout/Navbar/Navbar";

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-white bg-screen bg-no-repeat">
      <div className="mx-auto max-w-screen-xl">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
