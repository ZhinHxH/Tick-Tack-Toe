import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/square";
import { TURNS } from "./constants";

import { checkWinner, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage : TURNS.x;
  });

  const [win, setWin] = useState(null);
  //null que no hay ganador y false en winner

  //Seteamos los valores de los estados a los valores inciales
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWin(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updateBorard = (index) => {
    //No actualizamos posición si ya tiene algo
    if (board[index] || win) {
      return;
    }
    //Acutalizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //Cambiar el turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
    //Guardar aquí partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
    //Revisar si hay un ganador
    const newWin = checkWinner(newBoard);
    if (newWin) {
      confetti();
      setWin(newWin);
    } else if (checkEndGame(newBoard)) {
      setWin(false); //empate
    }
  };

  useEffect(() => {
    //Como minimo se jecuta una vez
    console.log('Usando useEffect');
  }, [win]);

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBorard={updateBorard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      <WinnerModal resetGame={resetGame} win={win}></WinnerModal>
    </main>
  );
}

export default App;
