import { twMerge } from "tailwind-merge";

interface Props {
  children?: string;
  className?: string;
}

const Divider = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        "my-2 flex items-center text-sm uppercase text-zinc-500",
        children && "gap-4",
        className
      )}
    >
      <hr className="h-0.5 grow border-none bg-gradient-to-r from-transparent to-zinc-700" />
      {children && children}
      <hr className="h-0.5 grow border-none bg-gradient-to-l from-transparent to-zinc-700" />
    </div>
  );
};

export { Divider };
