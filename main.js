const cells = document.querySelectorAll('.cell');
const turn = document.querySelector('#turn');
const restartBtn = document.querySelector('#restart-btn');
const displayWinner = document.querySelector('.display-winner');
const winner = document.querySelector('#winner');
const winConditions = [
    [0,1,2], // fila
    [3,4,5], // fila
    [6,7,8], // fila
    [0,3,6], // columna
    [1,4,7], // columna
    [2,5,8], // columna
    [0,4,8], // diagonal
    [2,4,6]  // diagonal
];

let options = ['','','','','','','','',''];
let currentPlayer = 'X';
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    turn.textContent = `${currentPlayer}`;
    turn.style.color = '#F2B138';
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');

    if(options[cellIndex] != '' || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (currentPlayer === 'X') {
        cell.style.color = '#F2B138';
    } else if (currentPlayer === 'O') {
        cell.style.color = '#34C3BE';
    }
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    turn.textContent = `${currentPlayer}`;
    if (turn.textContent === 'X') {
        turn.style.color = '#F2B138';
    }else if (turn.textContent === 'O') {
        turn.style.color = '#34C3BE';
    }
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == '' || cellB == '' || cellC == '') {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayWinner.style.display = 'block';
        winner.textContent = `¡${currentPlayer} gana!`;
        running = false;
        if (currentPlayer === 'X') {
            winner.style.color = '#F2B138';
        } else if (currentPlayer == 'O') {
            winner.style.color = '#34C3BE';
        }
    } else if (!options.includes('')) {
        displayWinner.style.display = 'block';
        winner.textContent = '¡Empate!';
        winner.style.color = '#fff';
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = 'X';
    options = ['','','','','','','','',''];
    turn.textContent = `${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
    displayWinner.style.display = 'none';
    running = true;
}