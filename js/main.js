/*---------------------------- Constants -----------------------------*/

const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // first column
    [1, 4, 7], // second column
    [2, 5, 8], // third column
    [0, 4, 8], // top-left-to-bottom-right diagonal
    [2, 4, 6], // top-right-to-bottom-left diagonal
];


/*------------------------------ State -------------------------------*/
let board;      // string array of length nine
let turn = 'X'; // X goes first
let win;        // 'X', 'O', null or 'T'


/*-------------------- Cached element references ---------------------*/

// Array of div elements representing the game's nine grid squares
const squares = Array.from(document.querySelectorAll('#board div'));

// Message to user displayed as h2 heading, e.g. "It's X's turn."
const messages = document.querySelector('h2');


/*------------------------- Event listeners --------------------------*/

// User clicks a square to make a move
document.getElementById('board').addEventListener('click', handleTurn);

// Reset button pressed; reinitialise board
document.getElementById('reset-button').addEventListener('click', init);


/*---------------------------- Functions -----------------------------*/

function main() {
    init();
}

/**
 * Determines whether a player has won, the game is in progress, or a tie has
 * been reached.
 * 
 * @returns a string representing the winner ('X' or 'O') if a player has won,
 *          null if the game is incomplete, or 'T' if the game is a tie.
 */
function getWinner() {
    let winner = null;
    winningCombos.forEach((combo, _index) => {
        if (board[combo[0]] &&
            board[combo[0]] === board[combo[1]] &&
            board[combo[0]] === board[combo[2]])
            winner = board[combo[0]];
    });
    if (winner)
        return winner; // someone has won
    else if (board.includes(''))
        return null;   // board has empty square(s)
    else
        return 'T';    // tie if no winner and no empty squares
}

/**
 * Change turns from X to O or from O to X.
 * 
 * @returns 'X' if 'O' just played, 'O' if 'X' just played
 */
function nextTurn() {
    return turn === 'X' ? 'O' : 'X';
}

/**
 * Event handler for when user clicks a square. Changes turn, checks for a
 * winner and renders to HTML.
 */
function handleTurn(event) {
    let idx = squares.findIndex(function (square) {
        return square === event.target;
    });
    // Square must be empty and game must not be already won
    if (board[idx] == '' && getWinner() == null) {
        board[idx] = turn;
        turn = nextTurn();
        win = getWinner();
        render();
    }
}

/**
 * Initialise the 3x3 board as an array of empty strings, then render it to
 * HTML.
 */
function init() {
    turn = 'X';
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    render();
    messages.textContent = `It's X's turn.`;
}

/**
 * Iterate over the board array and insert a mark (X or O) into the correct div,
 * i.e. grid square.
 */
function render() {
    board.forEach(function (mark, index) {
        squares[index].textContent = mark;
    });
    var msg;
    if (win === 'T')
        msg = 'Tie.';
    else if (win)
        msg = `${win} wins the game.`;
    else
        msg = `It's ${turn}'s turn.`;
    messages.textContent = msg;
}

main();