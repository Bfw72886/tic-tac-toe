import Symbol from "@/app/ui/Symbol";
import { useState } from "react";
import {
  getCurrentBoard,
  getCurrentPlayerName,
  playRound,
  getWinnerName,
  setPlayerName,
  getPlayerName,
} from "@/app/lib/tic-tac-toe";
import { cellValue } from "@/app/types/cellValue";

export default function Board() {
  const [board, setBoard] = useState(getCurrentBoard);
  const [winnerName, setWinnerName] = useState(getWinnerName);
  const [nameX, setNameX] = useState(() => getPlayerName(cellValue.X));
  const [nameO, setNameO] = useState(() => getPlayerName(cellValue.O));

  const hasWinner = winnerName !== "";

  const onSymbolClick = (row: number, col: number) => {
    playRound(row, col);
    setBoard([...getCurrentBoard()]);

    setWinnerName(getWinnerName);
  };

  const onInputName = (token: cellValue.X | cellValue.O, name: string) => {
    setPlayerName(token, name);
    token === cellValue.X
      ? setNameX(getPlayerName(cellValue.X))
      : setNameO(getPlayerName(cellValue.O));
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
      <label htmlFor="playerXName" className="mt-4">
        Playername of X:
      </label>
      <input
        id="playerXName"
        type="text"
        onChange={(e) => onInputName(cellValue.X, e.target.value)}
        value={nameX}
      />
      <label htmlFor="playerOName" className="mt-4">
        Playername of O:
      </label>
      <input
        id="playerOName"
        type="text"
        onChange={(e) => onInputName(cellValue.O, e.target.value)}
        value={nameO}
      />
    </div>
  );
}
