import { useState } from "react";
import Board from "./Board";

const TicTacToeGame = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const moves = history.map((_, move) => {
    let description = move > 0 ? `Back to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button
          className="text-sm hover:underline hover:text-[#e957c2]"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col md:flex-row justify-evenly">
      <div className="game-board flex flex-col items-center">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <button
          className="my-5 px-4 py-2 bg-[#7bf1cc] text-gray-900 rounded hover:bg-[#e957c2]"
          onClick={resetGame}
        >
          Start again
        </button>
      </div>

      <div className="ml-5">
        <ol className="border p-3 border-gray-200 rounded-lg text-2xl text-gray-700">
          Game History:
          {moves}
        </ol>
      </div>
    </div>
  );
};

export default TicTacToeGame;
