
//**** Memory Matching ****/
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('memoryMatchingBoard');
    const resetButton = document.getElementById('resetButtonMemoryMatching');
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];

    function createBoard() {
        cards = [...cardValues, ...cardValues].sort(() => 0.5 - Math.random());
        gameBoard.innerHTML = '';
        cards.forEach((value, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = index;
            card.dataset.value = value;
            gameBoard.appendChild(card);
            card.addEventListener('click', flipCard);
        });
    }

    function flipCard(event) {
        const card = event.target;
        const index = card.dataset.index;
        const value = card.dataset.value;

        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.textContent = value;
            card.classList.add('flipped');
            flippedCards.push({ index, value });

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 300);
            }
        }
    }

    function checkMatch() {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.value && secondCard.value) {
            if (firstCard.value === secondCard.value) {
                matchedCards.push(firstCard.index, secondCard.index);
            } else {
                document.querySelector(`.card[data-index='${firstCard.index}']`).classList.remove('flipped');
                document.querySelector(`.card[data-index='${secondCard.index}']`).classList.remove('flipped');
                document.querySelector(`.card[data-index='${firstCard.index}']`).textContent = '';
                document.querySelector(`.card[data-index='${secondCard.index}']`).textContent = '';
            }
        }
        flippedCards = [];

        if (matchedCards.length == 16) {
            $('#messageMemoryMatching').text("You Won!");
        }
    }

    function resetGame() {
        matchedCards = [];
        flippedCards = [];
        createBoard();
        $('#messageMemoryMatching').text("");
    }

    createBoard();
    resetButton.addEventListener('click', resetGame);
});






//**** Rock Paper Scissors ****/
const choicesDisplay = document.querySelector('#rockPaperScissorsBoard')
const userChoiceDisplay = document.querySelector('#userChoiceDisplay')
const computerChoiceDisplay = document.querySelector('#computerChoiceDisplay')
const resultDisplay = document.querySelector('#messageRockPaperScissors')
const choices = ['rock', 'paper', 'scissors']


function getResults(userChoice){
    const computerChoice = choices[Math.floor(Math.random() * choices.length)]

    // Clear previous computer choice display
    resetGame();

    // Create and append new image for computer choice
    const userChoiceImg = document.createElement('img');
    userChoiceImg.setAttribute('src', "/img/" + userChoice + ".png");
    userChoiceDisplay.appendChild(userChoiceImg);

    // Create and append new image for computer choice
    const computerChoiceImg = document.createElement('img');
    computerChoiceImg.setAttribute('src', "/img/" + computerChoice + ".png");
    computerChoiceDisplay.appendChild(computerChoiceImg);

    switch (userChoice + computerChoice) {
        case 'scissorspaper':
        case 'rockscissors':
        case 'paperrock':
            resultDisplay.innerHTML = `You chose <b><u>${userChoice}</u></b> and the computer chose <b><u>${computerChoice}</u></b>, YOU WIN!`;
            break;
        case 'paperscissors':
        case 'scissorsrock':
        case 'rockpaper':
            resultDisplay.innerHTML = `You chose <b><u>${userChoice}</u></b> and the computer chose <b><u>${computerChoice}</u></b>, YOU LOSE!`;
            break;
        case 'scissorsscissors':
        case 'rockrock':
        case 'paperpaper':
            resultDisplay.innerHTML = `You chose <b><u>${userChoice}</u></b> and the computer chose <b><u>${computerChoice}</u></b>, IT'S A DRAW!`;
            break;
    }

    document.getElementById("rockPaperScissorsBoard").classList.add("invisible");
    document.getElementById("chooseOneRockPaperScissors").classList.add("invisible");
    document.getElementById("divUserChoiceRockPaperScissors").classList.remove("invisible");
    document.getElementById("divComputerChoiceRockPaperScissors").classList.remove("invisible");
}


function resetGame() {
    if(resultDisplay) resultDisplay.innerHTML = "";
    if(userChoiceDisplay) userChoiceDisplay.innerHTML = "";
    if(computerChoiceDisplay) computerChoiceDisplay.innerHTML = "";
    document.getElementById("rockPaperScissorsBoard").classList.remove("invisible");
    document.getElementById("chooseOneRockPaperScissors").classList.remove("invisible");
    document.getElementById("divUserChoiceRockPaperScissors").classList.add("invisible");
    document.getElementById("divComputerChoiceRockPaperScissors").classList.add("invisible");
}

resetGame()
document.getElementById("resetButtonRockPaperScissors").addEventListener("click", resetGame);






//**** Tic Tac Toe ****/
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('#tictactoeBoard .cell');
    const messageElement = document.getElementById('messageTicTacToe');
    const resetButton = document.getElementById('resetButtonTicTacToe');
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (gameState[cellIndex] !== null || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            messageElement.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (gameState.every(cell => cell !== null)) {
            messageElement.textContent = "It's a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `It's ${currentPlayer}'s turn`;
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => gameState[index] === currentPlayer);
        });
    }

    function resetGame() {
        gameState = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
        messageElement.textContent = `It's ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    messageElement.textContent = `It's ${currentPlayer}'s turn`;
});
