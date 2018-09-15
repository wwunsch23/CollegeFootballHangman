//Create array of objects holding teams
var teams = [
    {name:"Northwestern",
     image: "../images/NorthwesternHelmet.jpg",
     fightSong: "../music/Northwestern__Go_U_Northwestern__new.mp3"},
    {name:"Michigan",
    image: "../images/MichiganHelmet.png",
    fightSong: "../music/Michigan__The_Victors.mp3"},
    {name:"Iowa State",
    image: "../images/IowaStateHelmet.png",
    fightSong: "../music/Iowa_State__ISU_Fights__new.mp3"},
    {name:"Notre Dame",
    image: "../images/NotreDameHelmet.png",
    fightSong: "../music/Notre_Dame__Notre_Dame_Victory_March__new.mp3"},
    {name:"Louisiana State",
    image: "../images/LSUHelmet.png",
    fightSong: "../music/LSU__Fight_For_LSU__new.mp3"}
];

//Initialize variables
var underscoreWord = [];
var allGuesses = [];
var wins = 0;
var losses = 0;
var guessesRemain = 15;

//Create variables for html elements
var winScore = document.getElementById("win-Score");
var lossScore = document.getElementById("loss-Score");
var guessesLeft = document.getElementById("guesses-Left");
var guessesMade = document.getElementById("guesses-Made");

function startGame () {
    underscoreWord = [];
    allGuesses = [];
    wins = 0;
    losses = 0;
    guessesRemain = 15;
    winScore.textContent = wins;
    lossScore.textContent = losses;
    guessesLeft.textContent = guessesRemain;
    guessesMade.textContent = allGuesses;
};

//Call the start game function
startGame ();

//Have computer choose random team
var teamChoice = teams[Math.floor(Math.random() * teams.length)];
console.log("Team name: " + teamChoice.name);
console.log("Team image src: " + teamChoice.image);
console.log("Team fight song: " + teamChoice.fightSong);

//Generate underscore for display
function createUnderscore () {
    for (let i = 0; i<teamChoice.name.length;i++) {
        if (teamChoice.name[i] === " ") {
            underscoreWord.push("&nbsp;");
        } else {
        underscoreWord.push("_");
        }
    }
    return underscoreWord;
}

console.log(createUnderscore());

//Display underscores to the screen
var underscore = document.getElementById("underscore");
underscore.innerHTML = underscoreWord.join(" ");

//function to decrease guesses and add guess to guesses array
function guesses(userGuess) {
    if (allGuesses.indexOf(userGuess.toUpperCase()) === -1){
        //decrease number of guesses remaining
        guessesRemain--;
        guessesLeft.textContent = guessesRemain;

        //Add guess to guesses made array and display to user only if isn't already in the array
        allGuesses.push(userGuess.toUpperCase());
        guessesMade.textContent = allGuesses;
    }
}

//Capture key press event
document.onkeyup = function(event) {

    let userGuess = event.key;
    console.log(userGuess);
    if (teamChoice.name.toLowerCase().includes(userGuess) && allGuesses.indexOf(userGuess) === -1 && guessesRemain > 0) {
        for (let i = 0; i < teamChoice.name.length;i++) {
            if (teamChoice.name[i].toLowerCase() === userGuess) {
                if (teamChoice.name[i] === teamChoice.name[i].toUpperCase()) {
                    underscoreWord[i] = userGuess.toUpperCase();
                } else {
                    underscoreWord[i] = userGuess;
                }
            }
        }
        //Display updated word to user
        underscore.innerHTML = underscoreWord.join(" ");

        //Call guesses function to decrease guesses and push guess to array
        guesses(userGuess);

    } else if (allGuesses.indexOf(userGuess) === -1 && guessesRemain > 0) {
        guesses(userGuess);
    }
}


