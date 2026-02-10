interface Props {
  emoji: string;
  label: string;
}

export default function PlayerAvatar({ emoji, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-16 h-16 flex items-center justify-center text-3xl bg-paper border-4 border-ink rounded-full shadow-comic">
        {emoji}
      </div>
      <span className="font-comic text-sm">{label}</span>
    </div>
  );
}
