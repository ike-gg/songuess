import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

const Skeleton = ({ className }: Props) => {
  return (
    <div
      className={twMerge(
        "h-4 w-full animate-pulse rounded-md bg-zinc-700",
        className
      )}
    />
  );
};

export { Skeleton };
