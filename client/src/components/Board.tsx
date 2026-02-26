import Cell from "./Cell";

interface BoardProps {
  board: ("X" | "O" | null)[];
  onMove: (index: number) => void;
}

export default function Board({ board, onMove }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-[360px] aspect-square">
      {board.map((cell, i) => (
        <Cell
          key={i}
          value={cell}
          onClick={() => onMove(i)}
        />
      ))}
    </div>
  );
}