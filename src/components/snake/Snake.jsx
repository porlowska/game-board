import React, { useEffect, useRef, useState } from 'react';
import { handleKeyDown, paintCell, generateFood, updateGame } from './snakeFunctions';
import Overlay from './Overlay';
import Stats from './Stats';
import GameArrows from './GameArrows';

const Snake = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [direction, setDirection] = useState("right");
  const [snake, setSnake] = useState([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }]);
  const [food, setFood] = useState(generateFood(345, 345, 15));
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const cellWidth = 15;
  const canvasWidth = 345;
  const canvasHeight = 345;

  // Load high score from localStorage on initial render
  useEffect(() => {
    const storedHighScore = localStorage.getItem('highscore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  // Start the game loop only when the gameStarted state is true
  useEffect(() => {
    if (!gameStarted) return;

    const ctx = canvasRef.current.getContext('2d');

    const gameLoop = setInterval(() => {
      // Clear the canvas
      ctx.fillStyle = '#7f6000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw the snake and food
      snake.forEach((part) => paintCell(ctx, part.x, part.y));
      paintCell(ctx, food.x, food.y, 'red');

      // Update the game state
      const newSnake = updateGame(
        snake,
        direction,
        food,
        setFood,
        setScore,
        setGameOver,
        cellWidth,
        canvasWidth,
        canvasHeight
      );

      setSnake(newSnake);
    }, 200);

    return () => clearInterval(gameLoop);
  }, [gameStarted, snake, direction, food]);

  // Handle direction change from both keyboard and virtual arrows
const handleKeyDown = (e, customDirection = null) => {
  const newDirection = customDirection || e.key.replace("Arrow", "").toLowerCase();

  if (newDirection === "left" && direction !== "right") setDirection("left");
  if (newDirection === "up" && direction !== "down") setDirection("up");
  if (newDirection === "right" && direction !== "left") setDirection("right");
  if (newDirection === "down" && direction !== "up") setDirection("down");

  if (!customDirection) e.preventDefault();
};

  // Add event listener for keyboard input
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // Update high score when the game is over
  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highscore', score);
      }
    }
  }, [gameOver, score, highScore]);

  // Start or restart the game
  const restartGame = () => {
    setScore(0);
    setDirection("right");
    setSnake([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }]);
    setFood(generateFood(canvasWidth, canvasHeight, cellWidth));
    setGameOver(false);
    setGameStarted(true); 
    setFirstRender(false); 
  };

  const resetHighScore = () => {
    localStorage.removeItem('highscore');
    setHighScore(0);
  };

  return (
    <div className="flex flex-col items-center">

      {/* Game Stats */}
      <Stats 
        score={score} 
        highScore={highScore} 
        resetHighScore={resetHighScore}
      />


      <div className='relative mt-3 md:mt-6'>
      {firstRender && !gameStarted && (
        <Overlay 
          message="Welcome to Snake Game!" 
          buttonText="Start Game" 
          onButtonClick={restartGame}
        />
      )}
      
      {gameOver && (
        <Overlay 
          message={`Your final score is: ${score}`} 
          buttonText="Play Again" 
          onButtonClick={restartGame}
        />
      )}
       {/* Game */}
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="border border-gray-200"
      ></canvas>

      {/* Game Arrows */}
      <GameArrows handleDirectionChange={(direction) => handleKeyDown(null, direction)} />
      </div>
    </div>
  );
};

export default Snake;
