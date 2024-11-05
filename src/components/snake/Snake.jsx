import React, { useEffect, useRef, useState } from 'react';
import { paintCell, generateFood, updateGame } from './snakeFunctions';
import Overlay from './Overlay';

const Snake = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [direction, setDirection] = useState("right");
  const [snake, setSnake] = useState([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }]);
  const [food, setFood] = useState(generateFood(375, 375, 15));
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const cellWidth = 15;
  const canvasWidth = 375;
  const canvasHeight = 375;

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
      ctx.fillStyle = '#7f6000'; // Updated background color
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

  // Handle keyboard input for snake direction and prevent default arrow key scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
      }
      
      if (e.key === "ArrowLeft" && direction !== "right") setDirection("left");
      if (e.key === "ArrowUp" && direction !== "down") setDirection("up");
      if (e.key === "ArrowRight" && direction !== "left") setDirection("right");
      if (e.key === "ArrowDown" && direction !== "up") setDirection("down");
    };

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

  // Start or restart the game (resets game values)
  const restartGame = () => {
    setScore(0);
    setDirection("right");
    setSnake([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }]);
    setFood(generateFood(canvasWidth, canvasHeight, cellWidth));
    setGameOver(false);
    setGameStarted(true); // Start the game immediately
    setFirstRender(false); // Hide the initial overlay
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* Conditional rendering for overlays */}
      {firstRender && !gameStarted && (
        <Overlay 
          message="Welcome to Snake Game!" 
          buttonText="Start Game" 
          onButtonClick={restartGame} // Starts the game without reloading
        />
      )}
      
      {gameOver && (
        <Overlay 
          message={`Your final score is: ${score}`} 
          buttonText="Play Again" 
          onButtonClick={restartGame} // Resets game values on "Play Again"
        />
      )}

      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="border border-gray-200"
      ></canvas>

      {/* Game Stats */}
      <div className="bg-gray-800 text-white p-4 mt-4 w-72 text-center rounded">
        <div>Your Score: {score}</div>
        <div>High Score: {highScore}</div>
        <button
          className="bg-gray-600 text-white p-2 mt-2 rounded"
          onClick={() => {
            localStorage.removeItem('highscore');
            setHighScore(0);
          }}
        >
          Reset High Score
        </button>
      </div>
    </div>
  );
};

export default Snake;
