"use client";
import React, { useEffect, useState} from "react";
import Grid from "./grid/Grid";
import Keyboard from "./keyboard/Keyboard";
import words from "./words.js";
import toast from 'react-hot-toast';
import Button from "../Button.jsx";

export default function WordlGame() {
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
    const handleKeyup = (key) => {
      if (won || lost) return;
  
      if (key === "Enter") {
        submitGuess();
      }else if (key === "Backspace") {
        let newGuess = [...guess];
        newGuess[tries] = newGuess[tries].slice(0, -1);
        setGuess(newGuess);
      } else if (guess[tries].length < 5 && /^[A-z]$/.test(key)) {
        let newGuess = [...guess];
        newGuess[tries] = newGuess[tries] + key.toLowerCase();
        setGuess(newGuess);
      }
    };



  // Submit the current guess
  const submitGuess = () => {
    const currentGuess = guess[tries];
    if (currentGuess.length < 5) {
      toast.error("Incomplete word.")
      return;
    }
    
    // Check if the guess exists in the word list
    if (!words.includes(currentGuess)) {
      toast.error("Word not found. Try again.");
      return;
    }
    setTries(tries + 1);
  };

  useEffect(() => {
    init();
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handlePhysicalKeyup = (e) => handleKeyup(e.key);
    window.addEventListener("keyup", handlePhysicalKeyup);
    return () => {
      window.removeEventListener("keyup", handlePhysicalKeyup);
    };
  }, [won, lost, guess, tries, handleKeyup]);

  useEffect(() => {
    if (won) {
      toast('Good Job!', { icon: '👏', duration: 8000 });
    } else if (lost) {
      toast(`Try again! Word: ${word}`, { icon: '😢', duration:9000 });
    }
  }, [won, lost, word, handleKeyup]);


  return isClient ? (
  
    <div className="flex flex-col items-center justify-center">
      
      <Grid word={word} guess={guess} tries={tries} />
      {(won || lost) && <Button text={"Play Again"} className={"bg-white text-gray-900 hover:bg-gray-50 ring-gray-300"} clickHandle={init}/>}
      <Keyboard onKeyPress={handleKeyup} />
    </div>

  ) : (
    <div></div>
  );
}