
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
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.value === secondCard.value) {
            matchedCards.push(firstCard.index, secondCard.index);
        } else {
            document.querySelector(`.card[data-index='${firstCard.index}']`).classList.remove('flipped');
            document.querySelector(`.card[data-index='${secondCard.index}']`).classList.remove('flipped');
            document.querySelector(`.card[data-index='${firstCard.index}']`).textContent = '';
            document.querySelector(`.card[data-index='${secondCard.index}']`).textContent = '';
        }
        flippedCards = [];
    }

    function resetGame() {
        matchedCards = [];
        flippedCards = [];
        createBoard();
    }

    createBoard();
    gameBoard.addEventListener('click', flipCard);
    resetButton.addEventListener('click', resetGame);
});
