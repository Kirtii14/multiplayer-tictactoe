interface CellProps {
  value: "X" | "O" | null;
  onClick: () => void;
}

export default function Cell({ value, onClick }: CellProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        aspect-square
        border-2 border-gray-300
        flex items-center justify-center
        text-3xl sm:text-5xl
        font-comic
        hover:bg-gray-100
        transition
      "
    >
      {value}
    </button>
  );
}