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

// Function to perform insertion sort
async function insertionSort(array) {
  displayArray(0);
  highligtText(1);
  await delay(1100);
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    // Move larger elements to the right
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      // Display the current state of the array and the comparison being made
      displayArray(j + 1); // Highlight the current element being compared
      algorithmInfo.textContent = `So sánh: ${key} và ${array[j + 1]}`;
      algorithmInfo.style.color = 'white';
      // Delay the next iteration for visualization
      highligtText(3);
      await delay(1100);
    }
    array[j + 1] = key;
    // Display the current state of the array after insertion
    displayArray(j + 1);
    highligtText(1);
    algorithmInfo.textContent = `Đang tìm số nhỏ hơn ${key}`;
    algorithmInfo.style.color = 'white';
    // Delay the next iteration for visualization
    highligtText(4);
    await delay(1100);
  }
  // Sorting completed
  displayArray(-1);
  algorithmInfo.textContent = 'Hoàn tất sắp xếp';
  algorithmInfo.style.color = 'white';
  isSortingCompleted = true;
  highligtText(5);
}

// Function to display the current state of the array
function displayArray(currentIndex = -1) {
  arrayDisplay.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const element = document.createElement('div');
    element.classList.add('array-element');
    var hItem = array[i];

    // Calculate height based on the sign of the array element
    var heightMultiplier = hItem < 0 ? 10 : 20; // Adjust the multiplier as needed
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
// Function to show error message
function showError(message) {
  playErrorSound();
  errorMessage.textContent = message;
}

// Function to play error sound
function playErrorSound() {
  var errorSound = document.getElementById("errorSound");
  errorSound.play();
}

// Function to clear error message
function clearError() {
  errorMessage.textContent = '';
}

// Helper function to delay execution
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to highlight text
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

// Start button click event listener
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
  inputArrayElement.value = ""; // Xóa nội dung của trường nhập liệu
  clearError();
}
function handleResetClick() {
  location.reload();
}

toggleSoundCheckbox.addEventListener('change', () => {
  if (toggleSoundCheckbox.checked) {
    // If the checkbox is checked, play the audio
    backgroundAudio.play();
  } else {
    // If the checkbox is unchecked, pause the audio
    backgroundAudio.pause();
  }
});