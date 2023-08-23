"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { Card } from "../Card";
import Motion from "@/components/providers/Motion";
import FocusTrap from "focus-trap-react";
import { useHotkeys } from "react-hotkeys-hook";

interface Props {
  children?: ReactNode;
  state: boolean;
  handleState?: (state: boolean) => void;
}

const Dialog = ({ handleState, state, children }: Props) => {
  const handleClose = () => {
    handleState && handleState(false);
  };

  useHotkeys("esc", () => handleClose(), { enableOnFormTags: true });

  return (
    <Motion duration={0.3}>
      <AnimatePresence>
        {state && (
          <FocusTrap>
            <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
              <motion.div
                onClick={() => handleClose()}
                className="absolute h-full w-full bg-black/75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="p-4"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="w-full md:max-w-xl">{children}</Card>
              </motion.div>
            </div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </Motion>
  );
};

export { Dialog };
