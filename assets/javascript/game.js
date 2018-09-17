//Create array of objects holding teams
var teams = [
    {name:"Northwestern",
     image: "assets/images/NorthwesternHelmet.jpg",
     fightSong: "assets/music/Northwestern__Go_U_Northwestern__new.mp3"},
    {name:"Michigan",
    image: "assets/images/MichiganHelmet.png",
    fightSong: "assets/music/Michigan__The_Victors.mp3"},
    {name:"Iowa State",
    image: "assets/images/IowaStateHelmet.png",
    fightSong: "assets/music/Iowa_State__ISU_Fights__new.mp3"},
    {name:"Notre Dame",
    image: "assets/images/NotreDameHelmet.png",
    fightSong: "assets/music/Notre_Dame__Notre_Dame_Victory_March__new.mp3"},
    {name:"Louisiana State",
    image: "assets/images/LSUHelmet.png",
    fightSong: "assets/music/LSU__Fight_For_LSU__new.mp3"}
];

//Initialize variables
var underscoreWord = [];
var allGuesses = [];
var wins = 0;
var losses = 0;
var guessesRemain = 10
var teamChoice;

//Create variables for html elements
var winScore = document.getElementById("win-Score");
var lossScore = document.getElementById("loss-Score");
var guessesLeft = document.getElementById("guesses-Left");
var guessesMade = document.getElementById("guesses-Made");
var underscore = document.getElementById("underscore");
var image = document.getElementById("image");
var song = document.getElementById("myAudio"); 

winScore.textContent = wins;
lossScore.textContent = losses;

underscore.innerHTML = "Press any key to start"

function startGame () {
    underscoreWord = [];
    allGuesses = [];
    guessesRemain = 12;
    image.src = "assets/images/football.jpg";
    guessesLeft.textContent = guessesRemain;
    guessesMade.textContent = allGuesses;
};

//Call the start game function
startGame ();

//Have computer choose random team
function chooseTeam (){
    teamChoice = teams[Math.floor(Math.random() * teams.length)];
    console.log("Team name: " + teamChoice.name);
    console.log("Team image src: " + teamChoice.image);
    console.log("Team fight song: " + teamChoice.fightSong);
}

//Call the choose team function to select the first team
chooseTeam();

//Generate underscore for display
function createUnderscore () {
    for (let i = 0; i<teamChoice.name.length;i++) {
        if (teamChoice.name[i] === " ") {
            underscoreWord.push("&nbsp;");
        } else {
        underscoreWord.push("_");
        }
    }
    underscore.innerHTML = underscoreWord.join(" ");
    //return underscoreWord;
}

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

function playAudio () {
    song.src = teamChoice.fightSong;
    song.play();
}

function pauseAudio(){
    song.pause();
    console.log("Audio Stop Successfully");
    startGame ()
    chooseTeam();
    underscore.innerHTML = "Press any key to start"
}

//Capture key press event
document.onkeyup = function(event) {

    if (guessesRemain === 12) {
        createUnderscore();
    }

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

    } else if (!teamChoice.name.toLowerCase().includes(userGuess) && allGuesses.indexOf(userGuess) === -1 && guessesRemain > 0)
        //Call guesses function to decrease guesses and push guess to array
        guesses(userGuess);

    if (underscoreWord.indexOf("_") === -1){
        wins++;
        winScore.textContent = wins;
        image.src=teamChoice.image;
        playAudio();
        setTimeout(pauseAudio,30000);

    } else if (guessesRemain === 0 && underscoreWord.indexOf("_") > -1) {
        losses++;
        lossScore.textContent = losses;
        startGame ()
        chooseTeam();
        underscore.innerHTML = "Press any key to start"
    }

}




