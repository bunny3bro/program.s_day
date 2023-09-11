const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const gridSize = 10;
let frameRate = 150;

let snakeColor = "green";
let foodColor = "red";
let backgroundColor = "#fff";
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = gridSize;
let dy = 0;
let score = 0;

const musicToggleButton = document.getElementById("music-toggle-button");
const backgroundAudio = document.getElementById("background-audio");
const difficultySelect = document.getElementById("difficulty");
const startButton = document.getElementById("start-button");

difficultySelect.addEventListener("change", () => {
  if (difficultySelect.value === "easy") {
    frameRate = 150; 
  } 
  else if (difficultySelect.value === "medium") {
    frameRate = 100; 
  } 
  else if (difficultySelect.value === "hard") {
    frameRate = 75; 
  }
});

musicToggleButton.addEventListener("click", toggleMusic);

    
    function toggleMusic() {
      if (backgroundAudio.paused) {
        backgroundAudio.play();
        musicToggleButton.textContent = "Turn Off Music";
      } else {
        backgroundAudio.pause();
        musicToggleButton.textContent = "Turn On Music";
      }
    }


startButton.addEventListener("click", () => {
  startGame();
});

function startGame() {
  resetGame();
  generateFood();
  gameLoop();
}

function gameLoop() {
  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();
  checkCollision();
  setTimeout(gameLoop, frameRate);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.key;
  switch (key) {
    case "ArrowUp":
    case "w":
      if (dy !== gridSize) {
        dx = 0;
        dy = -gridSize;
      }
      break;
    case "ArrowDown":
    case "s":
      if (dy !== -gridSize) {
        dx = 0;
        dy = gridSize;
      }
      break;
    case "ArrowLeft":
    case "a":
      if (dx !== gridSize) {
        dx = -gridSize;
        dy = 0;
      }
      break;
    case "ArrowRight":
    case "d":
      if (dx !== -gridSize) {
        dx = gridSize;
        dy = 0;
      }
      break;
  }
}

function clearCanvas() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    generateFood();
  } 
  else {
    snake.pop();
  }
}

function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? snakeColor : "lightgreen";
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

function generateFood() {
  const maxX = canvas.width / gridSize;
  const maxY = canvas.height / gridSize;
  food = {
    x: Math.floor(Math.random() * maxX) * gridSize,
    y: Math.floor(Math.random() * maxY) * gridSize,
  };
}

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.beginPath();
  ctx.arc(
    food.x + gridSize / 2,
    food.y + gridSize / 2,
    gridSize / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height
  ) 
{
    gameOver();
}

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }
}

function gameOver() {
  alert("Game Over! Your Score: " + score);
  resetGame();
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = gridSize;
  dy = 0;
  score = 0;
}