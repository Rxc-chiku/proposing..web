// Funny emojis to display
const funnyEmojis = [
  '😍', // heart eyes
  '🥰', // smiling face with hearts
  '😂', // laughing with tears
  '🤣', // rolling on the floor laughing
  '😘', // face blowing a kiss
  '🥺', // pleading face
  '🐶', // dog face
  '🐱', // cat face
  '🦄', // unicorn
  '🌈', // rainbow
  '💖', // sparkling heart
  '💕', // two hearts
];

const buttonsContainer = document.getElementById('buttons');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const funnyEmojiElement = document.getElementById('funnyEmoji');
const loveOverlay = document.getElementById('loveOverlay');
const replayBtn = document.getElementById('replayBtn');

// Start with a random funny emoji
let currentIndex = Math.floor(Math.random() * funnyEmojis.length);
funnyEmojiElement.textContent = funnyEmojis[currentIndex];

// Rotate emojis every 2 seconds while courting
let slideshowInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % funnyEmojis.length;
  funnyEmojiElement.textContent = funnyEmojis[currentIndex];
}, 2000);

// Utility to clamp values so button doesn't leave the container
function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

// Move the No button to a random position inside the buttons container
function moveNoButton() {
  const containerRect = buttonsContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 10; // safe padding inside container
  const maxLeft = containerRect.width - btnRect.width - padding;
  const maxTop = containerRect.height - btnRect.height - padding;

  const nextLeft = clamp(Math.random() * maxLeft, 0, maxLeft);
  const nextTop = clamp(Math.random() * maxTop, 0, maxTop);

  noBtn.style.left = `${nextLeft}px`;
  noBtn.style.top = `${nextTop}px`;
}

// Initial position for No button so it starts near the Yes
moveNoButton();

// When you try to hover/click No, it runs away
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('mousedown', moveNoButton);

// Also dodge when the cursor gets too close (within a radius)
document.addEventListener('mousemove', (e) => {
  const btnRect = noBtn.getBoundingClientRect();
  const cx = (btnRect.left + btnRect.right) / 2;
  const cy = (btnRect.top + btnRect.bottom) / 2;
  const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

  const dangerRadius = 120; // distance threshold to dodge
  if (dist < dangerRadius) {
    moveNoButton();
  }
});

// If she says Yes 💖
yesBtn.addEventListener('click', () => {
  loveOverlay.classList.remove('hidden');
  clearInterval(slideshowInterval);
});

// Replay the fun: hide overlay and restart slideshow
replayBtn.addEventListener('click', () => {
  loveOverlay.classList.add('hidden');
  currentIndex = Math.floor(Math.random() * funnyEmojis.length);
  funnyEmojiElement.textContent = funnyEmojis[currentIndex];
  slideshowInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % funnyEmojis.length;
    funnyEmojiElement.textContent = funnyEmojis[currentIndex];
  }, 2000);
});