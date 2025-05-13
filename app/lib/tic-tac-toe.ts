import player from "@/app/lib/player";
import { cellValue } from "@/app/types/cellValue";

let currentPlayerToken: cellValue = cellValue.X;
let currentBoard: cellValue[][];

const player1 = player(cellValue.X, "Player One");
const player2 = player(cellValue.O, "Player Two");

const initializeBoard = () => {
  currentBoard = [
    [cellValue.NONE, cellValue.NONE, cellValue.NONE],
    [cellValue.NONE, cellValue.NONE, cellValue.NONE],
    [cellValue.NONE, cellValue.NONE, cellValue.NONE],
  ];
};
initializeBoard();

const getCurrentBoard = () => {
  return currentBoard;
};

const setMark = (row: number, col: number) => {
  currentBoard[row][col] = getPlayerToken();
};

const getPlayerToken = (): cellValue => {
  return currentPlayerToken;
};

const switchPlayer = (): void => {
  currentPlayerToken =
    currentPlayerToken === cellValue.X ? cellValue.O : cellValue.X;
};

const playRound = (row: number, col: number): void => {
  if (!(getCurrentBoard()[row][col] === cellValue.NONE)) {
    return;
  }
  setMark(row, col);
  switchPlayer();
};

const getWinnerName = (): string => {
  let winner: string = "";

  function hasPlayerWon(token: cellValue) {
    const board = getCurrentBoard();
    for (let i = 0; i < 3; i++) {
      // check rows
      if (
        board[i][0] === token &&
        board[i][1] === token &&
        board[i][2] === token
      ) {
        return true;
      }
      //check cols
      if (
        board[0][i] === token &&
        board[1][i] === token &&
        board[2][i] === token
      ) {
        return true;
      }
    }

    // check diagonals
    if (
      (board[0][0] === token &&
        board[1][1] === token &&
        board[2][2] === token) ||
      (board[0][2] === token && board[1][1] === token && board[2][0] === token)
    ) {
      return true;
    }

    return false;
  }

  if (hasPlayerWon(player1.playerToken)) {
    winner = player1.playerName;
  } else if (hasPlayerWon(player2.playerToken)) {
    winner = player2.playerName;
  }

  return winner;
};

const resetGame = () => {
  currentPlayerToken = cellValue.X;
  initializeBoard();
};

export { getCurrentBoard, playRound, getWinnerName, resetGame };
