const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitBtn = document.getElementById('submit');
const boardDiv = document.querySelector('.board');
const messageDiv = document.querySelector('.message');
const h1 = document.querySelector('h1');
const container = document.querySelector('.container');

let board = Array(9).fill('');
let players = [];
let current = 0; // 0 for Player 1, 1 for Player 2
let gameActive = false;
let winner = null;

function startGame() {
  // Get player names
  const p1 = player1Input.value.trim() || "Player 1";
  const p2 = player2Input.value.trim() || "Player 2";
  players = [p1, p2];
  current = 0;
  board = Array(9).fill('');
  winner = null;
  gameActive = true;
  // Remove input section, show board/h1/message
  document.querySelector('.input-section').style.display = 'none';
  h1.style.display = 'block';
  boardDiv.style.display = 'grid';
  messageDiv.textContent = `${players[current]}, you're up`;
  // Draw board
  drawBoard();
}
submitBtn.addEventListener('click', startGame);

function drawBoard() {
  boardDiv.innerHTML = '';
  boardDiv.style.display = 'grid';
  boardDiv.style.gridTemplateColumns = 'repeat(3, 80px)';
  boardDiv.style.gridTemplateRows = 'repeat(3, 80px)';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = (i+1).toString();
    cell.textContent = board[i];
    cell.addEventListener('click', () => handleMove(i));
    boardDiv.appendChild(cell);
  }
}

function handleMove(idx) {
  if (!gameActive) return;
  if (board[idx] !== '') return;
  board[idx] = current === 0 ? 'x' : 'o';
  drawBoard();
  // Check for win
  const win = checkWin();
  if (win) {
    winner = players[current];
    messageDiv.textContent = `${winner}, congratulations you won!`;
    highlightWin(win);
    gameActive = false;
    return;
  }
  // Check for tie
  if (board.every(cell => cell !== '')) {
    messageDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  current = 1-current;
  messageDiv.textContent = `${players[current]}, you're up`;
}

function checkWin() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],   // rows
    [0,3,6], [1,4,7], [2,5,8],   // columns
    [0,4,8], [2,4,6]             // diagonals
  ];
  for (let line of wins) {
    const [a,b,c] = line;
    if (
      board[a] && 
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return line;
    }
  }
  return null;
}

function highlightWin(line) {
  for (let i of line) {
    boardDiv.children[i].classList.add('win');
  }
}
