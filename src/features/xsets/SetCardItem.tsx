/* eslint-disable @next/next/no-img-element */
import { Badge, Paragraph, SubHeading, Transition } from "@/components/ui";
import { routes } from "@/constants";
import { Set } from "@/types/databaseTypes";
import addAlpha from "@/utils/addAlphaHex";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
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

    const [showDescription, setShowDescription] = useState(false);

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
        style={{ color: textColor || undefined }}
        onFocus={() => setShowDescription(true)}
        onBlur={() => setShowDescription(false)}
      >
        <img
          className="absolute left-0 top-0 aspect-square h-full w-full bg-zinc-800 object-cover shadow-lg"
          src={cover || ""}
          alt={name + " set cover"}
        />
        <motion.div
          style={{
            background: gradients.join(","),
          }}
          animate={{
            opacity: showDescription ? 1 : 0.2,
          }}
          className="pointer-events-auto absolute flex h-full w-full flex-col justify-end p-3"
          onMouseEnter={() => setShowDescription(true)}
          onMouseLeave={() => setShowDescription(false)}
        >
          {recommendation && (
            <Badge className="mb-auto w-fit border-zinc-400 text-white mix-blend-difference">
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
