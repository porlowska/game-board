"use client";
import React, { useEffect, useState, createContext } from "react";
import Grid from "./grid/Grid";
import Keyboard from "./keyboard/Keyboard";
import words from "./words.js";

export default function Wordle() {
  const [isClient, setIsClient] = useState(false);
  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guess, setGuess] = useState(Array(6).fill(""));
  const [tries, setTries] = useState(0);

  // Determine if the game is won
  const won = tries > 0 && guess[tries - 1] === word;

  // Determine if the game is lost
  const lost = tries === 6;

  // Initialize the game
  const init = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuess(Array(6).fill(""));
    setTries(0);
  };

  // Handle key up events
  const handleKeyup = (e) => {
    if (won || lost) return;

    if (e.key === "Enter") {
      submitGuess();
    }

    if (e.key === "Backspace") {
      let newGuess = [...guess];
      newGuess[tries] = newGuess[tries].slice(0, -1); // delete last letter of the array
      setGuess(newGuess);
    }

    if (guess[tries].length < 5 && /^[A-z]$/.test(e.key)) {
      // pupulates letter by letter  guess[tries]
      let newGuess = [...guess];
      console.log(newGuess);
      newGuess[tries] = newGuess[tries] + e.key.toLowerCase();
      console.log(newGuess);
      setGuess(newGuess);
    }
  };

  // Submit the current guess
  const submitGuess = () => {
    if (words.includes(guess[tries])) {
      setTries(tries + 1);
    }
  };

  useEffect(() => {
    init();
    setIsClient(true);
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  });

  return isClient ? (
    <div className="flex flex-col bg-gray-100 h-screen w-screen items-center justify-center">
      <h1 className="text-6xl font-bold uppercase">Wordle</h1>
      <Grid word={word} guess={guess} tries={tries} />
      words: {word} <br></br>
      guess: {guess}
      <br></br>
      tries: {tries}
      {won && <h2>Won</h2>}
      {lost && <h2>Lost</h2>}
      {(won || lost) && <button onClick={init}>Play Again</button>}
      <Keyboard />
    </div>
  ) : (
    <div></div>
  );
}
