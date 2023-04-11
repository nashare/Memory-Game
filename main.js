const iconClasses = ['fa-star', 'fa-music', 'fa-moon', 'fa-heart', 'fa-gamepad',
    'fa-fish', 'fa-face-smile', 'fa-bell', 'fa-paperclip', 'fa-car', 'fa-gift', 
    'fa-anchor', 'fa-umbrella', 'fa-camera', 'fa-droplet', 'fa-fire', 'fa-plane', 
    'fa-rocket', 'fa-key', 'fa-snowflake'];
const oneCard = {
    visibility: 'visible',
    iconClass: null,
    side: 'back'
};


let firstCard;
let secondCard;
let cards = [];
let cardsToFlip = [null, null];
let pairClosed;
let cardsCount = 30;
let timerSeconds = 60;
let interval = null;


const restartBtn = document.getElementById('play');
const timerEl = document.querySelector('span');
const board = document.getElementById('board');
const modes = document.getElementById('modes');


restartBtn.addEventListener('click', initialize);
board.addEventListener('click', handleClick);
modes.addEventListener('click', handleMode);


initialize();

function initialize() {
    stopTimer();
    interval = null;
    firstCard = null;
    secondCard = null;
    pairClosed = 0;
    cardsToFlip = [null, null];
    restartBtn.style.visibility = 'visible';
    const time = timeToShow(timerSeconds);
    timerEl.innerHTML = `${time.minutes}:${time.seconds}`;
    const subCopyCardsNum = iconClasses.slice(0, cardsCount/2);
    let allCardsName = subCopyCardsNum.concat(subCopyCardsNum);
    shuffleArray(allCardsName);
    cards = [];
    for (let i = 0; i < cardsCount; i++) {
        cards[i] = {...oneCard};
    }
    allCardsName.forEach((name, ind) => {
        cards[ind].iconClass = name;
    });
    board.replaceChildren();
    board.style.display = 'grid';
    switch (cardsCount) {
        case 40:
            board.style.gridTemplateColumns = "repeat(8, 10vmin)";
            board.style.gridTemplateRows = "repeat(5, 10vmin)";
            break;
        case 30:
            board.style.gridTemplateColumns = "repeat(6, 10vmin)";
            board.style.gridTemplateRows = "repeat(5, 10vmin)";
            break;
        case 20:
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

function timeToShow(timerSeconds) {
    const minutes = Math.floor(timerSeconds/60);
    const seconds = timerSeconds - minutes * 60;
    return {
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
    }
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
            cell.setAttribute("class", "fa-solid " + cards[ind].iconClass);
            cell.style.backgroundColor = "white";
        }
        }
    )
};

function startTimer() {
    let secondsLeft = timerSeconds - 1;
    interval = setInterval(() => {
        const time = timeToShow(secondsLeft);
        timerEl.textContent = `${time.minutes}:${time.seconds}`;
        if (secondsLeft === 0) {
            clearInterval(interval);
            if (pairClosed !== cardsCount / 2) {
                const message = "You lost the game. Try once more!"
                displayWinLostMessage(message);
            }
        } else {
            secondsLeft--; 
        }
    }, 1000);
    return interval;
}

function stopTimer() {
    clearInterval(interval);
}


function handleClick(evt) {
    if (evt.target.tagName != "I" || cards[evt.target.id].side !== "back" || cards[evt.target.id].visibility === "hidden") {
        return;
    }
    if (!interval) {
        startTimer();
    }
    if (firstCard === null && secondCard === null) {
        if (cardsToFlip[0] !== null && cardsToFlip[1] !== null) {
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
            setTimeout(render, 700);
        } 
        cardsToFlip = [firstCard, secondCard];
        firstCard = null;
        secondCard = null;
    }
    if (pairClosed === cardsCount/2) {
        stopTimer();
        const message = "You won the game! Try another difficulty level.";
        setTimeout(function () {
            displayWinLostMessage(message);
        }, 700);

    }

}

function displayWinLostMessage(message) {
    restartBtn.style.visibility = 'hidden';
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
    const buttonsEl = [...modes.children];
    buttonsEl.forEach(el => {
        if (evt.target.id === el.id) {
            el.style.backgroundColor = "white";
        } else {
            el.style.backgroundColor = "#D9D9D9";
        }
    });
    if (evt.target.id === "easy") {
        cardsCount = 20;
        timerSeconds = 30;
    } else if (evt.target.id === "medium") {
        cardsCount = 30;
        timerSeconds = 60;
    } else {
        cardsCount = 40;
        timerSeconds = 90;
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

