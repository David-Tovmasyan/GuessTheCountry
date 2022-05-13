const settings = {
    Difficulty: 20,
    tryNumber: 2
}

// new countries will be added soon
const Countries = [
    { name: "Poland", capital: "Warsaw", continent: "Europe", famousPerson: "Robert Lewandowski" },
    { name: "Germany", capital: "Berlin", continent: "Europe", famousPerson: "Angela Merkel" },
    { name: "France", capital: "Paris", continent: "Europe", famousPerson: "Napoleon Bonapart" },
    { name: "United Kingdom", capital: "London", continent: "Europe", famousPerson: "Winston Churchill" },
    { name: "Spain", capital: "Madrid", continent: "Europe", famousPerson: "Pablo Picasso " },
    { name: "United States", capital: "Washington", continent: "North America", famousPerson: "Charlie Chaplin" },
    { name: "Canada", capital: "Ottawa", continent: "North America", famousPerson: "Justin Bieber" },
    { name: "Ukraine", capital: "Kiev", continent: "Europe", famousPerson: "Vladimir Zelenskiy" },
    { name: "Russia", capital: "Moscow", continent: "Europe/Asia", famousPerson: "Alexander Pushkin" },
    { name: "Italy", capital: "Rome", continent: "Europe", famousPerson: "Leonardo da Vinchi" },
    { name: "Austria", capital: "Vienna", continent: "Europe", famousPerson: "Gustav Klimt" },
    { name: "Japan", capital: "Tokyo", continent: "Asia", famousPerson: "Hideo Kojima" },
    { name: "China", capital: "Pekin", continent: "Europe", famousPerson: "Jack Ma" },
]

let difficultyButtons = document.querySelectorAll(".header .settings_bar #color_bar .picker li");
let tryButtons = document.querySelectorAll(".header .settings_bar #try_bar .picker li")

let changes = 0; // number of changes, prevent from bug abusing
let maxChanges=2; // 1 click happens automatically,so to get 2 change possibilty 3 - 1

difficultyButtons.forEach((elem, value) => { //changing snake color
    elem.addEventListener("click", e => {
        if (changes < maxChanges) {
            if (typeof e.target.value == "number") {
                settings.Difficulty = e.target.value;
            }
            else if (typeof e.target.value == "string") {
                settings.Difficulty = parseInt(e.target.value);
            }
            else {
                alert("Settings are set on default,please don't change anything");
                settings.Difficulty = 20; // changing settings to default, if there is a problem with types
                settings.tryNumber = 2;
            }
            gameTime = settings.tryNumber;
            changes++;

            // or just reset game without 
        }

    })
})

tryButtons.forEach((elem, value) => { // changing tries number
    elem.addEventListener("click", e => {
        if (changes < maxChanges) {
            if (typeof e.target.value == "number") {
                settings.tryNumber = e.target.value;
            }
            else if (typeof e.target.value == "string") {
                settings.tryNumber = parseInt(e.target.value);
            }
            else {
                alert("Settings are set on default,please don't change anything");
                settings.Difficulty = 20;
                settings.tryNumber = 2;
            }
            maxTry=settings.tryNumber;
            changes++;
        }

    })
})

// settings part end

let gameWindow = document.querySelector(".game_wrapper");
[infoSide, gameSide, timerSide] = [gameWindow.children[0], gameWindow.children[1], gameWindow.children[2]]; // taking every 

let currentScore=0;
let currentTry=0;

// info side start

function appearAnimation(element) {
    element.style.animation = "appear 1.5s";
}

let infoPoint = infoSide.querySelectorAll(".info .info_point");

function showInfoPoint(pointIndex, text) {
    infoPoint[pointIndex].innerHTML = text;
    appearAnimation(infoPoint[pointIndex])
}

let randomNumber = Math.floor(Math.random() * Countries.length); // pick random country

showInfoPoint(0, Countries[randomNumber].capital) // write random countrie's info //0->infoPoint[0]->Capital
showInfoPoint(1, Countries[randomNumber].continent)
showInfoPoint(2, Countries[randomNumber].famousPerson)

//info side end

//game side

let timer = timerSide.querySelector(".timer");

let gameTime = settings.Difficulty; // depends on selected difficulty

if (gameTime > 10) {
    timer.innerHTML = `00:${gameTime}`; // css trick, to have 
}
else timer.innerHTML = `00:0${gameTime}`;


appearAnimation(timer)


function showTimer() {
    if (gameTime >= 10) {
        timer.innerHTML = `00:${gameTime}`;
    }
    else if (gameTime < 10 && gameTime > 0) {
        timer.innerHTML = `00:0${gameTime}`;
    }
    else if (gameTime <= 0) {
        timer.innerHTML = `00:00`;
    }

    if (gameTime <= 3) {
        timer.style.color = "red";
        timer.style.animation = "littleTime 0.3s infinite";
    }
    else {
        timer.style.color = "white";
        timer.style.animation = "";
    }
    gameTime--;
}
setInterval(e => {
    showTimer();
}, 1000)

//game side end

let score = gameSide.querySelector(".score_number");
let tries = gameSide.querySelector(".try_number");
appearAnimation(score)
appearAnimation(tries)

function refreashScore(){
    score.innerHTML = `Score: ${currentScore} | ${maxScore}`;
    tries.innerHTML = `Tries: ${currentTry}| ${maxTry}`;
}

let maxScore = 10;
let maxTry = settings.tryNumber; // getting his value from setting obj

let input = gameSide.querySelector(".input_side input[type='text']")
let button = gameSide.querySelector(".input_side button")

function checkCorrectAnswer(text) {
    if(text==Countries[randomNumber].name){  // if input text's value is randomly selected countries name
        isAnswerMatching=true;
        buttonClickColor("green");
        currentScore++;
    }
    else{
        isAnswerMatching=false;
        buttonClickColor("red");
        currentTry++;
    }
    refreashScore();
    
}

function buttonClickColor(color){ // if wrong color red, if true green
}


button.addEventListener("click", e => {
    checkCorrectAnswer(input.value)
    input.value = ""; // reseting input field
})


