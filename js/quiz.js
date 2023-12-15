// Elementos del DOM
const flagElement = document.getElementById('flag');
const options = document.querySelectorAll('.options button');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const nextButton = document.querySelector('.game-container .btn-dark');

// Variables del juego
let score = 0;
let flagsData = [];
let currentFlagIndex = 0;
let alreadyAnswered = false;

// Obtener datos del archivo JSON
fetch('js/flags.json')
  .then(response => response.json())
  .then(data => {
    flagsData = data;
    displayFlag();
  })
  .catch(error => console.error('Error al obtener los datos:', error));

// Función para mostrar la bandera y opciones de manera aleatoria
function displayFlag() {
  flagsData = shuffleArray(flagsData);
  const currentFlag = flagsData[currentFlagIndex];
  flagElement.src = currentFlag.image;

  const randomOptions = shuffleArray(currentFlag.options);
  options.forEach((option, index) => {
    option.textContent = randomOptions[index];
  });

  nextButton.style.display = 'none';
}

// Función para mezclar aleatoriamente un array
function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Función para verificar la respuesta del usuario
function checkAnswer(button) {
  if (alreadyAnswered) {
    return;
  }

  const selectedCountry = button.textContent;
  const correctCountry = flagsData[currentFlagIndex].name;

  if (selectedCountry === correctCountry) {
    resultElement.textContent = '¡Respuesta correcta!';
    score++;
    scoreElement.textContent = score;
    alreadyAnswered = true;
    nextButton.style.display = 'block';
  } else {
    resultElement.textContent = 'Respuesta incorrecta, el juego ha terminado';
    options.forEach(option => {
      option.disabled = true;
    });

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Volver a Empezar';
    restartButton.className = 'btn btn-dark center-btn';
    restartButton.onclick = function() {
      window.location.reload(); // Recargar la página al hacer clic en el botón
    };
    resultElement.parentNode.appendChild(restartButton);
  }
}

// Función para mostrar la siguiente bandera
function nextFlag() {
  alreadyAnswered = false;
  currentFlagIndex++;
  if (currentFlagIndex >= flagsData.length) {
    currentFlagIndex = 0;
  }
  displayFlag();
  resultElement.textContent = '';
}
