import { cellValue } from "@/app/types/cellValue";
import Symbol from "@/app/ui/Symbol";
import { useState } from "react";
import {
  getCurrentBoard,
  getCurrentPlayerName,
  playRound,
} from "@/app/lib/tic-tac-toe";

export default function Board() {
  const [board, setBoard] = useState(getCurrentBoard);

  const onSymbolClick = (row: number, col: number) => {
    playRound(row, col);
    setBoard([...getCurrentBoard()]);
  };

  const symbolList = board.map((row, rowIndex) =>
    row.map((element, colIndex) => {
      return (
        <Symbol
          value={element}
          row={rowIndex}
          col={colIndex}
          key={`${rowIndex}${colIndex}`}
          onClick={() => onSymbolClick(rowIndex, colIndex)}
        />
      );
    })
  );

  return (
    <div className="flex flex-col">
      <p>It's {getCurrentPlayerName()}'s turn!</p>
      <div className="h-80 w-80 grid gap-4 grid-rows-3 grid-cols-3 bg-gray-500/10">
        {symbolList}
      </div>
    </div>
  );
}
