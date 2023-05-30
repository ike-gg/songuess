import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import InlineLink from "@/components/ui/InlineLink";
import { RxLockClosed, RxEnvelopeClosed } from "react-icons/rx";
import { motion } from "framer-motion";
import Card from "@/components/ui/wrappers/Card/Card";

interface Props {
  handleSignIn: (email: string, password: string) => Promise<void>;
}

const schema = z.object({
  email: z.string().email("Provide valid email"),
  password: z.string().min(8, "Minimal 8 characters"),
});

type FormData = z.infer<typeof schema>;

const LoginForm = ({ handleSignIn }: Props) => {
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
        <InlineLink
          href="/"
          className="mb-2 mt-6 text-center text-sm text-neutral-600 underline"
        >
          Forget password?
        </InlineLink>
        <Button>Log in</Button>
        <LinkButton href="/register" size="small" variant="secondary">
          Create account
        </LinkButton>
      </Card>
    </motion.form>
  );
};

export default LoginForm;
