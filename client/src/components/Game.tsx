import ComicCard from "./ui/ComicCard";
import SpeechBubble from "./ui/SpeechBubble";
import PlayerAvatar from "./ui/PlayerAvatar";
import ComicButton from "./ui/ComicButton";

export default function Game() {
  return (
    <div className="w-full max-w-xl px-6">
      <ComicCard>
       <div className="flex justify-center mb-8 -translate-x-6 scale-110">
          <SpeechBubble>Your move!</SpeechBubble>
        </div>

       <div className="flex justify-around mb-10 scale-110">
          <PlayerAvatar emoji="😼" label="Player X" />
          <PlayerAvatar emoji="🐼" label="Player O" />
        </div>

         <div className="start-btn-wrapper">
            <ComicButton className="w-[240px] mx-auto text-lg">
       Start Game </ComicButton>
        </div>

      </ComicCard>
    </div>
  );
}
