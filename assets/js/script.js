    // Pause animation on hover for all carousels
    document.querySelectorAll('.carousel-track').forEach(track => {
      track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
      });
      track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
      });
    });
    const words = ["Revenue", "Profit", "Results", "Growth"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
const rotWord = document.getElementById("rotWord");
const typingSpeed = 150; // ms per letter
const delayBetweenWords = 1500; // pause after full word

function type() {
  currentWord = words[i];
  
  if (!isDeleting) {
    rotWord.textContent = currentWord.substring(0, j + 1);
    j++;
    
    if (j === currentWord.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenWords);
      return;
    }
  } else {
    rotWord.textContent = currentWord.substring(0, j - 1);
    j--;
    
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
    }
  }
  
  setTimeout(type, typingSpeed);
}

type();
const services = document.querySelectorAll('.service');
let activeIndex = 0;
let isScrolling = false;

// Show first section on load
services[0].querySelector('.service-detail').classList.add('active');

window.addEventListener('wheel', (e) => {
  if (isScrolling) return; // prevent rapid scroll triggers
  isScrolling = true;

  if (e.deltaY > 0 && activeIndex < services.length - 1) {
    // Scroll down
    services[activeIndex].querySelector('.service-detail').classList.remove('active');
    activeIndex++;
    services[activeIndex].querySelector('.service-detail').classList.add('active');
  } else if (e.deltaY < 0 && activeIndex > 0) {
    // Scroll up
    services[activeIndex].querySelector('.service-detail').classList.remove('active');
    activeIndex--;
    services[activeIndex].querySelector('.service-detail').classList.add('active');
  }

  // Allow next scroll after animation (700ms)
  setTimeout(() => {
    isScrolling = false;
  }, 700);
});
