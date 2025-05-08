import { playerToken } from "@/app/lib/definitions";
import player from "@/app/lib/player";

let currentPlayerToken: playerToken = 1;
let currentBoard: number[][];

const player1 = player(1, "Player One");
const player2 = player(2, "Player Two");

const initializeBoard = () => {
  currentBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
};
initializeBoard();

const getCurrentBoard = () => {
  return currentBoard;
};

const setMark = (row: number, col: number) => {
  currentBoard[row][col] = getPlayerToken();
};

const getPlayerToken = (): playerToken => {
  return currentPlayerToken;
};

const switchPlayer = (): void => {
  currentPlayerToken = currentPlayerToken === 1 ? 0 : 1;
};

const playRound = (row: number, col: number): void => {
  if (!(getCurrentBoard()[row][col] === 0)) {
    return;
  }
  setMark(row, col);
  switchPlayer();
};

const getWinnerToken = (): playerToken => {
  let winnerToken: playerToken = 0;

  function hasPlayerWon(token: playerToken) {
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

  if (hasPlayerWon(1)) {
    winnerToken = 1;
  } else if (hasPlayerWon(2)) {
    winnerToken = 2;
  }

  return winnerToken;
};

const resetGame = () => {
  currentPlayerToken = 1;
  initializeBoard();
};

export { getCurrentBoard, playRound, getWinnerToken, resetGame };
