// Initialize scores 
let playerScore = 0;
let computerScore = 0;
const MAPPING = {
    "rock": "🗿",
    "paper": "🧻",
    "scissors": "✂️"
};

// Player choices and buttons
const choices = document.querySelectorAll('[data-value]');
const choicesButtons = document.querySelectorAll('.choices > button')
const resetButton = document.querySelector('.reset-button')

// Results to be displayed in web page 
const resPlayerScore = document.querySelector('.player-score');
const resComputerScore = document.querySelector('.computer-score');
const resRound = document.querySelector('.result-round');
const resMatchup = document.querySelector('.result-matchup');
const resHeader = document.querySelector('.heading');

const resPlayerChoice = document.querySelector('.player-choice');
const resComputerChoice = document.querySelector('.computer-choice');

// If a button is clicked, the game starts 
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.dataset.value;
        playGame(playerChoice);
    })
})

// If reset button is clicked, the game is reset 
resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    resHeader.innerText = "First to five wins the game!";
    resPlayerScore.innerText = 0;
    resComputerScore.innerText = 0;
    resPlayerChoice.innerText = "?";
    resComputerChoice.innerText = "?";
    resRound.innerText = "";
    resMatchup.innerText = ""; 
    enableButtons()
})

// Function to capitalize a word 
function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
}

// Function to generate computer's "choice"
function getComputerChoice() {
    const compChoices = ["rock", "paper", "scissors"];
    const randomizer = Math.floor(Math.random() * compChoices.length);
    return compChoices[randomizer];
}

// Function plays one game 
function playGame(playerchoice) {
    const computerChoice = getComputerChoice();
    playerWinner = isWinnerRound(playerchoice, computerChoice); 

    if (playerWinner === "Win") {
        increaseScore(resPlayerScore);
    }
    else if (playerWinner === "Lose"){
        increaseScore(resComputerScore);
    }

    showWinnerGame()
}

// Function to determine and display who wins round 
function isWinnerRound(playerChoice, computerChoice) {

    // If player and computer choose the same option 
    if (playerChoice === computerChoice) {
        
        let playerTie = "It's a tie!";
        let matchup = `${capitalize(playerChoice)} ties with ${capitalize(computerChoice)}`

        resRound.innerText = playerTie;
        resMatchup.innerText = matchup; 
        resPlayerChoice.innerText = MAPPING[playerChoice];
        resComputerChoice.innerText = MAPPING[computerChoice];
    }

    // If player beats computer 
    else if ((playerChoice==="rock" && computerChoice==="scissors") ||                     
            (playerChoice==="scissors" && computerChoice==="paper") || 
            (playerChoice==="paper" && computerChoice==="rock")) {

        let playerWin = 'You win this round!';
        let matchup = `${capitalize(playerChoice)} beats ${capitalize(computerChoice)}`

        resRound.innerText = playerWin;
        resMatchup.innerText = matchup; 
        resPlayerChoice.innerText = MAPPING[playerChoice];
        resComputerChoice.innerText = MAPPING[computerChoice];
        playerScore++;
        return "Win";
    }

    // If computer beats player 
    else if ((computerChoice==="rock" && playerChoice==="scissors") || 
            (computerChoice==="scissors" && playerChoice==="paper") || 
            (computerChoice==="paper" && playerChoice==="rock")) {

        let playerLose = 'You lose this round!';
        let matchup = `${capitalize(computerChoice)} beats ${capitalize(playerChoice)}`

        resRound.innerText = playerLose;
        resMatchup.innerText = matchup; 
        resPlayerChoice.innerText = MAPPING[playerChoice];
        resComputerChoice.innerText = MAPPING[computerChoice];
        computerScore++;
        return "Lose";
    }
}

// Function displays increasing score in web page 
function increaseScore (resScore) {
    resScore.innerText = parseInt(resScore.innerText) + 1;
}

// Function ends game and displays if player wins or loses  
function showWinnerGame() {
    
    // Checks if player or computer wins the game 
    if (playerScore === 5) {
        resHeader.innerText = "YOU WIN!";
        disableButtons()
    }
    
    else if (computerScore === 5) {
        resHeader.innerText = "YOU LOSE!";
        disableButtons()
    }

}

// Function disables buttons 
function disableButtons() {
    choicesButtons.forEach(button => {
        button.disabled = true; 
        button
    })
} 

// Function enables buttons
function enableButtons() {
    choicesButtons.forEach(button => {
        button.disabled = false; 
        button
    })
} 

