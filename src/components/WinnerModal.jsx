import { Square } from "./square";

export function WinnerModal({win, resetGame}) {
  if (win === null) return null;

  const winnerText = win === false ? 'Empate' : 'Ganó';

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">
        {win && <Square>{win}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
