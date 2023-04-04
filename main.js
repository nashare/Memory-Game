const iconClasses = ['fa-star', 'fa-music', 'fa-moon', 'fa-heart', 'fa-gamepad',
    'fa-fish', 'fa-face-smile', 'fa-bell', 'fa-paperclip', 'fa-car', 'fa-gift', 
    'fa-anchor', 'fa-umbrella', 'fa-camera', 'fa-droplet', 'fa-fire', 'fa-plane', 
    'fa-rocket', 'fa-key', 'fa-snowflake'];


let firstCard;
let secondCard;
let gameActive = false;
const oneCard = {
    visibility: 'visible',
    iconClass: null,
    side: "back"
};
let cards = [];
let cardsToFlip = [null, null];
let pairClosed;
let cardsCount = 30;
let timerMinutes = 2;


const timer = document.querySelector('span');
const playAgainBtn = document.getElementById('play');
const timerEl = document.querySelector('span');
const board = document.getElementById('board');
const modes = document.getElementById('modes');


playAgainBtn.addEventListener('click', initialize);
board.addEventListener('click', handleClick);
modes.addEventListener('click', handleMode);


initialize();

function initialize() {
    gameActive = true;
    firstCard = null;
    secondCard = null;
    pairClosed = 0;
    timer.innerHTML = `${timerMinutes}:00`;
    const subCopyCardsNum = iconClasses.slice(0, cardsCount/2);
    let allCardsName = subCopyCardsNum.concat(subCopyCardsNum);
    shuffleArray(allCardsName);
    cards = [];
    for (let i = 0; i < cardsCount; i++) {
        cards[i] = structuredClone(oneCard);
    }
    allCardsName.forEach((name, ind) => {
        cards[ind].iconClass = name;
    });
    board.replaceChildren();
    board.style.display = 'grid';
    if (cardsCount === 40) {
        board.style.gridTemplateColumns = "repeat(8, 10vmin)";
        board.style.gridTemplateRows = "repeat(5, 10vmin)";
    } else if (cardsCount === 30) {
        board.style.gridTemplateColumns = "repeat(6, 10vmin)";
        board.style.gridTemplateRows = "repeat(5, 10vmin)";
    } else {
        board.style.gridTemplateColumns = "repeat(4, 10vmin)";
        board.style.gridTemplateRows = "repeat(5, 10vmin)";
    }

    for (let i = 0; i < cardsCount; i++) {
        const newCard = document.createElement("i");
        newCard.id = i;
        board.appendChild(newCard);
    }
    render();
}

function render() {
    const cardsEl = document.querySelectorAll('#board > i');
    cardsEl.forEach((cell, ind) => {
        if (cards[ind].visibility === 'hidden') {
            cell.style.visibility = "hidden";
        } 
        if (cards[ind].side === 'back') {
            cell.setAttribute("class", "");
            cell.style.backgroundColor = "#D9D9D9";
        } else {
            cell.setAttribute("class", " fa-solid " + cards[ind].iconClass);
            cell.style.backgroundColor = "white";
        }
        }
    )
};

// const showTimer = setInterval(() => {
//     const minutes = Math.floor(timerMinutes / 60);
//     let seconds = timerMinutes % 60;

//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     timer.innerHTML = `${minutes}:${seconds}`;
//     timerMinutes--;

//     if (timerMinutes < 0) {
//         clearInterval(showTimer);
//         timer.innerHTML = 'Time is up!';
//     }
// }, 1000);


function handleClick(evt) {
    if (evt.target.tagName != "I" || gameActive === false ||
        cards[evt.target.id].side !== "back" || cards[evt.target.id].visibility === "hidden") {
        return;
    }
    if (firstCard === null && secondCard === null) {
        if (cardsToFlip[0] !== null) {
            cards[cardsToFlip[0]].side = 'back';
            cards[cardsToFlip[1]].side = 'back';
            cardsToFlip = [null, null];
            render();
        }
        firstCard = evt.target.id;
        cards[evt.target.id].side = 'front';
        render();
    } else if (firstCard !== null && secondCard === null) {
        secondCard = evt.target.id;
        cards[evt.target.id].side = 'front';
        render();
    } 
    if (firstCard !== null && secondCard !== null) {
        if (cards[firstCard].iconClass === cards[secondCard].iconClass) {
            cards[firstCard].visibility = 'hidden';
            cards[secondCard].visibility = 'hidden';
            pairClosed++;
            console.log(pairClosed);
            setTimeout(render, 400);
        } 
        cardsToFlip = [firstCard, secondCard];
        firstCard = null;
        secondCard = null;
    }
    if (pairClosed === cardsCount/2) {
        const message = "You won the game!";
        setTimeout(displayWinLostMessage(message), 400);
    }

}

function displayWinLostMessage(message) {
    board.replaceChildren();
    board.style.display = 'flex';
    const winLostMessage = document.createElement("h2");
    winLostMessage.innerText = message;
    board.appendChild(winLostMessage);
}

function handleMode(evt) {
    if (evt.target.tagName !== "BUTTON") {
        return;
    }
    if (evt.target.id === "easy") {
        cardsCount = 20;
        timerMinutes = 1;
    } else if (evt.target.id === "medium") {
        cardsCount = 30;
        timerMinutes = 2;
    } else {
        cardsCount = 40;
        timerMinutes = 3;
    }
    initialize();
}

//from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 6) Create and render the timer
// 	Probably have to create a setInterval() method and when it’s time to freeze the times - clearInterval().I need more time to experiment with this part, I can't describe it in detail now in pseudocode. 


// 7.5) If all the cards are hidden and the time left >= 0, “freeze” the timer on the screen and update the text of the h element to “You win”, update gameActive to false
// 7.6) If the time is up, update the text “You lost”, set timer on the screen to 0: 00 and update gameActive to false

// 8) Handle a player clicking the Play Again button:
// 8.1) Clear the innerText of the win / lost message.
// 8.2) Render the board using the function from the step 4

