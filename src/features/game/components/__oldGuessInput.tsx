// import { FormEvent, forwardRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { twMerge } from "tailwind-merge";
// import splitWordsWithSpaces from "@/utils/splitWordsWithSpaces";
// import { useAppDispatch, useAppSelector } from "@/hooks";
// import parseTitleToGuess from "@/utils/parseTitleToGuess";
// import { stringSimilarity } from "string-similarity-js";
// import { gameActions } from "@/features/game/store/gameSlice";
// import parseDiacriticalChars from "@/utils/parseDiacriticalChars";
// import { isIOS } from "react-device-detect";
// import { Paragraph } from "@/components/ui";

// interface Props {
//   onGuess?: () => void;
//   secretPhrase: string;
// }

// const GuessInput = forwardRef<HTMLInputElement, Props>(
//   ({ secretPhrase, onGuess }, inputRef) => {
//     const [guess, setGuess] = useState("");

//     const dispatch = useAppDispatch();
//     const { isInputFocused } = useAppSelector((state) => state.game.round);

//     const parsedSecret = parseTitleToGuess(secretPhrase);
//     const secretWordsArray = splitWordsWithSpaces(parsedSecret);

//     const handleGuessInput = (e: FormEvent<HTMLInputElement>) => {
//       const inputValue = e.currentTarget.value;
//       const inputGuess = parseDiacriticalChars(inputValue).toLowerCase();
//       const toGuess = parsedSecret.toLowerCase();

//       dispatch(
//         gameActions.setSimilarity(stringSimilarity(inputGuess, toGuess))
//       );

//       if (inputGuess === toGuess) onGuess && onGuess();

//       if (e.currentTarget.value.length > toGuess.length) {
//         const slicedText = e.currentTarget.value.slice(0, toGuess.length);
//         setGuess(slicedText);
//         return;
//       }
//       setGuess(e.currentTarget.value);
//     };

//     return (
//       <div className="my-3">
//         <Paragraph className="mb-3 text-sm opacity-80">
//           {isInputFocused ? "Type to guess" : "Click to type"}
//         </Paragraph>
//         <input
//           ref={inputRef}
//           autoCorrect="off"
//           autoComplete="off"
//           autoFocus
//           type="search"
//           className="static bottom-0 left-0 -z-50 block h-full w-full bg-zinc-800/80 p-2 text-zinc-100 caret-transparent opacity-100 outline-none md:absolute md:opacity-0"
//           value={guess}
//           onInput={handleGuessInput}
//           onFocus={() => dispatch(gameActions.setInputFocus(true))}
//           onBlur={(e) => {
//             if (isIOS) {
//               dispatch(gameActions.setInputFocus(false));
//               return;
//             }
//             e.target.focus();
//           }}
//         />
//         <div className="relative hidden flex-wrap justify-center gap-y-3 bg-zinc-800/30 p-3 text-center md:flex">
//           {secretWordsArray.map((word, wordIndex, wordsArray) => {
//             return (
//               <div className="flex" key={word + wordIndex}>
//                 {word.split("").map((letter, letterIndex) => {
//                   //realIndex represents current char's index of whole phrase
//                   //inside the splitted by words scope
//                   const realIndex =
//                     wordsArray.slice(0, wordIndex).reduce((prev, curr) => {
//                       return curr.length + prev;
//                     }, 0) + letterIndex;

//                   const userLetterGuess = guess[realIndex];

//                   const letterToGuess = letter.toLowerCase();
//                   const userLetterGuessParsed = parseDiacriticalChars(
//                     userLetterGuess || ""
//                   ).toLowerCase();

//                   const correctLetter = letterToGuess === userLetterGuessParsed;

//                   return (
//                     <motion.div
//                       key={wordIndex + letter + letterIndex}
//                       className={twMerge(
//                         "flex h-[2.25rem] w-6 scale-[100.7%] items-center justify-center overflow-hidden bg-zinc-800/75 text-center transition-all",
//                         //box containing secret space
//                         letter === " " && "w-5 rounded bg-transparent ",
//                         //current place
//                         guess.length === realIndex &&
//                           "animate-pulse bg-zinc-900 ",
//                         //box before space
//                         parsedSecret[realIndex + 1] === " " && "rounded-r-lg",
//                         //box after space
//                         parsedSecret[realIndex - 1] === " " && "rounded-l-lg",
//                         //fist box
//                         realIndex === 0 && "rounded-l-lg",
//                         //last box
//                         realIndex === parsedSecret.length - 1 && "rounded-r-lg",
//                         //box containing correct letter guess
//                         correctLetter && "bg-zinc-100 text-zinc-800"
//                       )}
//                     >
//                       <AnimatePresence>
//                         {userLetterGuess && (
//                           <motion.div
//                             key={wordIndex + letter + letterIndex + "inner"}
//                             className="block"
//                             initial={{ y: 20, scale: 1, opacity: 0 }}
//                             animate={{ y: 0, scale: 1, opacity: 1 }}
//                             exit={{ scale: 0, opacity: 0 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             {userLetterGuess === " " ? (
//                               <span>&nbsp;</span>
//                             ) : (
//                               userLetterGuess
//                             )}
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// );

// GuessInput.displayName = "gameGuessInput";

// export default GuessInput;
