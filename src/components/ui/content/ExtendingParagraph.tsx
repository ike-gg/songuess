import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Paragraph from "./Paragraph";
import trimTextByWords from "@/utils/trimTextByWords";

interface Props {
  children: string;
  className?: string;
  limit?: number;
}

const ExtendingParagraph = ({ children, className, limit = 30 }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const fullText = children;
  const trimmedText = trimTextByWords(fullText, limit);

  const textExceededLimit = fullText.split(" ").length > limit;

  return (
    <Paragraph
      onClick={() => {
        if (isOpen) setIsOpen(false);
      }}
      className={twMerge(
        "rounded-lg border-2 border-transparent leading-snug transition-all",
        isOpen &&
          "cursor-pointer bg-zinc-700 p-4 leading-normal hover:bg-zinc-700/75",
        className
      )}
    >
      {!isOpen && textExceededLimit && (
        <>
          {trimmedText}
          {"... "}
          <span
            onClick={() => setIsOpen(true)}
            className="cursor-pointer font-medium capitalize text-zinc-500 underline"
          >
            read more
          </span>
        </>
      )}
      {!isOpen && !textExceededLimit && fullText}
      {isOpen && fullText}
    </Paragraph>
  );
};

export default ExtendingParagraph;
