import { Heading, LogoName } from "@/components/ui";

const Footer = () => {
  return (
    <footer className="flex grid-cols-3 items-center justify-between p-4 md:grid md:p-12">
      <Heading className="flex items-center ">
        <LogoName />
      </Heading>
    </footer>
  );
};

export default Footer;
