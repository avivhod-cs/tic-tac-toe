const board = document.getElementById('gameBoard');
console.log(board);
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restartButton');
const timeLeftDisplay = document.getElementById('time-left');

const MAX_TIME = 30; 
const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""]; 
let timer;
let timeLeft = MAX_TIME;


function startTimer() {
    clearInterval(timer); 
    timeLeft = MAX_TIME;
    timeLeftDisplay.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            gameActive = false;
            
            statusMessage.innerHTML = `השחקן ${currentPlayer} הפסדת! לא ביצעת מהלך בזמן.`;
            board.classList.add('game-over');
            
            setTimeout(restartGame, 3000); 
        }
    }, 1000); 
}


function checkWin() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
        const winCondition = WINNING_CONDITIONS[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && a === c) {
            roundWon = true;
            winningCells = winCondition;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        clearInterval(timer);
        statusMessage.innerHTML = `ניצחון של שחקן ${currentPlayer}!`;
        board.classList.add('game-over');
        
        winningCells.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        gameActive = false;
        clearInterval(timer); 
        statusMessage.textContent = 'תיקו! הלוח מלא ללא מנצח.';
        board.classList.add('game-over');
        return;
    }

    handlePlayerChange();
}


function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.innerHTML = `תור השחקן: ${currentPlayer}`;
    startTimer(); 
}


function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.setAttribute('data-content', currentPlayer);
    clickedCell.classList.add(currentPlayer);
    
    checkWin();
}



function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    
    statusMessage.innerHTML = `תור השחקן: X`;
    board.classList.remove('game-over');
    
    cells.forEach(cell => {
        cell.setAttribute('data-content', '');
        cell.classList.remove('X');
        cell.classList.remove('O');
        cell.classList.remove('winning-cell');
    });
    
    startTimer(); 
}


cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

restartGame();
