interface CellProps {
  value: "X" | "O" | null;
  onClick: () => void;
}

export default function Cell({ value, onClick }: CellProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-24 h-24
        border-2 border-gray-300
        flex items-center justify-center
        text-5xl font-comic
        hover:bg-gray-100
        transition
      "
    >
      {value}
    </button>
  );
}
