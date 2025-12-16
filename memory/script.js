const images = [
    'image1.jpg', 'image1.jpg',
    'image2.jpg', 'image2.jpg',
    'image3.jpg', 'image3.jpg',
    'image4.jpg', 'image4.jpg',
    'image5.jpg', 'image5.jpg',
    'image6.jpg', 'image6.jpg',
    'image7.jpg', 'image7.jpg',
    'image8.jpg', 'image8.jpg',
    'image9.jpg', 'image9.jpg',
    'image10.jpg', 'image10.jpg',
    'image11.jpg', 'image11.jpg',
    'image12.jpg', 'image12.jpg',
    'image13.jpg', 'image13.jpg',
    'image14.jpg', 'image14.jpg',
    'image15.jpg', 'image15.jpg',
    'image16.jpg', 'image16.jpg',
    'image17.jpg', 'image17.jpg',
    'image18.jpg', 'image18.jpg',
    'image19.jpg', 'image19.jpg',
    'image20.jpg', 'image20.jpg'
];

let flippedCards = [];
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;

    this.querySelector('.back').style.transform = 'rotateY(0)';

    if (flippedCards.length === 0) {
        flippedCards.push(this);
    } else {
        flippedCards.push(this);
        lockBoard = true; // Bloquea el tablero mientras se realiza la comparación
        setTimeout(checkForMatch, 100);
    }
}

function checkForMatch() {
    let isMatch = flippedCards[0].querySelector('.back img').src === flippedCards[1].querySelector('.back img').src;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    flippedCards[0].removeEventListener('click', flipCard);
    flippedCards[1].removeEventListener('click', flipCard);
    flippedCards[0].classList.add('disabled');
    flippedCards[1].classList.add('disabled');
    resetBoard();

    // Verificar si todas las cartas han sido deshabilitadas
    const remainingCards = document.querySelectorAll('.card:not(.disabled)');
    if (remainingCards.length === 0) {
        // Mostrar pantalla de felicitación
        const congratulationsScreen = document.querySelector('.congratulations-screen');
        congratulationsScreen.classList.remove('hidden');
    }
}

function unflipCards() {
    setTimeout(() => {
        flippedCards[0].querySelector('.back').style.transform = 'rotateY(180deg)';
        flippedCards[1].querySelector('.back').style.transform = 'rotateY(180deg)';
        resetBoard();
    }, 750);
}

function resetBoard() {
    flippedCards = [];
    lockBoard = false;
}

function shuffleCards() {
    const cards = document.querySelectorAll('.card');
    let currentIndex = images.length;
    let temporaryValue, randomIndex;

    // Mientras haya elementos para mezclar
    while (currentIndex !== 0) {
        // Seleccionar un elemento restante
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Intercambiarlo con el elemento actual
        temporaryValue = images[currentIndex];
        images[currentIndex] = images[randomIndex];
        images[randomIndex] = temporaryValue;
    }

    // Asignar el orden aleatorio a cada carta
    cards.forEach((card, index) => {
        card.style.order = index;
    });
}

function createBoard() {
    shuffleCards();
    images.forEach((img, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const front = document.createElement('div');
        front.classList.add('front');
        const frontImg = document.createElement('img');
        frontImg.src = 'img/back.jpg';  // Establecemos la imagen 'back.jpg' como la cara frontal
        frontImg.alt = 'Imagen';
        front.appendChild(frontImg);

        const back = document.createElement('div');
        back.classList.add('back');
        const backImg = document.createElement('img');
        backImg.src = `img/${img}`;  // Establecemos la imagen dinámica como la cara posterior
        backImg.alt = 'Imagen';
        back.appendChild(backImg);

        card.appendChild(front);
        card.appendChild(back);

        card.setAttribute('data-index', index); // Añadimos un atributo para identificar la carta

        card.addEventListener('click', flipCard); // Agregamos el evento de clic a la carta

        document.querySelector('.memory-game').appendChild(card);
    });
}

function startNewGame() {
    // Ocultar pantalla de felicitación
    const congratulationsScreen = document.querySelector('.congratulations-screen');
    congratulationsScreen.classList.add('hidden');

    // Limpiar el tablero y crear un nuevo juego
    const memoryGame = document.querySelector('.memory-game');
    memoryGame.innerHTML = ''; // Limpiar el contenido actual

    // Redirigir a otrojuego.html
    window.location.href = '../diferencias/index.html';
}

// Evento para el botón "Siguiente Juego"
const newGameBtn = document.getElementById('new-game-btn');
newGameBtn.addEventListener('click', startNewGame);

// Iniciar el primer juego al cargar la página
createBoard();
