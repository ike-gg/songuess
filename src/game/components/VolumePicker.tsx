import addAlpha from "@/utils/addAlphaHex";
import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";
import { useState } from "react";
import { RxSpeakerLoud, RxSpeakerQuiet } from "react-icons/rx";

interface Props {
  bgColor: string;
  textColor: string;
  handleVolume: (v: number) => void;
}

const VolumePicker = ({ bgColor, textColor, handleVolume }: Props) => {
  const [volumeState, setVolumeState] = useState(0.5);

  const handleVolumeChange = (volume: number | number[]) => {
    const newVolume = Array.isArray(volume) ? volume[0] : volume;
    setVolumeState(newVolume);
    handleVolume(newVolume);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="group flex scale-95 items-center gap-4 text-xl opacity-50 transition-all hover:scale-100 hover:gap-3 hover:opacity-100"
    >
      <RxSpeakerQuiet
        className="cursor-pointer"
        onClick={() => handleVolumeChange(0)}
      />
      <Root
        value={[volumeState]}
        max={1}
        min={0}
        step={0.01}
        onValueChange={handleVolumeChange}
        className="relative flex h-5 w-full touch-none items-center transition-all hover:cursor-col-resize"
      >
        <Track
          style={{ backgroundColor: addAlpha(textColor, 0.2) }}
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-white transition-all group-hover:h-2.5"
        >
          <Range
            style={{ backgroundColor: addAlpha(textColor, 0.8) }}
            className="absolute h-full bg-purple-500"
          />
        </Track>
        <Thumb className=" rounded-full bg-purple-900 opacity-0 transition-opacity group-hover:opacity-100" />
      </Root>
      <RxSpeakerLoud
        className="cursor-pointer"
        onClick={() => handleVolumeChange(1)}
      />
    </div>
  );
};

export default VolumePicker;
