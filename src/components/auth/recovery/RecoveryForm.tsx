import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxEnvelopeClosed } from "react-icons/rx";
import {
  BackButton,
  Button,
  ErrorBlock,
  Input,
  Paragraph,
  SuccessBlock,
} from "@/components/ui";
import { routes } from "@/constants";

interface Props {
  handleRecovery: (email: string) => Promise<void>;
  loading: boolean;
  error?: string;
  success?: string;
}

const schema = z.object({
  email: z.string().email("Enter valid email"),
});

type FormData = z.infer<typeof schema>;

const RecoveryForm = ({ handleRecovery, loading, error, success }: Props) => {
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
      onSubmit={handleSubmit((e) => handleRecovery(e.email))}
    >
      <BackButton href={routes.auth.signin}>Back to sign in</BackButton>
      {error && <ErrorBlock>{error}</ErrorBlock>}
      {success && <SuccessBlock>{success}</SuccessBlock>}
      <Paragraph className="my-2">
        Use form below to recover your account using assigned email address
      </Paragraph>
      <Input
        label={"Email"}
        placeholder={"Type your email"}
        type={"email"}
        error={errors.email?.message}
        icon={<RxEnvelopeClosed />}
        {...register("email")}
      />
      <Button loading={loading} className="my-3 w-full" type="submit">
        Send recovery link
      </Button>
    </form>
  );
};

export default RecoveryForm;
