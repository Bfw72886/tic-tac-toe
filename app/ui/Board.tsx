import Symbol from "@/app/ui/Symbol";
import { useEffect, useState } from "react";
import {
  getCurrentBoard,
  getCurrentPlayerName,
  playRound,
  getWinnerName,
  setPlayerName,
  getPlayerName,
  resetGame,
  isDraw,
} from "@/app/lib/tic-tac-toe";
import { cellValue } from "@/app/types/cellValue";

export default function Board() {
  const [board, setBoard] = useState(getCurrentBoard);
  const [winnerName, setWinnerName] = useState(getWinnerName);
  const [nameX, setNameX] = useState(() => getPlayerName(cellValue.X));
  const [nameO, setNameO] = useState(() => getPlayerName(cellValue.O));
  const [settingsShown, setSettingsShown] = useState(false);
  const [gameStatus, setGameStatus] = useState<"ongoing" | "win" | "draw">(
    "ongoing"
  );

  useEffect(() => {
    const currentWinner = getWinnerName();
    setWinnerName(currentWinner);
    if (currentWinner !== "") {
      setGameStatus("win");
    } else if (isDraw()) {
      setGameStatus("draw");
    } else {
      setGameStatus("ongoing");
    }
  }, [board]);

  const onSymbolClick = (row: number, col: number) => {
    playRound(row, col);
    setBoard([...getCurrentBoard()]);
  };

  const onInputName = (token: cellValue.X | cellValue.O, name: string) => {
    setPlayerName(token, name);
    if (token === cellValue.X) {
      setNameX(getPlayerName(cellValue.X));
    } else {
      setNameO(getPlayerName(cellValue.O));
    }
  };

  const isBoardActive =
    gameStatus === "ongoing" ? "pointer-events-auto" : "pointer-events-none";

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

  const onResetButtonClick = () => {
    resetGame();
    setBoard(getCurrentBoard());
  };

  const toggleSettings = () => {
    setSettingsShown((settingsShown) => !settingsShown);
  };

  return (
    <div className="flex flex-col">
      {/* header (winstatus & turn) */}
      {gameStatus === "win" ? (
        <p className="text-2xl">&#127881; {winnerName} has won!!! &#127881;</p>
      ) : gameStatus === "draw" ? (
        <p className="text-2xl">&#129309; It&apos;s a draw! &#129309;</p>
      ) : (
        <p>It&apos;s {getCurrentPlayerName()}&apos;s turn!</p>
      )}
      {/* board */}
      <div
        className={`h-80 w-80 grid gap-4 grid-rows-3 grid-cols-3 mt-4 bg-gray-500/10 ${isBoardActive}`}
      >
        {symbolList}
      </div>
      {/* settings (playername & reset) */}
      <button
        type="button"
        onClick={toggleSettings}
        className="border border-gray-500 mt-4"
      >
        {settingsShown ? "Close Settings" : "Show Settings"}
      </button>
      {settingsShown && (
        <>
          <label htmlFor="playerXName" className="mt-4">
            Playername of X:
          </label>
          <input
            id="playerXName"
            type="text"
            onChange={(e) => onInputName(cellValue.X, e.target.value)}
            value={nameX}
            className="border border-gray-500"
          />
          <label htmlFor="playerOName" className="mt-4">
            Playername of O:
          </label>
          <input
            id="playerOName"
            type="text"
            onChange={(e) => onInputName(cellValue.O, e.target.value)}
            value={nameO}
            className="border border-gray-500"
          />
          <button
            type="button"
            onClick={onResetButtonClick}
            className="mt-4 border border-gray-500"
          >
            Reset board
          </button>
        </>
      )}
    </div>
  );
}
