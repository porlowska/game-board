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
      bgColour={['f7f308','e7bb18', 'e7bb18','fcef03']}
    />
  );
};

export default TicTacToe;



