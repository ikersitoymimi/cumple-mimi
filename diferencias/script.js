let images = []; // Lista de imágenes disponibles, se llenará dinámicamente
const numLevels = 15; // Cantidad de niveles del juego
const timerDuration = 20; // Duración del temporizador en segundos
const infoMessageDuration = 6; // Duración del mensaje de información en segundos

let level = 1; // Nivel actual del juego
let correctAnswers = 0; // Contador de respuestas correctas
let currentImages = []; // Array para almacenar las imágenes actuales
let usedImages = new Set(); // Conjunto para almacenar los números de pares usados
let timer;
let secondsLeft = timerDuration;

// Elementos del DOM
const infoMessageElement = document.getElementById('infoMessage');
const countdownElement = document.getElementById('countdown');
const lostMessageElement = document.getElementById('lostMessage');
const levelCounterElement = document.getElementById('level-counter');

// Inicialización de las imágenes según los niveles
function initializeImages() {
    // Llenar el array images con pares de imágenes aleatorios
    for (let i = 1; i <= numLevels; i++) {
        let pair;
        let randomIndex;
        do {
            randomIndex = getRandomInt(1, 20);
        } while (usedImages.has(randomIndex));

        pair = getRandomPair(randomIndex);
        usedImages.add(randomIndex);
        images.push(pair);
    }
}

function getRandomPair(index) {
    let pair = [];
    if (index <= 13) {
        pair.push(`images/imagen${index}a.jpg`);
        pair.push(`images/imagen${index}b.jpg`);
    } else {
        pair.push(`images/imagen${index}.jpg`);
        pair.push(`images/imagen${index}.jpg`);
    }
    return pair;
}

function startGame() {
    infoMessageElement.style.display = 'block';
    countdownElement.style.display = 'block';
    countdown(infoMessageDuration);

    setTimeout(function () {
        infoMessageElement.style.display = 'none';
        countdownElement.style.display = 'none';
        updateLevelCounter();
        changeImages();
        startTimer();
    }, infoMessageDuration * 1000);
}

function countdown(seconds) {
    let count = seconds;
    countdownElement.textContent = count;

    let countdownInterval = setInterval(function () {
        count--;
        countdownElement.textContent = count;
        if (count <= 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
        }
    }, 1000);
}

function startTimer() {
    secondsLeft = timerDuration;
    document.getElementById('timer').textContent = secondsLeft;
    timer = setInterval(function () {
        secondsLeft--;
        document.getElementById('timer').textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timer);
            displayResult(false);
        }
    }, 1000);
}

function checkEquality(userAnswer) {
    clearInterval(timer);
    let areEqual = areImagesEqual();

    if ((userAnswer && areEqual) || (!userAnswer && !areEqual)) {
        displayResult(true);
    } else {
        displayResult(false);
    }
}

function areImagesEqual() {
    return currentImages[0] === currentImages[1];
}

function displayResult(isCorrect) {
    let resultDiv = document.getElementById('result');
    let congratulationsBtn = document.getElementById('congratulationsBtn');

    if (isCorrect) {
        resultDiv.textContent = "Oleee los caracoleees!!!";
        correctAnswers++;
        if (level < numLevels) {
            level++;
            updateLevelCounter();
            changeImages();
            startTimer();
        } else {
            resultDiv.textContent = "Oleee mu bien mi amor";
            congratulationsBtn.style.display = 'inline-block'; // Mostrar el botón de ¡Enhorabuena!
            // No desactivar los botones aquí, permitir interacción con el botón de ¡Enhorabuena!
        }
    } else {
        resultDiv.textContent = "NoooOoo has fallado pys";
        lostMessageElement.style.display = 'block';
        disableButtons();

        // Retrasar la aparición del alert por 2 segundos
        setTimeout(function () {
            // Mostrar un alert para recargar la página
            alert('Haz clic en OK para recargar la página.');
            location.reload(); // Recargar la página después de mostrar el alert
        }, 2000); // 2000 milisegundos = 2 segundos
    }
}

function showCongratulations() {
    alert("Oleeeee mi niña, te quieroooo :)");
    window.location.href = '../final/index.html'; // Redirigir a la página final
    disableButtons(); // Desactivar los botones después de redirigir
}

function disableButtons() {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function changeImages() {
    currentImages = images[level - 1];
    document.getElementById('image1').src = currentImages[0];
    document.getElementById('image2').src = currentImages[1];
}

function disableButtons() {
    document.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateLevelCounter() {
    levelCounterElement.textContent = `Imagen actual: ${level}/${numLevels}`;
}

window.onload = function () {
    initializeImages();
    startGame();
};
