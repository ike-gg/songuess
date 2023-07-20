"use client";

import Divider from "@/components/ui/Divider";
import Input from "@/components/ui/Input";
import {
  RxGlobe,
  RxInfoCircled,
  RxLink1,
  RxLockClosed,
  RxPencil2,
} from "react-icons/rx";
import SetMusicSearch from "./SetMusicSearch";
import { useEffect, useState } from "react";
import { SearchQuerySong } from "@/types/musicApi/SearchQuery";
import SongItem from "@/components/music/SongItem";
import Textarea from "@/components/ui/Textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorParagraph from "@/components/ui/content/ErrorParagraph";
import CardFooter from "@/components/ui/Card/CardFooter";
import Button from "@/components/ui/Button";
import parseArtwork from "@/utils/parseArtwork";
import { useRouter } from "next/navigation";
import sleep from "@/utils/sleep";
import Paragraph from "@/components/ui/content/Paragraph";

const schema = z.object({
  name: z.string().trim().min(6, "Minimal 6 characters"),
  description: z.optional(z.string()),
  cover: z.string().url().optional(),
  songs: z
    .string()
    .array()
    .min(5, { message: "At least 5 songs." })
    .max(100, { message: "Max 100 tracks per set." }),
  private: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export interface ProvidedValuesSetCreator
  extends Omit<FormData, "songs" | "private"> {
  playlist: SearchQuerySong[];
}

interface Props {
  values?: ProvidedValuesSetCreator;
}

const SetCreator = ({ values }: Props) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [playlist, setPlaylist] = useState<SearchQuerySong[]>(
    values?.playlist || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: values
      ? { ...values, songs: [], private: false }
      : { cover: undefined, private: false, songs: [] },
  });

  const isPrivate = watch("private");
  const songsAdded = watch("songs");

  useEffect(() => {
    setValue(
      "songs",
      playlist.map((song) => song.id)
    );
  }, [playlist, setValue]);

  const clickHandler = (song: SearchQuerySong) => {
    setPlaylist((prev) => {
      const isAdded = prev.some((currSongs) => currSongs.id === song.id);
      if (isAdded) {
        return prev.filter(({ id }) => id !== song.id);
      } else return [...prev, song];
    });
  };

  const removeSongHandler = (songId: string) => {
    setPlaylist((prev) => prev.filter(({ id }) => id !== songId));
  };

  const handleSetSubmit: SubmitHandler<FormData> = async (form: FormData) => {
    const {
      name,
      songs,
      description,
      cover: coverProvided,
      private: setPrivate,
    } = form;
    const cover =
      coverProvided ??
      parseArtwork(playlist[0].attributes.artwork).artworkUrl.large;

    const { data, error } = await supabase
      .from("sets")
      .insert({
        featured: false,
        name,
        songs,
        cover,
        description,
        private: setPrivate,
      })
      .select();

    if (!error && data) {
      router.replace(`/sets/${data[0].id}`);
    }

    await sleep(10000);

    throw "wtf!";
  };

  return (
    <form
      onSubmit={handleSubmit(handleSetSubmit)}
      className="flex flex-col gap-3"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Set name"
          icon={<RxInfoCircled />}
          error={errors.name?.message}
          {...register("name")}
        />
        <Textarea
          label="Description"
          className="row-span-2"
          error={errors.description?.message}
          {...register("description")}
        />
        <Input
          tooltip="URL to the image, if not provided, first songs cover of the playlist will be used."
          label="Image url"
          icon={<RxLink1 />}
          error={errors.cover?.message}
          {...register("cover", {
            setValueAs: (value) => (value === "" ? undefined : value),
          })}
        />
      </div>
      <Divider>trakclist</Divider>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Paragraph>Playlist inludes {songsAdded.length} songs.</Paragraph>
          <SetMusicSearch used={playlist} clickHandler={clickHandler} />
        </div>
        <div className="flex h-fit flex-wrap gap-3 overflow-y-scroll">
          {playlist.map((song) => {
            return (
              <SongItem
                className="cursor-pointer border border-zinc-700/40 bg-zinc-800 p-2 pr-5 hover:scale-[98%] hover:opacity-80"
                shortName
                showArtist
                showArtwork
                songData={song.attributes}
                key={song.id + "added"}
                onClick={() => removeSongHandler(song.id)}
              />
            );
          })}
        </div>
        {errors.songs?.message && (
          <ErrorParagraph>{errors.songs.message}</ErrorParagraph>
        )}
      </div>
      <CardFooter className="flex flex-row items-center justify-end">
        <Button
          variant="secondary"
          onClick={() => setValue("private", !isPrivate)}
          icon={isPrivate ? <RxLockClosed /> : <RxGlobe />}
        >
          {isPrivate ? "Private" : "Public"}
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          icon={!isSubmitting && <RxPencil2 />}
        >
          {isSubmitting ? "Creating set..." : "Create set"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default SetCreator;
