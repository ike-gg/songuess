"use client";

import {
  RxGlobe,
  RxInfoCircled,
  RxLink1,
  RxLockClosed,
  RxPencil2,
  RxReset,
} from "react-icons/rx";
import SetMusicSearch from "./SetMusicSearch";
import { useEffect, useState } from "react";
import { SearchQuerySong } from "@/types/musicApi/SearchQuery";
import SongItem from "@/components/music/SongItem";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import parseArtwork from "@/utils/parseArtwork";
import { useRouter } from "next/navigation";
import {
  Button,
  CardFooter,
  Divider,
  ErrorParagraph,
  Input,
  Paragraph,
  Textarea,
  Tooltip,
} from "@/components/ui";
import useFeedback from "@/hooks/useFeedback";
import ISRCImport from "./ISRCImport";

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
  existingId?: string;
  isrcs?: {
    album: string;
    isrc: string;
  }[];
}

const SetCreator = ({ values, existingId, isrcs }: Props) => {
  const updateMode = existingId ? true : false;
  const isIsrcs = Array.isArray(isrcs) && isrcs.length > 0;

  const { setError, error, setLoading, loading } = useFeedback();

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [playlist, setPlaylist] = useState<SearchQuerySong[]>(
    values?.playlist || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const newSongHandler = (newSong: SearchQuerySong) => {
    setPlaylist((prev) => {
      const isAdded = prev.some((currSongs) => currSongs.id === newSong.id);
      if (isAdded) return prev;
      return [...prev, newSong];
    });
  };

  const removeSongHandler = (songId: string) => {
    setPlaylist((prev) => prev.filter(({ id }) => id !== songId));
  };

  const handleSetSubmit: SubmitHandler<FormData> = async (form: FormData) => {
    setLoading(true);
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

    const { data, error } = updateMode
      ? await supabase
          .from("sets")
          .update({
            name,
            songs,
            cover,
            description,
            private: setPrivate,
          })
          .eq("id", existingId)
          .select()
      : await supabase
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

    if (error) {
      setError(error.message);
      return;
    }

    router.replace(`/sets/${data[0].id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSetSubmit)}
      className="flex flex-col gap-3"
    >
      {isIsrcs && <ISRCImport isrcs={isrcs} addHandler={newSongHandler} />}
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
          <div>
            <Paragraph className="flex items-center gap-2">
              <Tooltip>Minimum 5 tracks, maximum 100 tracks per set.</Tooltip>
              Playlist inludes {songsAdded.length} songs.
              {songsAdded.length > 0 && (
                <span className="opacity-50">Tap on song to delete it.</span>
              )}
            </Paragraph>
            {errors.songs?.message && (
              <ErrorParagraph>{errors.songs.message}</ErrorParagraph>
            )}
          </div>
          <SetMusicSearch used={playlist} clickHandler={clickHandler} />
        </div>
        <div className="flex h-fit flex-wrap gap-3 overflow-y-scroll">
          {playlist.map((song) => {
            return (
              <SongItem
                className="cursor-pointer border border-zinc-700/40 bg-zinc-800 p-2 pr-4 opacity-80 hover:opacity-100"
                shortName
                showArtist
                showPreview
                colorfulPlay
                showArtwork
                songData={song.attributes}
                key={song.id + "added"}
                onClick={() => removeSongHandler(song.id)}
              />
            );
          })}
        </div>
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
          loading={loading}
          icon={!loading && <RxPencil2 />}
        >
          {!updateMode && "Create set"}
          {updateMode && "Update set"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default SetCreator;
