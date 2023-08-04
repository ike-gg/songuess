"use client";

import { AnimatedText, Button, Heading, Paragraph } from "@/components/ui";
import FeaturesCard from "./FeaturesCard";
import { ImSpotify } from "react-icons/im";
import { SiApplemusic } from "react-icons/si";
import { IoMusicalNotes } from "react-icons/io5";
import { SongAttributes } from "@/types/musicApi/Song";
import { useState } from "react";
import parseArtwork from "@/utils/parseArtwork";
import addAlpha from "@/utils/addAlphaHex";
import { RxReload } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import parseTitleToGuess from "@/utils/parseTitleToGuess";
import FeatureGuess from "./FeatureGuess";
import FeatureSpotify from "./FeatureSpotify";
import FeatureAppleMusic from "./FeautreAppleMusic";
import FeatureLevels from "./FeatureLevels";
import FeatureGameOptions from "./FeatureGameOptions";
import FeatureMulti from "./FeatureMulti";
import HomeSectionWrapper from "../shared/HomeSectionWrapper";
import HomeSectionHeader from "../shared/HomeSectionHeader";
import HomeSectionParagraph from "../shared/HomeSectionParagraph";

interface Props {
  songs: SongAttributes[];
}

const FeaturesHome = ({ songs }: Props) => {
  return (
    <HomeSectionWrapper className="max-w-screen-lg">
      <div className="mx-auto flex max-w-2xl flex-col gap-2 text-center">
        <HomeSectionHeader>Features of SonGuess</HomeSectionHeader>
        <HomeSectionParagraph>
          We give you full control over your music experience. Enjoy pre-made
          playlists from various categories or have fun crafting your own.
        </HomeSectionParagraph>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FeatureGuess songs={songs} />
        <FeatureSpotify />
        <FeatureAppleMusic />
        <FeatureMulti />
        <FeatureLevels />
        <FeatureGameOptions />
      </div>
    </HomeSectionWrapper>
  );
};

export default FeaturesHome;
