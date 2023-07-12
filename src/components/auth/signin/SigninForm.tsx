import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { RxLockClosed, RxEnvelopeClosed } from "react-icons/rx";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card/Card";
import Divider from "@/components/ui/Divider";

interface Props {
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSpotify: () => Promise<void>;
}

const schema = z.object({
  email: z.string().email("Provide valid email"),
  password: z.string().min(8, "Minimal 8 characters"),
});

type FormData = z.infer<typeof schema>;

const LoginForm = ({ handleSignIn, handleSpotify }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <motion.form
      onSubmit={handleSubmit((e) => handleSignIn(e.email, e.password))}
    >
      <Card className="flex flex-col gap-2">
        <Button type="button" variant="spotify" onClick={handleSpotify}>
          Login with Spotify
        </Button>
        <Divider>OR</Divider>
        <Input
          label={"Email"}
          placeholder={"Type your email"}
          type={"email"}
          error={errors.email?.message}
          icon={<RxEnvelopeClosed />}
          {...register("email")}
        />
        <Input
          label={"Password"}
          placeholder={"Type your password"}
          type={"password"}
          error={errors.password?.message}
          icon={<RxLockClosed />}
          {...register("password")}
        />
        <a
          href="/"
          className="mb-2 mt-6 text-center text-sm text-neutral-600 underline"
        >
          Forget password?
        </a>
        <Button type="submit">Log in</Button>
        <Button href="/register" size="small" variant="secondary">
          Create account
        </Button>
      </Card>
    </motion.form>
  );
};

export default LoginForm;
