const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

let player = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'T';
};

const handleClick = (event) => {
    const index = event.target.getAttribute('data-index');

    if (board[index] || !isGameActive) return;

    board[index] = player;
    event.target.textContent = player;

    const winner = checkWinner();
    if (winner) {
        isGameActive = false;
        setTimeout(() => {
            alert(winner === 'T' ? 'Draw! Play again?' : `The letter ${winner} Wins! Play again?`);
        }, 100);
    } else {
        player = player === 'X' ? 'O' : 'X';
    }
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    player = 'X';
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);