// Set your engagement date here (YYYY-MM-DD HH:MM:SS format)
//const targetDate = new Date("2025-08-25 18:00:00").getTime();
const targetDate = new Date(new Date().getTime() + 10000).getTime(); 

const countdownEl = document.getElementById("countdown");
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");
const loveMessage = document.getElementById("loveMessage");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    countdownEl.innerHTML = "00:00:00";
    surpriseBtn.classList.remove("hidden");
    return;
  }

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000*60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = 
    `${hours.toString().padStart(2,'0')}:` +
    `${minutes.toString().padStart(2,'0')}:` +
    `${seconds.toString().padStart(2,'0')}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Surprise button action
surpriseBtn.addEventListener("click", () => {
  surpriseBtn.classList.add("hidden");
  surpriseMessage.classList.remove("hidden");

  // Customisable message
  loveMessage.textContent = "You are my everything ❤️ Forever begins with you.";

  // Confetti animation
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
});
