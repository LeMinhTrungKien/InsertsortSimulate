// Global variables
const container = document.querySelector('.container');
const arrayDisplay = document.querySelector('.array-display');
const algorithmInfo = document.querySelector('.algorithm-info');
const errorMessage = document.querySelector('.error-message');
const startButton = document.querySelector('#start-button');
const resetButton = document.querySelector('#reset-button');
const toggleSoundCheckbox = document.getElementById('toggleSound');
  const backgroundAudio = document.getElementById('backgroundAudio');
var inputArrayElement = document.getElementById("input-array");
let array = [];
let currentIndex = -1;
let isSortingCompleted = false;
async function insertionSort(array) {
  displayArray(0);
  highligtText(1);
  await delay(1100);
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      displayArray(j + 1);
      algorithmInfo.textContent = `So sánh: ${key} và ${array[j + 1]}`;
      algorithmInfo.style.color = 'white';
      highligtText(3);
      await delay(1100);
    }
    array[j + 1] = key;
    displayArray(j + 1);
    highligtText(1);
    algorithmInfo.textContent = `Đang tìm số nhỏ hơn ${key}`;
    algorithmInfo.style.color = 'white';
    highligtText(4);
    await delay(1100);
  }
  displayArray(-1);
  algorithmInfo.textContent = 'Hoàn tất sắp xếp';
  algorithmInfo.style.color = 'white';
  isSortingCompleted = true;
  highligtText(5);
}
function displayArray(currentIndex = -1) {
  arrayDisplay.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const element = document.createElement('div');
    element.classList.add('array-element');
    var hItem = array[i];
    var heightMultiplier = hItem < 0 ? 10 : 20;
    var heightValue = Math.abs(hItem) * heightMultiplier;
    element.style.height = `${heightValue}px`;
    console.log("array[i]=" + array[i]);
    console.log("hItem=" + hItem);
    console.log("element.style.height=" + element.style.height);
    element.textContent = array[i];
    if (i === currentIndex) {
      element.classList.add('current-element');
    }
    arrayDisplay.appendChild(element);
  }
}
function showError(message) {
  playErrorSound();
  errorMessage.textContent = message;
}
function playErrorSound() {
  var errorSound = document.getElementById("errorSound");
  errorSound.play();
}
function clearError() {
  errorMessage.textContent = '';
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function highligtText(lineNum = 1) {
  var doc = document.getElementById("TextCode");
  var lineID = "line" + lineNum;
  var elems = document.getElementsByClassName('code');

  for (var i = 0; i < elems.length; i++) {
    elems[i].style.color = "#FFFFFF";
  }

  if (lineNum === 1) {
    for (let i = 1; i <= 5; i++) {
      document.getElementById("line" + i).style.color = "#FF0000";
    }
    for (let i = 6; i <= 11; i++) {
      document.getElementById("line" + i).style.color = "#BBBBBB";
    }
  } else if (lineNum === 3) {
    for (let i = 6; i <= 9; i++) {
      document.getElementById("line" + i).style.color = "#FF0000";
    }
    for (let i = 1; i <= 5; i++) {
      document.getElementById("line" + i).style.color = "#BBBBBB";
    }
    for (let i = 10; i <= 11; i++) {
      document.getElementById("line" + i).style.color = "#BBBBBB";
    }
  } else if (lineNum === 4) {
    for (let i = 10; i <= 11; i++) {
      document.getElementById("line" + i).style.color = "#FF0000";
    }
    for (let i = 1; i <= 9; i++) {
      document.getElementById("line" + i).style.color = "#BBBBBB";
    }
  } else if (lineNum === 5) {
    for (let i = 1; i <= 11; i++) {
      document.getElementById("line" + i).style.color = "#000000";
    }
  }
}
startButton.addEventListener('click', async () => {
  const inputArray = inputArrayElement.value.trim();

  if (!inputArray) {
    showError('Vui lòng nhập mảng vào đây.');
    return;
  }

  const inputArrayValues = inputArray.split(' ').map(value => {
    const parsedValue = Number(value.trim());
    if (isNaN(parsedValue)) {
      showError('Không đúng định dạng nhập vào.');
      throw new Error('Invalid input format');
    }
    return parsedValue;
  });

  array = inputArrayValues;

  if (array.length < 2) {
    showError('Hãy nhập ít nhất 2 phần tử!');
    return;
  }
  currentIndex = -1;
  isSortingCompleted = false;
  clearError();

  await insertionSort(array);
});
function resetInputArray() {
  inputArrayElement.value = "";
  clearError();
}
function handleResetClick() {
  location.reload();
}
toggleSoundCheckbox.addEventListener('change', () => {
  if (toggleSoundCheckbox.checked) {
    backgroundAudio.play();
  } else {
    backgroundAudio.pause();
  }
});