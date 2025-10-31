 var swiper = new Swiper(".servicesSwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
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
window.addEventListener("scroll", () => {
  const steps = document.querySelectorAll(".timeline-step");
  const connectors = document.querySelectorAll(".timeline-connector");
  const windowHeight = window.innerHeight;

  steps.forEach((step, index) => {
    const rect = step.getBoundingClientRect();
    const visible = rect.top < windowHeight * 0.8;

    if (visible) {
      step.classList.add("active");

      // Animate connector below this icon
      if (connectors[index]) {
        connectors[index].querySelector("::after");
        connectors[index].style.setProperty("--fill", "1");
        connectors[index].classList.add("fill");
      }
    } else {
      step.classList.remove("active");

      if (connectors[index]) {
        connectors[index].classList.remove("fill");
      }
    }
  });
});



const services = document.querySelectorAll('.service-detail');
const headers = document.querySelectorAll('.service-header');
const section = document.querySelector('#what-we-do');
const scrollCircle = document.querySelector('#scrollCircle');

let activeIndex = 0;
let autoScrollStarted = false;
let autoScrollDownDone = false;
let autoScrollUpDone = false;
let lastScrollY = 0;

// Initialize first service visible
services[0].classList.add('active');
headers[0].classList.add('active-header');

window.addEventListener('scroll', () => {
  const rect = section.getBoundingClientRect();
  const halfway = window.innerHeight / 2;
  const scrollingDown = window.scrollY > lastScrollY;
  lastScrollY = window.scrollY;

  // Section visible
  if (rect.top < halfway && rect.bottom > halfway) {
    scrollCircle.classList.add('show');

    // From top → bottom
    if (scrollingDown && !autoScrollStarted && !autoScrollDownDone) {
      autoScrollStarted = true;
      startAutoScroll('down');
    }

    // From bottom → top
    if (!scrollingDown && !autoScrollStarted && !autoScrollUpDone) {
      autoScrollStarted = true;
      startAutoScroll('up');
    }
  } else {
    scrollCircle.classList.remove('show');
  }
});

function startAutoScroll(direction) {
  const total = services.length;
  const delay = 2000;

  let index = direction === 'down' ? 0 : total - 1;

  function showService() {
    // clear all
    services.forEach((s) => s.classList.remove('active'));
    headers.forEach((h) => h.classList.remove('active-header'));

    // activate
    services[index].classList.add('active');
    headers[index].classList.add('active-header');

    if (direction === 'down' && index < total - 1) {
      index++;
      setTimeout(showService, delay);
    } else if (direction === 'up' && index > 0) {
      index--;
      setTimeout(showService, delay);
    } else {
      // Mark done and stop autoplay
      if (direction === 'down') autoScrollDownDone = true;
      if (direction === 'up') autoScrollUpDone = true;
      autoScrollStarted = false;
    }
  }

  showService();
}

// Manual scroll control after autoplay done
window.addEventListener('wheel', (e) => {
  if (!autoScrollDownDone && !autoScrollUpDone) return;

  services.forEach((s) => s.classList.remove('active'));
  headers.forEach((h) => h.classList.remove('active-header'));

  if (e.deltaY > 0) {
    activeIndex = Math.min(activeIndex + 1, services.length - 1);
  } else {
    activeIndex = Math.max(activeIndex - 1, 0);
  }

  services[activeIndex].classList.add('active');
  headers[activeIndex].classList.add('active-header');
});


