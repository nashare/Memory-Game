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
let pairClosed = 0;
let cardsCount = 40;


const cellsEl = document.querySelectorAll('#board > i');
const winLostEl = document.querySelector('h2');
const playAgainBtn = document.querySelector('button');
const timerEl = document.querySelector('span');
const board = document.getElementById('board');


playAgainBtn.addEventListener('click', initialize);
board.addEventListener('click', handleClick);


initialize();

function initialize() {
    gameActive = true;
    firstCard = null;
    secondCard = null;
    winLostEl.style.display = 'none';
    let allCardsName = iconClasses.concat(iconClasses);
    shuffleArray(allCardsName);
    cards = [];
    for (let i = 0; i < cardsCount; i++) {
        cards[i] = structuredClone(oneCard);
    }
    allCardsName.forEach((name, ind) => {
        cards[ind].iconClass = name;
    });
    console.log(cards);
    render();
}

function render() {
    cellsEl.forEach((cell, ind) => {
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
            console.log(cards);
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
        console.log(cards[firstCard].iconClass);
        console.log(cards[secondCard].iconClass);
        if (cards[firstCard].iconClass === cards[secondCard].iconClass) {
            cards[firstCard].visibility = 'hidden';
            cards[secondCard].visibility = 'hidden';
            pairClosed++;
            setTimeout(render, 400);
        } 
        cardsToFlip = [firstCard, secondCard];
        firstCard = null;
        secondCard = null;
    }
    if (pairClosed === cardsCount/2) {
        board.style.display = 'none';
        winLostEl.style.display = 'block';
        winLostEl.innerHTML = "You won the game!"
    }

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

