import Navbar from "@/components/layout/Navbar/Navbar";
import { Card, Heading, Logo, Paragraph } from "@/components/ui";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="mx-auto mt-12 w-full p-5 md:max-w-md">
        <Card className="flex flex-col gap-2">
          <div className="my-2 flex flex-col items-center gap-4">
            <span className="text-6xl">
              <Logo />
            </span>
            <div className="flex flex-col items-center">
              <Heading className="font-medium">Hello!</Heading>
              <Paragraph>Sign in or sign up to continue.</Paragraph>
            </div>
          </div>
          {children}
        </Card>
      </div>
    </div>
  );
}
