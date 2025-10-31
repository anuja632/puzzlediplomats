document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".workflow-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    grabCursor: true,

    // ✅ Autoplay added
    autoplay: {
      delay: 3000, // time between slides (in ms)
      disableOnInteraction: false, // keeps autoplay after user interaction
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    observer: true,
    observeParents: true,

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 1000; // 1 second animation
  const frameRate = 30;
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let currentFrame = 0;

  const counterAnimation = setInterval(() => {
    currentFrame++;
    const progress = currentFrame / totalFrames;
    const currentValue = Math.round(target * progress);
    counter.textContent = currentValue + "+";

    if (currentFrame >= totalFrames) {
      clearInterval(counterAnimation);
      counter.textContent = target + "+";
    }
  }, 1000 / frameRate);
}
// Optional: Restart animations on tab visibility change
document.addEventListener("visibilitychange", () => {
  const carousels = document.querySelectorAll(".carousel-track");
  carousels.forEach(track => {
    track.style.animationPlayState = document.hidden ? "paused" : "running";
  });
});


// Generic observer function that works for any section
function observeCounters(sectionSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return; // safety check

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = section.querySelectorAll('.counter');
        counters.forEach(counter => animateCounter(counter));
        observer.disconnect(); // only run once
      }
    });
  }, { threshold: 0.4 });

  observer.observe(section);
}

// Activate counters for both sections
observeCounters('.overview-section');
observeCounters('.about-section');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollTopBtn.classList.add('show-scroll');
    } else {
      scrollTopBtn.classList.remove('show-scroll');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  const members = document.querySelectorAll(".team-member");

function showOnScroll() {
  members.forEach(member => {
    const rect = member.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      member.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", showOnScroll);
showOnScroll();


    
    
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
