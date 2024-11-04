"use client";
import WordleGame from "../../components/Wordle/Wordle";
import GameLayout from "../../components/GameLayout";

const Wordle = () => {
  return (
      <GameLayout
      title="Guess the Word!"
      description="Challenge Your Mind with Wordle!. Can You Guess the Secret Word in 6 Tries?"
      gameComponent={WordleGame}
      bgColour={['2a4365','4c51bf', '629ae4','8a45d4']}
    />
  )
      
};

export default Wordle;
