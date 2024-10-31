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
    userChoiceImg.setAttribute('src', "/img/rock-paper-scissors/" + userChoice + ".png");
    userChoiceDisplay.appendChild(userChoiceImg);

    // Create and append new image for computer choice
    const computerChoiceImg = document.createElement('img');
    computerChoiceImg.setAttribute('src', "/img/rock-paper-scissors/" + computerChoice + ".png");
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
    resultDisplay.innerHTML = "";
    userChoiceDisplay.innerHTML = "";
    computerChoiceDisplay.innerHTML = "";
    document.getElementById("rockPaperScissorsBoard").classList.remove("invisible");
    document.getElementById("chooseOneRockPaperScissors").classList.remove("invisible");
    document.getElementById("divUserChoiceRockPaperScissors").classList.add("invisible");
    document.getElementById("divComputerChoiceRockPaperScissors").classList.add("invisible");
}

resetGame()
document.getElementById("resetButtonRockPaperScissors").addEventListener("click", resetGame);