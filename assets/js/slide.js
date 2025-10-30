 
 function animateCounter(counter) {
      const target = +counter.getAttribute('data-target');
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / target));
      let count = 0;

      const timer = setInterval(() => {
        count += 1;
        counter.textContent = count + "+";
        if (count >= target) {
          clearInterval(timer);
          counter.textContent = target + "+";
        }
      }, stepTime);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = document.querySelectorAll('.counter');
          counters.forEach(counter => animateCounter(counter));
          observer.disconnect(); // runs only once
        }
      });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.overview-section'));
    
    