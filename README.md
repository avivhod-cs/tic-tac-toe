Tic-Tac-Toe with Turn Timer:
A modern, interactive Tic-Tac-Toe game built with vanilla (basic) HTML, CSS, and JavaScript.
Featuring a 30-second turn timer, visual win highlighting, and automatic game reset.
The game supports RTL (Hebrew) layout and is designed with clean UI/UX and clear game-state logic.

Overview:
This project implements a classic Tic-Tac-Toe game with an added constraint:
each player has a limited amount of time to make a move. If the timer expires, the current player automatically loses.
The application is fully client-side and requires no external dependencies or build steps.

file:///C:/Users/UserY/Desktop/CS/y3/webdev/tic-tac-toe/index.html

Features:
1. Game rules are presented at the top of the page.
1. 30-second timer per turn with automatic loss on timeout.
2. Win detection for rows, columns, and diagonals.
3. Visual highlighting of winning cells.
4. Draw detection when the board is full and there is no winner (tie situation).
5. Manual restart button and automatic loss-restart after timeout.
6. Responsive, modern UI design.

Project Structure:
├── index.html   # Application entry point and layout
├── style.css    # Styling, animations, RTL support
└── script.js    # Game logic, timer handling, state management
└── README.md


Game Logic: (the full game logic is implemented in script.js)
The game board is represented as an array of nine elements.
Each click updates the board state and UI.

After every move:
1. Win conditions are evaluated
2. Draw conditions are checked
3. The active player is switched
4. The move timer is reset
5. If the timer reaches zero:
    - The current player loses
    - The game ends and notates who lost.
    - A new game starts automatically after a short delay


UI and Styling: (all styles are defined in style.css)
CSS Grid is used to create a responsive 3×3 board.
Clear visual distinction between players -> shape and color.
Smooth hover effects on not filled cells.
Animated highlight for winning combinations.
RTL layout using direction for hebrew site.


Technologies:
HTML5
CSS3
JavaScript (ES6)
Google Fonts (Heebo)
Application entry point: index.html


Possible Enhancements:
Sound effects and accessibility improvements
Language toggle (Hebrew / English)
Mobile gesture support
Single-player mode with AI


License:
This project is open-source and free to use for educational and personal purposes.
