// 1) Define required constants:
// 1.1) The names of css classes of icons for the cards images - iconClasses
const iconClasses = ['fa-star', 'fa-music', 'fa-moon', 'fa-heart', 'fa-gamepad',
    'fa-fish', 'fa-face-smile', 'fa-bell', 'fa-paperclip', 'fa-car', 'fa-gift', 
    'fa-anchor', 'fa-umbrella', 'fa-camera', 'fa-droplet', 'fa-fire', 'fa-plane', 
    'fa-rocket', 'fa-key', 'fa-snowflake'];

// 2) Define required variables used to track the state of the game:
// 2.1) First chosen card, the index of the card - firstCard
// 2.2) Second chosen card, the index of the card - secondCard
// 2.3) The Boolean variable that describes the state of the game before the first click on any card of the board and when the timer is up or all the cards are gathered, whenever comes first - gameActive
// 2.4) Card states - the array with the length of the cell count with CSS status hidden / visible, i.e.const cardStates = [‘hidden’, ‘hidden’...] and can be changed to visible when clicked on
// 2.5) Card icons names - const cardNames = [null, null…]
// 2.6) Moves counter - movesCounter, null
// 2.7) Time left
let firstCard;
let secondCard;
let movesCounter;
let gameActive = false;
const cards = new Array(40).fill({
    visibility: 'visible',
    iconClass: "",
    side: "back"
});
console.log(cards);


// 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant
// 3.1) Win / lost < h > element.
// 	3.2) Board grid container. 
// 	3.3) Timer container
// 3.4) Play again button
const cellsEl = document.querySelectorAll('#board > i');
const winLostEl = document.querySelector('h2');
const playAgainBtn = document.querySelector('button');
const timerEl = document.querySelector('span');


playAgainBtn.addEventListener('click', initialize);
document.getElementById('board').addEventListener('click', handleDrop);

initialize();

function initialize() {
    gameActive = true;
    firstCard = null;
    secondCard = null;
    let movesCounter = 0;
    let allCardsName = iconClasses.concat(iconClasses);
    shuffleArray(allCardsName);
    console.log(allCardsName);
    render();
}

function render() {
    console.log("here");
};

function handleDrop() {

}

//from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// 4) Upon loading the app should
// 4.1) Double, shuffle the iconClasses and randomly assign them to the cardNames variable.
// 	4.2) Set gameActive to true, firstCard and secondCard to null, movesCounter to 0
// 4.4) Time left equals to 2 minutes, update the innerText of timer container element to 2: 00
// 4.5) Call the render function

// 5) Render the cards
// 5.1) The function checks the values of cardStates and cardNames arrays and render the cards of the cells accordingly

// 6) Create and render the timer
// 	Probably have to create a setInterval() method and when it’s time to freeze the times - clearInterval().I need more time to experiment with this part, I can't describe it in detail now in pseudocode. 

// 7) Handle a player clicking a card:
// 7.1) If the gameActive is true then render the timer(6)
// 7.2)  If the player clicks on the hidden card or gameActive is false, return the function
// 7.3) If the counter of moves is 0:
// 7.3.1) Increment the counter of moves by 1, update firstCard state variable, change the cardStates to visible and render
// 7.4) If the counter of moves is 1:
// 7.4.1) Increment the counter of moves by 1, update secondCard state variable, change the cardStates to visible and render
// 7.4.2) Compare the css code of two chosen cards.
// 	7.4.2.1) When any two cards are open and the icons on them are the same, give 1 second of delay and change the visibility of these cards to hidden.Update the counter of moves to 0. Render.
// 7.4.2.2) If the icons on two cards are different, do nothing and wait for the next move.
// 7.4.2.2.1) With the next move flip the two open cards, update counter to 0 and do steps 7.3 - 7.4
// 7.5) If all the cards are hidden and the time left >= 0, “freeze” the timer on the screen and update the text of the h element to “You win”, update gameActive to false
// 7.6) If the time is up, update the text “You lost”, set timer on the screen to 0: 00 and update gameActive to false

// 8) Handle a player clicking the Play Again button:
// 8.1) Clear the innerText of the win / lost message.
// 8.2) Render the board using the function from the step 4

