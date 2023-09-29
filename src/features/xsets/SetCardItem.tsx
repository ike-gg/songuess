/* eslint-disable @next/next/no-img-element */
import { Badge, Paragraph, SubHeading, Transition } from "@/components/ui";
import { routes } from "@/constants";
import { Set } from "@/types/databaseTypes";
import addAlpha from "@/utils/addAlphaHex";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { twMerge } from "tailwind-merge";

interface Props {
  set: Set;
  index?: number;
  className?: string;
}

const SetCardItem = forwardRef<HTMLAnchorElement, Props>(
  ({ set, index, className }, ref) => {
    const { id, name, bgColor, textColor, cover, recommendation, description } =
      set;

    useHotkeys("control", () => setCompact((p) => !p));

    const [showDescription, setShowDescription] = useState(false);
    const [compact, setCompact] = useState(false);

    const recommendationGradient = `linear-gradient(150deg, ${
      bgColor || "black"
    }, transparent)`;

    const gradient = `linear-gradient(to top, ${
      bgColor || "black"
    }, transparent)`;

    const gradients = [gradient];
    if (recommendation) gradients.push(recommendationGradient);

    return (
      <motion.a
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          boxShadow: showDescription
            ? `0 0 25px ${bgColor ? addAlpha(bgColor, 0.5) : "transparent"}`
            : undefined,
        }}
        exit={{ opacity: 0, scale: 0.99 }}
        href={routes.sets.set(id)}
        transition={{ delay: 0.04 * (index || 1), type: "spring", bounce: 0 }}
        className={twMerge(
          "relative col-span-1 row-span-1 aspect-square h-full w-full overflow-hidden rounded-lg",
          recommendation && "col-span-2 row-span-2",
          className
        )}
        style={{
          color: textColor || undefined,
          backgroundColor: bgColor || undefined,
        }}
        onFocus={() => setShowDescription(true)}
        onBlur={() => setShowDescription(false)}
      >
        <img
          className={twMerge(
            "absolute left-0 top-0 aspect-square h-full w-full rounded-lg bg-zinc-800 object-cover shadow-lg transition-all duration-500",
            compact && "left-3 top-3 h-3/5 w-3/5"
          )}
          src={cover || ""}
          alt={name + " set cover"}
        />
        <motion.div
          style={{
            background: gradients.join(","),
          }}
          animate={{
            opacity: showDescription ? 1 : 0.75,
          }}
          className={twMerge(
            "pointer-events-auto absolute flex h-full w-full flex-col justify-end p-3 transition-all"
          )}
          onMouseEnter={() => setShowDescription(true)}
          onMouseLeave={() => setShowDescription(false)}
        >
          {recommendation && (
            <Badge
              className={twMerge(
                "mb-auto ml-0 w-fit border-zinc-400 text-white mix-blend-difference transition-all",
                compact && "ml-auto"
              )}
            >
              {recommendation}
            </Badge>
          )}
          <SubHeading className="line-clamp-1 opacity-100">{name}</SubHeading>
          <Transition state={showDescription}>
            <Paragraph className="font-ligh line-clamp-4 opacity-90">
              {description}
            </Paragraph>
          </Transition>
        </motion.div>
      </motion.a>
    );
  }
);

SetCardItem.displayName = "setCardItem";

export default SetCardItem;
