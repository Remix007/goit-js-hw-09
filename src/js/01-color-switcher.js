
const startChangeColorBtn = document.querySelector('[data-start]');
const stopChangeColorBtn = document.querySelector('[data-stop]');
const bodyChangeColor = window.document.body;

let timerId = null; 

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startChangeColorBtn.addEventListener('click', onClickChangeColor);
stopChangeColorBtn.addEventListener('click', onClickStopChangeColor);

function onClickChangeColor() {
  timerId = setInterval(() => {
    bodyChangeColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startChangeColorBtn.disabled = true; 
  stopChangeColorBtn.disabled = false; 
}

function onClickStopChangeColor() {
  clearInterval(timerId); 
  startChangeColorBtn.disabled = false; 
  stopChangeColorBtn.disabled = true; 
}
