import Logo from "@/components/ui/Logo";
import Heading from "@/components/ui/content/Heading";

const Footer = () => {
  return (
    <footer className="flex grid-cols-3 items-center justify-between p-4 md:grid md:p-12">
      <Heading className="flex items-center ">
        <Logo /> SonGuess
      </Heading>
    </footer>
  );
};

export default Footer;
