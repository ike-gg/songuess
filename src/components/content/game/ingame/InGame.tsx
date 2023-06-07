/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion, useMotionValue, useTransform } from "framer-motion";
import removeParentheses from "@/utils/removeParentheses";
import GuessInput from "./GuessInput";
import Countdown from "./Countdown";
import { roundActions } from "@/store/roundSlice";

const InGame = () => {
  const { tracks, currRound } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const { guessSimilarity, currentSong, status } = useAppSelector(
    (state) => state.round
  );

  // useEffect(() => {
  //   useAppDispatch(roundActions.)
  // }, [])

  const inputRef = useRef<HTMLInputElement>(null);

  if (!tracks) return <p>tracks empty</p>;

  // const song = tracks[songIndex].attributes;
  // const { name, artwork } = song;

  // const secretPhrase = removeParentheses(name);

  // const { bgColor, textColor1 } = artwork;

  if (status === "countdown") return <Countdown />;
  else return <p>something went wrong</p>;

  // return (
  // <motion.div
  //   style={{ backgroundColor: `#${bgColor}50`, color: `#${textColor1}` }}
  //   className={twMerge(
  //     "relative flex w-full max-w-3xl p-8 transition-colors"
  //   )}
  //   onClick={() => {
  //     inputRef.current?.focus();
  //   }}
  // >
  //   <div>
  //     <img src={artwork.url.replace("{w}", "200").replace("{h}", "200")} />
  //     <img
  //       className="fixed left-0 top-0 -z-50 w-screen animate-slowlyRotate blur-[100px]"
  //       src={artwork.url.replace("{w}", "200").replace("{h}", "200")}
  //     />
  //     <audio controls src={song.previews[0].url} />
  //     {name} ({secretPhrase})
  //     <button
  //       onClick={() => {
  //         // setSongIndex(Math.floor(Math.random() * tracks.length));
  //       }}
  //     >
  //       random song
  //     </button>
  //   </div>
  //   <GuessInput
  //     onGuess={() => console.log("NICE")}
  //     ref={inputRef}
  //     secretPhrase={secretPhrase}
  //   />
  // </motion.div>
  // );
};

export default InGame;
