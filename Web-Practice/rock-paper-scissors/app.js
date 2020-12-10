let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const userComputer_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice(){
    const choices = ["r", "p", "s"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(letter){
    if(letter === "p") return "Paper";
    if(letter === "s") return "Scissors";
    return "Rock";
}

function game(userChoice){
    const computerChoice = getComputerChoice();
}

const smallUserWord = "(user)".fontsize(3).sub();
const smallCompWord = "(comp)".fontsize(3).sub();

function win(user, computer){
    userScore++;
    userScore_span.innerHTML = userScore;
    userComputer_span.innerHTML = computerScore;
    result_p.innerHTML = convertToWord(user) + smallUserWord + " beats " + convertToWord(computer) + smallCompWord + ". You Win!";
    document.getElementById(user).classList.add('green-glow');
    setTimeout(function() {
        document.getElementById(user).classList.remove('green-glow');
    }, 1500);
}

function lose(user, computer){
    computerScore++;
    userScore_span.innerHTML = userScore;
    userComputer_span.innerHTML = computerScore;
    result_p.innerHTML = convertToWord(user) + smallUserWord + " loses to " + convertToWord(computer) + smallCompWord + ". You Lose...";
    document.getElementById(user).classList.add('red-glow');
    setTimeout(function() {
        document.getElementById(user).classList.remove('red-glow');
    }, 1500);
}

function draw(user, computer){ 
    result_p.innerHTML = convertToWord(user) + smallUserWord + " equals to " + convertToWord(computer) + smallCompWord + ". It`s a draw.";
    document.getElementById(user).classList.add('gray-glow');
    setTimeout(function() {
        document.getElementById(user).classList.remove('gray-glow');
    }, 1500);
}

function game(userChoice){
    const computerChoice = getComputerChoice();
    switch(userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":
            win(userChoice , computerChoice);
            break;
        case "sr":
        case "rp":
        case "ps":
            lose(userChoice , computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice , computerChoice);
            break;
        default:
            break;
    }
}

function main(){
    rock_div.addEventListener('click', function(){
        game("r");
    })
    paper_div.addEventListener('click', function(){
        game("p");
    })
    scissors_div.addEventListener('click', function(){
        game("s");
    })
}

main();