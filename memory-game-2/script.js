const gameContainer = document.getElementById("game");


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let flippedCards = [];

function handleCardClick(event) {
    const numFlippedBeforeClick = flippedCards.length;    
    // if there are less than two flipped
    if(numFlippedBeforeClick < 2){
        // you can use event.target to see which element was clicked/ change background color of card clicked
        let cardClicked = event.target;
        // if card cliked isn't already in flippedCards array, then change color & push to array
        if(cardClicked !== flippedCards[0] && cardClicked !== flippedCards[1]){       
          cardClicked.style.backgroundColor = cardClicked.classList[0];     
          flippedCards.push(cardClicked)
          // if num of cards flipped is equal to 1 (index)
          if(numFlippedBeforeClick === 1){
            const cardOne = flippedCards[0]
            const cardTwo = flippedCards[1]
              // compare the two colors to see if match
              if(cardOne.style.backgroundColor === flippedCards[1].style.backgroundColor){
                  cardOne.classList.add('matched')
                  cardTwo.classList.add('matched')
              } else {
                // reset background color to empty
                setTimeout(function() {
                  cardOne.style.backgroundColor = ""
                  cardTwo.style.backgroundColor = ""
                }, 1000)
                
              }
              // then clear flipped
              flippedCards = [];
          }
        }
    }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */

// Clicking a card should change the background color to be the color of the class it has. 
// Users should only be able to change at most two cards at a time.
// Clicking on two matching cards should be a “match” — those cards should stay face up.
// When clicking two cards that are not a match, they should stay turned over for at least 
// 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.