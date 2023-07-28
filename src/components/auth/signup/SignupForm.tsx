import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxLockClosed, RxEnvelopeClosed, RxPerson } from "react-icons/rx";
import { motion } from "framer-motion";
import { Button, Card, Input } from "@/components/ui";

interface Props {
  handleSignUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
}

const schema = z.object({
  username: z.string().min(5, "Minimum 5 characters"),
  email: z.string().email("Provide valid email"),
  password: z.string().min(8, "Minimum 8 characters"),
});

type FormData = z.infer<typeof schema>;

const SignupForm = ({ handleSignUp }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <motion.form
      onSubmit={handleSubmit((e) =>
        handleSignUp(e.username, e.email, e.password)
      )}
    >
      <Card>
        <Input
          label={"Username"}
          placeholder={"Type your username"}
          type={"text"}
          error={errors.username?.message}
          icon={<RxPerson />}
          {...register("username")}
        />
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
        <br />
        <Button>Sign up</Button>
        <Button href="/login" size="small" variant="secondary">
          User already? Sign in
        </Button>
      </Card>
    </motion.form>
  );
};

export default SignupForm;
