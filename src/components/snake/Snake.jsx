import React, { useEffect, useRef, useState } from 'react';
import { paintCell, generateFood, updateGame } from './snakeFunctions';
import Button from '../Button';
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

  return (
    <div className="flex flex-col items-center">
      <div className='relative'>
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

      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="border border-gray-200"
      ></canvas>
      </div>

      {/* Game Stats */}
      <div className="bg-white shadow sm:rounded-lg mt-4 w-[350px]">
        <div className="px-4 py-5 sm:p-6 text-center">
          <h3 className="text-base font-semibold text-gray-900">Game Stats</h3>
          <div className='flex items-center mt-1 gap-1 justify-evenly'>
          <div className="max-w-xl text-sm text-gray-500">
            <p>Your Score: <span className="font-bold text-gray-900">{score}</span></p>
            <p>High Score: <span className="font-bold text-gray-900">{highScore}</span></p>
          </div>
            <Button
              text="Reset High Score"
              className="bg-green-800 text-white hover:bg-green-600 ring-green-800 pointer-events-auto"
              clickHandle={() => {
                localStorage.removeItem('highscore');
                setHighScore(0);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snake;
