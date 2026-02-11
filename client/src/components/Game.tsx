import ComicCard from "./ui/ComicCard";
import SpeechBubble from "./ui/SpeechBubble";
import ComicButton from "./ui/ComicButton";
import CatCharacter from "./ui/CatCharacter";
import RatCharacter from "./ui/RatCharacter";

import { useState } from "react";

export default function Game() {
  const [playerXState, setPlayerXState] = useState<"normal" | "win" | "loss">("normal");
  const [playerOState, setPlayerOState] = useState<"normal" | "win" | "loss">("normal");

  const handleStart = () => {
    // Example demo toggle
    setPlayerXState("win");
    setPlayerOState("loss");
  };

  return (
    <div className="w-full max-w-xl px-6">
      <ComicCard>

        {/* Speech Bubble */}
        <div className="flex justify-center mb-8 -translate-x-6 scale-110">
          <SpeechBubble>Your move!</SpeechBubble>
        </div>

        {/* Characters */}
       <div className="
  flex flex-col sm:flex-row
  items-center
  justify-center
  gap-8 sm:gap-12
  mb-8
">

           
         <div className="flex flex-col items-center gap-4">
         <CatCharacter expression={playerXState} />
         <p className="font-comic text-lg tracking-wide">Player X</p>
         </div>

        <div className="flex flex-col items-center gap-4">
        <RatCharacter expression={playerOState} />
        <p className="font-comic text-lg tracking-wide">Player O</p>
        </div>
        </div>

        {/* Button */}
        <div className="start-btn-wrapper">
          <ComicButton 
            onClick={handleStart}
            className="w-[240px] mx-auto text-lg"
          >
            Start Game
          </ComicButton>
        </div>

      </ComicCard>
    </div>
  );
}

