import { forwardRef } from "react";
import { motion } from "framer-motion";

const NavigatorDivider = forwardRef<HTMLDivElement, { key: string }>(
  ({ key }, ref) => {
    return (
      <motion.div
        layout
        ref={ref}
        key={key}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring" }}
        className="h-9 w-[1px] rounded-full bg-zinc-800/20"
      />
    );
  }
);

NavigatorDivider.displayName = "navigator divider";

export default NavigatorDivider;
