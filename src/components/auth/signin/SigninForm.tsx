import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxLockClosed, RxEnvelopeClosed } from "react-icons/rx";
import { Button, Divider, ErrorBlock, Input } from "@/components/ui";
import Link from "next/link";

interface Props {
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSpotify: () => Promise<void>;
  loading: boolean;
  error?: string;
}

const schema = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(6, "Minimal 6 characters"),
});

type FormData = z.infer<typeof schema>;

const SigninForm = ({ handleSignIn, handleSpotify, loading, error }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit((e) => handleSignIn(e.email, e.password))}
    >
      {error && <ErrorBlock>{error}</ErrorBlock>}
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
      <Button loading={loading} className="my-3 w-full" type="submit">
        Sign in
      </Button>
      <Link
        href="/signup"
        className="mb-0 text-center text-sm text-zinc-500 opacity-75 hover:opacity-100"
      >
        Dont have an account? <span className="text-zinc-300">Sign up</span>
      </Link>
      <Link
        href="/recovery"
        className=" text-center text-sm text-zinc-500 opacity-75 hover:opacity-100"
      >
        Forget password? <span className="text-zinc-300">Recovery</span>
      </Link>
      <Divider>OR</Divider>
      <Button
        className="w-full"
        type="button"
        variant="spotify"
        onClick={handleSpotify}
      >
        Sign in with Spotify
      </Button>
    </form>
  );
};

export default SigninForm;
