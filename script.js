const board = document.getElementById('gameBoard');
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

// משתנים גלובליים
let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""]; // ייצוג הלוח: ריק, X או O
let timer;
let timeLeft = MAX_TIME;


function startTimer() {
    // איפוס הטיימר הקודם אם קיים
    clearInterval(timer); 
    timeLeft = MAX_TIME;
    timeLeftDisplay.textContent = timeLeft;
    
    // הפעלת הטיימר
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        // אם הזמן נגמר
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameActive = false;
            
            // השחקן שהיה תורו הפסיד
            statusMessage.innerHTML = `השחקן ${currentPlayer} הפסדת! לא ביצעת מהלך בזמן.`;
            board.classList.add('game-over');
            
            // מפעיל משחק חדש אוטומטית אחרי 3 שניות
            setTimeout(restartGame, 3000); 
        }
    }, 1000); // כל שנייה
}


/**
 * #2: בדיקת סיום המשחק (ניצחון או תיקו)
 */
function checkWin() {
    let roundWon = false;
    let winningCells = [];

    // עובר על כל תנאי הניצחון
    for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
        const winCondition = WINNING_CONDITIONS[i];
        // בדיקת התאים בתנאי הנוכחי
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        // אם אחד התאים ריק, ממשיך
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // אם שלושת התאים זהים - יש ניצחון
        if (a === b && a === c) {
            roundWon = true;
            winningCells = winCondition;
            break;
        }
    }

    if (roundWon) {
        // 4. אומר מי ניצח
        gameActive = false;
        clearInterval(timer); // עוצר את הטיימר
        statusMessage.innerHTML = `ניצחון של שחקן ${currentPlayer}!`;
        board.classList.add('game-over');
        
        // מדגיש את התאים המנצחים
        winningCells.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
        return;
    }

    // בדיקת תיקו (אם אין תאים ריקים)
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        // 4. אומר שהיה תיקו
        gameActive = false;
        clearInterval(timer); // עוצר את הטיימר
        statusMessage.textContent = 'תיקו! הלוח מלא ללא מנצח.';
        board.classList.add('game-over');
        return;
    }

    // אם לא ניצחון ולא תיקו, מעביר תור
    handlePlayerChange();
}


/**
 * #3: החלפת שחקן
 */
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.innerHTML = `תור השחקן: ${currentPlayer}`;
    startTimer(); // מתחיל את הטיימר מחדש למהלך של השחקן הבא
}


/**
 * #4: טיפול בלחיצה על תא בודד
 */
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // אם התא כבר מסומן או שהמשחק הסתיים - לא עושים כלום
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // 1. עדכון לוח המשחק (X או O)
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.setAttribute('data-content', currentPlayer);
    clickedCell.classList.add(currentPlayer);
    
    // 2. בדיקת ניצחון/תיקו והחלפת תור
    checkWin();
}


/**
 * #5: איפוס המשחק (כפתור "משחק חדש")
 */
function restartGame() {
    // איפוס משתנים
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    
    // איפוס מראה הלוח והתאים
    statusMessage.innerHTML = `תור השחקן: X`;
    board.classList.remove('game-over');
    
    cells.forEach(cell => {
        cell.setAttribute('data-content', '');
        cell.classList.remove('X');
        cell.classList.remove('O');
        cell.classList.remove('winning-cell');
    });
    
    // התחלת הטיימר לתור הראשון
    startTimer(); 
}


// #6: אתחול והוספת מאזינים (EventListeners)

// מאזין לכל תא בלוח
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// מאזין לכפתור "משחק חדש"
restartButton.addEventListener('click', restartGame);

// התחלת המשחק (טיימר לתור הראשון)
restartGame();