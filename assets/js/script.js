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

const services = document.querySelectorAll('.service-detail');
const headers = document.querySelectorAll('.service-header');
const section = document.querySelector('#what-we-do');
const scrollCircle = document.querySelector('#scrollCircle');

let activeIndex = 0;
let isScrolling = false;

// initialize first visible
services[0].classList.add('active');
headers[0].classList.add('active-header');

// show scroll circle when section in view
window.addEventListener('scroll', () => {
  const rect = section.getBoundingClientRect();
  const halfway = window.innerHeight / 2;

  if (rect.top < halfway && rect.bottom > halfway) {
    scrollCircle.classList.add('show');
  } else {
    scrollCircle.classList.remove('show');
  }
});

// handle scroll reveal
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  isScrolling = true;

  // hide all details + reset headers
  services.forEach(s => s.classList.remove('active'));
  headers.forEach(h => h.classList.remove('active-header'));

  if (e.deltaY > 0) {
    // scroll down
    activeIndex = Math.min(activeIndex + 1, services.length - 1);
  } else {
    // scroll up
    activeIndex = Math.max(activeIndex - 1, 0);
  }

  // activate current detail + header
  services[activeIndex].classList.add('active');
  headers[activeIndex].classList.add('active-header');

  setTimeout(() => (isScrolling = false), 1000);
});

// reset when leaving section
window.addEventListener('scroll', () => {
  const rect = section.getBoundingClientRect();
  if (rect.bottom < 0) {
    activeIndex = 0;
    services.forEach(s => s.classList.remove('active'));
    headers.forEach(h => h.classList.remove('active-header'));
    services[0].classList.add('active');
    headers[0].classList.add('active-header');
  }
});

   //>> Testimonial Slider2 Start <<//
    if($('.testimonial-slider2').length > 0) {
        const testimonialSlider2 = new Swiper(".testimonial-slider2", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: ".array-prev",
                nextEl: ".array-next",
            },
            breakpoints: {
                1199: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }
