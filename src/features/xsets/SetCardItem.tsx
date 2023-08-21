/* eslint-disable @next/next/no-img-element */
import { Badge, Paragraph, SubHeading } from "@/components/ui";
import { routes } from "@/constants";
import { Database } from "@/types/supabase";
import addAlpha from "@/utils/addAlphaHex";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Set = Database["public"]["Tables"]["sets"]["Row"];

interface Props {
  set: Set;
  key: string;
  index?: number;
}

const SetCardItem = forwardRef<HTMLAnchorElement, Props>(
  ({ set, key, index }, ref) => {
    const { id, name, bgColor, textColor, cover, recommendation, description } =
      set;

    const [showDescription, setShowDescription] = useState(false);

    const recommendationGradient = `linear-gradient(150deg, ${
      bgColor || "black"
    }, transparent)`;

    const gradient = `linear-gradient(to top, ${
      bgColor || "black"
    }, transparent)`;

    console.log("for set:", name, "gradients:", gradient);

    return (
      <motion.a
        key={key}
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{ opacity: 0, scale: 0.99 }}
        href={routes.sets.set(id)}
        transition={{ delay: 0.03 * (index || 1) }}
        className={twMerge(
          "relative col-span-1 row-span-1 aspect-square h-full w-full overflow-hidden rounded-lg",
          recommendation && "col-span-2 row-span-2"
        )}
        style={{ color: textColor || undefined }}
      >
        <img
          className="absolute left-0 top-0 aspect-square w-full shadow-lg"
          src={cover || ""}
          alt={name + " set cover"}
        />
        <motion.div
          style={{
            // background: `${gradient}, ${
            //   recommendation ? recommendationGradient : ""
            // }`,
            background: gradient,
          }}
          initial={{ opacity: 0.2 }}
          whileHover={{ opacity: 0.9 }}
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
          <AnimatePresence>
            {showDescription && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <Paragraph className="font-ligh line-clamp-4 opacity-90">
                  {description}
                </Paragraph>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.a>
    );
  }
);

SetCardItem.displayName = "setCardItem";

export default SetCardItem;
