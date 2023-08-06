"use client";

import { Button } from "@/components/ui";
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoVolumeMute, IoVolumeHigh } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const messages = [
  {
    user: "Jasper",
    message: "wtf is that",
  },
  {
    user: "jamalAmrah",
    message: "muted",
  },
  {
    user: "lehtv",
    message: "fr gtfo",
  },
  {
    user: "miska",
    message: "Lavender haze - close!",
  },
  {
    user: "ike",
    message: "Lavender haze",
  },
];

const MultiplayerChat = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [videoMuted, setVideoMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = videoMuted;
  }, [videoMuted, videoRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const messagesProgress = useTransform(
    scrollYProgress,
    [0.2, 0.6],
    [0, messages.length + 1]
  );

  useMotionValueEvent(messagesProgress, "change", (v) => {
    const floor = Math.floor(v);
    if (messageIndex !== floor) setMessageIndex(floor);
  });

  return (
    <div
      ref={containerRef}
      className="relative flex h-64 flex-col justify-end gap-2 overflow-hidden rounded-xl bg-zinc-900 p-4 md:p-8"
    >
      <AnimatePresence mode={"popLayout"}>
        {messages.map(({ message, user }, index) => {
          if (index > messageIndex) return null;
          const lastMessage = index === messages.length - 1;
          return (
            <motion.div
              layout
              initial={{ scale: lastMessage ? 1.4 : 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              className={twMerge(
                "relative z-30 flex w-fit origin-bottom-left flex-col gap-1 whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-800 pb-2.5 pl-5 pr-10 pt-2",
                lastMessage &&
                  "border-2 border-indigo-800 bg-indigo-900 pb-3 pl-6 pr-12 pt-3"
              )}
              key={message + user}
            >
              <h5
                className={twMerge(
                  "text-sm leading-none text-indigo-500",
                  lastMessage && "text-lg leading-none text-indigo-400"
                )}
              >
                {user}
              </h5>
              <p
                className={twMerge(
                  "leading-none",
                  lastMessage && "text-2xl font-medium leading-none"
                )}
              >
                {message}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className="absolute bottom-0 right-0 h-full w-3/5">
        <div className="relative h-full w-full">
          <Button
            className="absolute right-0 top-0 z-40 m-2 rounded-full p-2"
            variant="transparent"
            icon={videoMuted ? <IoVolumeMute /> : <IoVolumeHigh />}
            onClick={() => setVideoMuted((p) => !p)}
          />
          <div className="absolute z-10 h-full w-full bg-gradient-to-r from-zinc-900 to-transparent" />
          <motion.video
            className="relative right-0 h-full w-full object-cover"
            ref={videoRef}
            autoPlay
            playsInline
            muted
            loop
            src="https://video-ssl.itunes.apple.com/itunes-assets/Video126/v4/6c/a7/48/6ca74850-703f-fe85-b4a8-075c07c5100d/mzvf_6386814980676928046.720w.h264lc.U.p.m4v"
          />
        </div>
      </div>
    </div>
  );
};

export default MultiplayerChat;
