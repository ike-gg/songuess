import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl">
        <Navbar />
      </div>
      <div className="z-0">{children}</div>
      <div className="mx-auto max-w-screen-xl">
        <Footer />
      </div>
    </div>
  );
}
