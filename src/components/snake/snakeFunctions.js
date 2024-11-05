// Paint a cell
export const paintCell = (ctx, x, y, color = "green", cellWidth = 15) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
  ctx.strokeStyle = "white";
  ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
};

// Check for collisions
export const checkCollision = (head, snake, canvasWidth, canvasHeight, cellWidth) => {
  // Check if the snake hits the wall
  if (
    head.x < 0 ||
    head.x >= canvasWidth / cellWidth ||
    head.y < 0 ||
    head.y >= canvasHeight / cellWidth
  ) {
    return true;
  }

  // Check if the snake hits itself
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) return true;
  }
  return false;
};

// Generate random food coordinates
export const generateFood = (canvasWidth, canvasHeight, cellWidth) => {
  return {
    x: Math.floor(Math.random() * (canvasWidth / cellWidth)),
    y: Math.floor(Math.random() * (canvasHeight / cellWidth)),
  };
};

// Update the game state (move the snake, handle food, etc.)
export const updateGame = (snake, direction, food, setFood, setScore, setGameOver, cellWidth, canvasWidth, canvasHeight) => {
  let head = { ...snake[0] };

  // Move snake head based on direction
  if (direction === "right") head.x += 1;
  else if (direction === "left") head.x -= 1;
  else if (direction === "up") head.y -= 1;
  else if (direction === "down") head.y += 1;

  // Collision detection
  if (checkCollision(head, snake, canvasWidth, canvasHeight, cellWidth)) {
    setGameOver(true);
    return snake;
  }

  // Eating food
  let newSnake;
  if (head.x === food.x && head.y === food.y) {
    newSnake = [head, ...snake];
    setScore((prev) => prev + 1);
    setFood(generateFood(canvasWidth, canvasHeight, cellWidth));
  } else {
    newSnake = [head, ...snake.slice(0, -1)]; // Move without adding a new cell
  }

  return newSnake;
};
