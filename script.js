const wordElement = document.getElementById('word');
const wrontLettersElement = document.getAnimations('wrong-letters');
const playAgainBtn = document.getElementById('play-again')
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMsg = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard']; // random words

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    wordElement.innerHTML = `
    ${selectedWord
        .split('') // convert string to array
        .map(
            letter => `
                <span class="letter"> 
                ${correctLetters.includes(letter) ? letter : ''}
                </span>
        `) // create new array and add letter to array if letter in correctLetters
        .join('') // convert array to string
    }`;

    const innerWord = wordElement.innerText.replace(/\n/g, ''); // use regex to remove '\n' chars
    
    if (innerWord === selectedWord) {
        finalMsg.innerText = 'Congrats, you won!';
        popup.style.display ='flex';
    }
}

displayWord();