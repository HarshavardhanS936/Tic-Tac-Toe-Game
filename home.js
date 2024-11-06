let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameActive = true;
let paused = false;
let scoreX = 0;
let scoreO = 0;
let seconds = 0;
let timerInterval;
function startTimer() {
  timerInterval = setInterval(() => {
    if (!paused) {
      seconds++;
      updateTimerDisplay();
    }
  }, 1000);
}
function updateTimerDisplay() {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  document.getElementById('timer').textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
function resetTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  updateTimerDisplay();
  startTimer();
}
function makeMove(cell, index) {
  if (!paused && gameBoard[index] === null && gameActive) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'selected-x' : 'selected-o');
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}
function updateStatus() {
  const status = document.getElementById('status');
  if (gameActive) {
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      showWinnerMessage(gameBoard[a]);
      updateScore(gameBoard[a]);
      return;
    }
  }
  if (!gameBoard.includes(null)) {
    gameActive = false;
    showMessageBox("It's a draw!");
  }
}
function updateScore(winner) {
  if (winner === 'X') {
    scoreX++;
    document.getElementById('score-x').textContent = scoreX;
  } else {
    scoreO++;
    document.getElementById('score-o').textContent = scoreO;
  }
}
function showWinnerMessage(winner) {
  showMessageBox(`Player ${winner} wins!`);
}
function showMessageBox(message) {
  const messageBox = document.getElementById('message-box');
  document.getElementById('message-text').textContent = message;
  messageBox.style.display = 'block';
  clearInterval(timerInterval);
}
function closeMessageBox() {
  document.getElementById('message-box').style.display = 'none';
  resetGame();
}
function resetGame() {
  gameBoard = Array(9).fill(null);
  gameActive = true;
  currentPlayer = 'X';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('selected-x', 'selected-o');
  });
  updateStatus();
  resetTimer();
}
function pauseGame() {
  paused = !paused;
  const pauseBtn = document.getElementById('pause-btn');
  pauseBtn.textContent = paused ? '▶️' : '⏸️';
  document.getElementById('status').textContent = paused ? 'Game Paused' : `Player ${currentPlayer}'s turn`;
}
resetTimer();
updateStatus();
