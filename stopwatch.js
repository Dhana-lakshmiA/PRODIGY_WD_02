let [seconds, minutes, hours] = [0, 0, 0];
let display = document.getElementById("display-format");
let timer = null;
const beep = document.getElementById("beep");

function playBeepSound() {
  beep.currentTime = 0;
  beep.play();
}

function stopBeepSound() {
  beep.pause();
  beep.currentTime = 0;
}

function updateDisplay() {
  // Flash effect
  display.style.opacity = 0.6;
  setTimeout(() => (display.style.opacity = 1), 150);

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function startTimer() {
  if (timer !== null) return;

  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
    updateDisplay();
    playBeepSound();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
  stopBeepSound();
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  [seconds, minutes, hours] = [0, 0, 0];
  updateDisplay();
  document.getElementById("lap").innerHTML = "";
  stopBeepSound();
}

function lapTimer() {
  const lapList = document.getElementById("lap");
  const li = document.createElement("li");
  li.textContent = display.innerText;
  lapList.appendChild(li);

  // Optional: play short beep for lap
  beep.currentTime = 0;
  beep.play();
}
