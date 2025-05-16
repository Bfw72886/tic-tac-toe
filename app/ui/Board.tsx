import Symbol from "@/app/ui/Symbol";
import { useState } from "react";
import {
  getCurrentBoard,
  getCurrentPlayerName,
  playRound,
  getWinnerName,
} from "@/app/lib/tic-tac-toe";

export default function Board() {
  const [board, setBoard] = useState(getCurrentBoard);
  const [winnerName, setWinnerName] = useState(getWinnerName);

  const hasWinner = winnerName !== "";

  const onSymbolClick = (row: number, col: number) => {
    playRound(row, col);
    setBoard([...getCurrentBoard()]);

    setWinnerName(getWinnerName);
  };

  const isBoardActive = hasWinner
    ? "pointer-events-none"
    : "pointer-events-auto";

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
      {hasWinner ? (
        <p className="text-2xl">&#127881; {winnerName} has won!!! &#127881;</p>
      ) : (
        <p>It's {getCurrentPlayerName()}'s turn!</p>
      )}
      <div
        className={`h-80 w-80 grid gap-4 grid-rows-3 grid-cols-3 mt-4 bg-gray-500/10 ${isBoardActive}`}
      >
        {symbolList}
      </div>
    </div>
  );
}
