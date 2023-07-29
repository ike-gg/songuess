import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxLockClosed } from "react-icons/rx";
import {
  BackButton,
  Button,
  ErrorBlock,
  Input,
  Paragraph,
  SuccessBlock,
} from "@/components/ui";
import { useEffect } from "react";

interface Props {
  handlePasswordUpdate: (password: string) => Promise<void>;
  loading: boolean;
  error?: string;
  success?: string;
}

const schema = z.object({
  password: z.string().min(6, "Minimal 6 characters"),
});

type FormData = z.infer<typeof schema>;

const UpdatePasswordForm = ({
  handlePasswordUpdate,
  loading,
  error,
  success,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (success) reset();
  }, [reset, success]);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit((e) => handlePasswordUpdate(e.password))}
    >
      <BackButton href="/">Back to main page</BackButton>
      <Paragraph className="my-2">Update your password</Paragraph>
      {error && <ErrorBlock>{error}</ErrorBlock>}
      {success && <SuccessBlock>{success}</SuccessBlock>}
      <Input
        label={"Password"}
        placeholder={"Type your new password"}
        type={"password"}
        error={errors.password?.message}
        icon={<RxLockClosed />}
        {...register("password")}
      />
      <Button loading={loading} className="my-3 w-full" type="submit">
        Update password
      </Button>
    </form>
  );
};

export default UpdatePasswordForm;
