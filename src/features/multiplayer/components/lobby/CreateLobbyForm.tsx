"use client";

import { Button, Dialog, ErrorBlock, Input, Paragraph } from "@/components/ui";
import { routes } from "@/constants";
import useFeedback from "@/hooks/useFeedback";
import { Database } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoPeople } from "react-icons/io5";
import { z } from "zod";

const schema = z.object({
  lobbyName: z.string().min(4, "Min 4 chars").max(16, "Max 16 chars"),
});

type FormData = z.infer<typeof schema>;

const CreateLobbyForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const { loading, setLoading, error, setError } = useFeedback();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm: SubmitHandler<FormData> = async (form: FormData) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lobbies")
      .insert({
        name: form.lobbyName,
      })
      .select()
      .single();
    if (error) {
      setError(error.message);
      return;
    }

    router.push(routes.multiplayer.lobby(data.id));
  };

  return (
    <div>
      <Paragraph className="mb-2 opacity-50">Enter lobby name</Paragraph>
      <form
        className="flex w-full items-start gap-4"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Input
          icon={<IoPeople />}
          hideLabel
          label="Name lobby"
          className="w-full"
          loading={loading}
          error={errors.lobbyName?.message}
          {...register("lobbyName")}
        />
        <Button loading={loading} type="submit">
          Create
        </Button>
      </form>
      {error && <ErrorBlock className="mt-4">{error}</ErrorBlock>}
    </div>
  );
};

export default CreateLobbyForm;
