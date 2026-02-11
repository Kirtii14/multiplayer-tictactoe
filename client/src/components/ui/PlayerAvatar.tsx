interface Props {
  emoji: string;
  label: string;
}

export default function PlayerAvatar({ emoji, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      
      {/* Circle Container */}
      <div className="
        w-40 h-40 
        flex items-center justify-center 
        border-4 border-ink 
        rounded-full 
        bg-paper 
        shadow-comic 
        comic-wobble 
        transition-transform duration-200 
        hover:-rotate-1
      ">
        <span className="text-7xl leading-none">
          {emoji}
        </span>
      </div>

      {/* Label */}
      <p className="text-lg font-semibold tracking-wide">
        {label}
      </p>

    </div>
  );
}

