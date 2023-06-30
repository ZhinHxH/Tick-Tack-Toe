import { WINNER_COMBS } from "../constants.js";

export const checkWinner = (boardToCheck) => {
  // Revisamos todas combinaciones ganadoras
  //Para ver si x u o gano
  for (const combo of WINNER_COMBS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}
