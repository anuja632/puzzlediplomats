

/*
 Behavior:
 - Only one .service-detail is expanded at a time.
 - Scroll wheel, arrow keys, header click, and swipe (touch) navigate step-by-step.
 - aria-expanded / aria-hidden updated for accessibility.
*/




(function () {
  const services = Array.from(document.querySelectorAll('.service'));
  let activeIndex = 0;
  let isAnimating = false;
  const ANIM_DURATION = 650; // ms (matches CSS transition)

  // Initialize: collapse all then open first
  services.forEach((s, i) => {
    const detail = s.querySelector('.service-detail');
    const header = s.querySelector('.service-header');
    header.setAttribute('aria-expanded', 'false');
    detail.setAttribute('aria-hidden', 'true');
    // click and keyboard
    header.addEventListener('click', () => focusToIndex(i));
    header.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        focusToIndex(i);
      } else if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        move(1);
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        move(-1);
      }
    });
  });

  // Open first
  openAt(activeIndex, true);

  // Wheel handling (step-by-step)
  let wheelCooldown = false;
  window.addEventListener('wheel', (e) => {
    if (wheelCooldown) return;
    if (Math.abs(e.deltaY) < 10) return;
    if (e.deltaY > 0) move(1);
    else move(-1);

    wheelCooldown = true;
    setTimeout(() => wheelCooldown = false, ANIM_DURATION + 50);
  }, {passive: true});

  // Arrow keys
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
  });

  // Touch swipe (basic)
  let touchStartY = null;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches ? e.touches[0].clientY : null;
  }, {passive: true});

  window.addEventListener('touchend', (e) => {
    if (touchStartY === null) return;
    const endY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : null;
    if (endY === null) { touchStartY = null; return; }
    const diff = touchStartY - endY;
    if (Math.abs(diff) > 30) {
      if (diff > 0) move(1);
      else move(-1);
    }
    touchStartY = null;
  }, {passive: true});

  // Public move function (delta: 1 or -1)
  function move(delta) {
    const newIndex = Math.max(0, Math.min(services.length - 1, activeIndex + delta));
    if (newIndex === activeIndex) return;
    openAt(newIndex);
  }

  // Focus to a given index (expand)
  function focusToIndex(index) {
    if (index === activeIndex) return; // already open
    openAt(index);
    // put focus on the header of opened item for accessibility
    services[index].querySelector('.service-header').focus({preventScroll:true});
  }

  // Open detail at index, close others
  function openAt(index, instant=false) {
    if (isAnimating) return;
    isAnimating = true;
    const prev = services[activeIndex];
    const next = services[index];

    // close previous
    if (prev) {
      const prevHeader = prev.querySelector('.service-header');
      const prevDetail = prev.querySelector('.service-detail');
      prevHeader.setAttribute('aria-expanded','false');
      prevDetail.classList.remove('active');
      prevDetail.setAttribute('aria-hidden','true');
    }

    // open next
    if (next) {
      const nextHeader = next.querySelector('.service-header');
      const nextDetail = next.querySelector('.service-detail');
      nextHeader.setAttribute('aria-expanded','true');
      nextDetail.classList.add('active');
      nextDetail.setAttribute('aria-hidden','false');

      // scroll to ensure header is visible (smooth)
      if (!instant) {
        // Try to bring header to top of container area (with margin)
        const headerRect = nextHeader.getBoundingClientRect();
        const offsetTop = headerRect.top + window.scrollY - 24;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }

    activeIndex = index;

    // Unlock after animation
    setTimeout(() => {
      isAnimating = false;
    }, instant ? 10 : ANIM_DURATION + 20);
  }

  // Optional: expose functions for debugging
  window.__servicesUI = { move, focusToIndex, openAt };
})();


