// Floating hearts
const heartsContainer = document.getElementById('hearts');
const heartCount = 15;

function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDelay = Math.random() * 8 + 's';
  heart.style.animationDuration = 6 + Math.random() * 4 + 's';
  heart.style.fontSize = (0.85 + Math.random() * 0.9) + 'rem';
  heartsContainer.appendChild(heart);

  heart.addEventListener('animationend', () => {
    heart.remove();
    createHeart();
  });
}

for (let i = 0; i < heartCount; i++) {
  setTimeout(createHeart, i * 400);
}

// Floating hearts only (active nav link is set by .active class on each page)
