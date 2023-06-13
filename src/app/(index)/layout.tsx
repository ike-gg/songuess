import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="h-[300vh]">
        <div className="sticky top-0">
          <Navbar />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
