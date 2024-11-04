"use client";
import TicTacToeGame from "../../components/TicTacToe/TicTacToeGame";
import GameLayout from "../../components/GameLayout";
import "./index.module.css";

const TicTacToe = () => {
  return (
    <GameLayout
      title="Play Tic-Tac-Toe"
      description="The Classic Game of Strategy and Fun!. Challenge Yourself in a Timeless Game of X's and O's."
      gameComponent={TicTacToeGame}
      bgColour={['7bf1cc','e957c2', '88d4ae','8264a2']}
    />
  );
};

export default TicTacToe;



