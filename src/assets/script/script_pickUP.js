// Configuration: scroll speed (pixels per frame) per carousel
const speedMap = {
  carousel1: 0.5,
  carousel2: 0.7,
  carousel3: 0.6,
  carousel4: 0.8
};

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".carousel-section");

  sections.forEach((section) => {
    const list = section.querySelector(".carousel-list");
    const direction = section.dataset.direction; // 'ltr' or 'rtl'
    const speed = speedMap[section.id] || 0.1;

    // Clone items for infinite scroll
    const items = Array.from(list.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      list.appendChild(clone);
    });

    // Auto-scroll setup
    let frameId;
    function autoScroll() {
      if (direction === "ltr") {
        list.scrollLeft += speed;
        if (list.scrollLeft >= list.scrollWidth / 2) {
          list.scrollLeft = 0;
        }
      } else {
        list.scrollLeft -= speed;
        if (list.scrollLeft <= 0) {
          list.scrollLeft = list.scrollWidth / 2;
        }
      }
      frameId = requestAnimationFrame(autoScroll);
    }
    autoScroll();

    // Pause/resume on hover
    section.addEventListener("mouseenter", () => cancelAnimationFrame(frameId));
    section.addEventListener("mouseleave", autoScroll);

    // Center-emphasis via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "center",
            entry.intersectionRatio > 0.5
          );
        });
      },
      {
        root: list,
        threshold: 0.5
      }
    );

    // Observe each item for center emphasis
    list.querySelectorAll(".carousel-item").forEach((item) => {
      observer.observe(item);
    });
  });
});



// // PART 1. pickup-block



// PART 2. pickup block continwe



// PART 3. pick up special
/* Scoped JS for part3-pickup-card only — sets backgrounds, preloads images, reveals on Intersection, parallax on pointer */

(function () {
  const root = document.querySelector('.part3-pickup-card');
  if (!root) return;

  // ---- Helpers ----
  function qsAll(sel, ctx = document) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function qs(sel, ctx = document) { return (ctx || document).querySelector(sel); }

  // ---- Prepare cards (set parallax-layer bg + preload) ----
  function prepareCards() {
    const cards = qsAll('.card', root);
    cards.forEach(card => {
      const bg = card.dataset.bg;
      const layer = qs('.parallax-layer', card);
      if (bg && layer) {
        // set as background-image on layer
        layer.style.backgroundImage = `url("${bg}")`;
        // preload
        const img = new Image();
        img.src = bg;
        img.onload = img.onerror = () => { card.dataset.loaded = "true"; };
      }
    });
  }

  // ---- IntersectionObserver for reveal ----
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const card = entry.target;
      if (entry.isIntersecting) card.classList.add('visible');
      else card.classList.remove('visible');
    });
  }, { threshold: 0.45 });

  function observeCards() {
    qsAll('.card', root).forEach(c => io.observe(c));
  }

  // ---- Per-card parallax (pointer & touch) ----
  function attachParallax() {
    const cards = qsAll('.card', root);
    cards.forEach(card => {
      const layer = qs('.parallax-layer', card);
      if (!layer) return;

      // pointer/touch move handler, constrained and throttled by requestAnimationFrame
      let raf = null;
      function handleMove(clientX, clientY) {
        const r = card.getBoundingClientRect();
        // avoid division by zero
        if (!r.width || !r.height) return;
        const nx = (clientX - r.left) / r.width - 0.5;
        const ny = (clientY - r.top) / r.height - 0.5;
        const tx = Math.max(-1, Math.min(1, nx)) * 10; // px
        const ty = Math.max(-1, Math.min(1, ny)) * 8;  // px
        layer.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.02)`;
        // subtle card tilt/scale while hovering
        card.style.transform = `translateY(0) scale(1.01) rotateY(${Math.max(-1, Math.min(1, nx)) * 6}deg)`;
      }

      function onPointerMove(e) {
        const clientX = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX);
        const clientY = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY);
        if (clientX == null || clientY == null) return;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => handleMove(clientX, clientY));
      }

      function onLeave() {
        if (raf) cancelAnimationFrame(raf);
        layer.style.transform = '';
        card.style.transform = '';
      }

      card.addEventListener('pointermove', onPointerMove, { passive: true });
      card.addEventListener('pointerleave', onLeave, { passive: true });
      card.addEventListener('pointercancel', onLeave, { passive: true });
      card.addEventListener('touchmove', onPointerMove, { passive: true });
      card.addEventListener('touchend', onLeave, { passive: true });

      // keyboard focus visual behavior
      card.addEventListener('focus', () => card.classList.add('center-pop'));
      card.addEventListener('blur', () => card.classList.remove('center-pop'));
      card.addEventListener('focusin', () => {
        const cap = qs('.hover-caption', card);
        if (cap) { cap.style.opacity = '1'; cap.style.transform = 'translateY(0)'; }
      });
      card.addEventListener('focusout', () => {
        const cap = qs('.hover-caption', card);
        if (cap) { cap.style.opacity = ''; cap.style.transform = ''; }
      });
    });
  }

  // ---- Accessibility helpers ----
  function accessibility() {
    const cards = qsAll('.card', root);
    cards.forEach((c) => {
      // ensure focusable (if not already)
      if (!c.hasAttribute('tabindex')) c.setAttribute('tabindex', '0');
      c.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          c.classList.toggle('visible');
        }
      });
    });
  }

  // ---- Fallback initial reveal ----
  function revealInitial() {
    qsAll('.card', root).forEach((c, i) => setTimeout(() => c.classList.add('visible'), 120 + i * 80));
  }

  // ---- Autoplay for horizontal image columns ----
  function initAutoplay() {
    // Respect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cols = qsAll('.image-col', root);
    cols.forEach(col => {
      // ensure only horizontal scrollbar shows
      col.style.overflowX = 'auto';
      col.style.overflowY = 'hidden';

      // detect if parent section has .reverse class -> visual reversed (play right->left)
      const section = col.closest('.stack-area');
      const reversed = !!(section && section.classList.contains('reverse'));

      let timer = null;
      const interval = 2800;

      function computeStep() {
        const wrapper = col.querySelector('.card-wrapper');
        if (!wrapper) return Math.round(parseFloat(getComputedStyle(root).getPropertyValue('--card-w')) || 320);
        const gap = parseInt(getComputedStyle(col).getPropertyValue('gap')) || 14;
        return Math.round(wrapper.getBoundingClientRect().width + gap);
      }

      function start() {
        stop();
        timer = setInterval(() => {
          const max = col.scrollWidth - col.clientWidth;
          const cur = col.scrollLeft;
          const step = computeStep();
          if (reversed) {
            // visual: right -> left
            if (cur <= 4) col.scrollTo({ left: max, behavior: 'smooth' });
            else col.scrollBy({ left: -step, behavior: 'smooth' });
          } else {
            // visual: left -> right
            if (cur >= max - 4) col.scrollTo({ left: 0, behavior: 'smooth' });
            else col.scrollBy({ left: step, behavior: 'smooth' });
          }
        }, interval);
      }

      function stop() { if (timer) { clearInterval(timer); timer = null; } }

      // Pause/resume interactions
      col.addEventListener('mouseenter', stop);
      col.addEventListener('mouseleave', start);
      col.addEventListener('focusin', stop);
      col.addEventListener('focusout', start);
      col.addEventListener('touchstart', stop, { passive: true });
      col.addEventListener('touchend', () => setTimeout(start, 300), { passive: true });

      // Start autoplay after a short delay so layout stabilizes
      setTimeout(start, 600);
    });
  }

  // ---- Init sequence ----
  function init() {
    prepareCards();
    observeCards();
    attachParallax();
    accessibility();
    revealInitial();
    initAutoplay();
    // reveal container
    root.style.opacity = '1';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else init();

  // recompute backgrounds/presets on resize
  let resizeTid = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTid);
    resizeTid = setTimeout(() => {
      prepareCards();
    }, 160);
  });

})();
