const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMsg = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

let selectedWord = '';

const correctLetters = [];
const wrongLetters = [];

// Fetch array of 10 random words from API and select randomly from array
function fetchRandomWord() {
    fetch('https://random-word-form.herokuapp.com/random/noun?count=10')
    .then(resp => resp.json())
    .then(data => {
        selectedWord = data[0];
        displayWord();
    });
    
}

// Show hidden word
function displayWord() {
    wordElement.innerHTML =
    `${selectedWord
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

// Update the wrong letters
function updateWrongLetters() {
    // display wrong letters
    wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span`)}
    `;

    // display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMsg.innerText = `You lost. The word was ${selectedWord}`;
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => { // on key press
    //console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) { // if the key pressed is a letter
        const letter = e.key; // set letter to key that was pressed

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            }
            else {
                showNotification();
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)
    
                updateWrongLetters();
            }
            else {
                showNotification();
            }
        }
    }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0)

    fetchRandomWord();

    updateWrongLetters();

    popup.style.display = 'none';
});

fetchRandomWord();