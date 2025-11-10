import React, { useEffect, useRef } from "react";

/**
 * Part3CardsCarousel.jsx
 * Implements card stacks with parallax backgrounds and autoplay horizontal columns.
 * Mirrors behavior of original script_pickup part 3.
 */

export default function Part3CardsCarousel() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    function qsAll(sel, ctx = document) { return Array.from((ctx || document).querySelectorAll(sel)); }
    function qs(sel, ctx = document) { return (ctx || document).querySelector(sel); }

    function prepareCards() {
      const cards = qsAll(".card", root);
      cards.forEach(card => {
        const bg = card.dataset.bg;
        const layer = qs(".parallax-layer", card);
        if (bg && layer) {
          layer.style.backgroundImage = `url("${bg}")`;
          const img = new Image(); img.src = bg;
        }
      });
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const card = entry.target;
        if (entry.isIntersecting) card.classList.add("visible");
        else card.classList.remove("visible");
      });
    }, { threshold: 0.45 });

    function observeCards() {
      qsAll(".card", root).forEach(c => io.observe(c));
    }

    function attachParallax() {
      const cards = qsAll(".card", root);
      cards.forEach(card => {
        const layer = qs(".parallax-layer", card);
        if (!layer) return;
        let raf = null;

        function handleMove(clientX, clientY) {
          const r = card.getBoundingClientRect();
          if (!r.width || !r.height) return;
          const nx = (clientX - r.left) / r.width - 0.5;
          const ny = (clientY - r.top) / r.height - 0.5;
          const tx = Math.max(-1, Math.min(1, nx)) * 10;
          const ty = Math.max(-1, Math.min(1, ny)) * 8;
          layer.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.02)`;
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
          layer.style.transform = "";
          card.style.transform = "";
        }

        card.addEventListener("pointermove", onPointerMove, { passive: true });
        card.addEventListener("pointerleave", onLeave, { passive: true });
        card.addEventListener("pointercancel", onLeave, { passive: true });
        card.addEventListener("touchmove", onPointerMove, { passive: true });
        card.addEventListener("touchend", onLeave, { passive: true });

        card.addEventListener("focus", () => card.classList.add("center-pop"));
        card.addEventListener("blur", () => card.classList.remove("center-pop"));
      });
    }

    function initAutoplay() {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cols = qsAll(".image-col", root);
      cols.forEach(col => {
        col.style.overflowX = "auto";
        col.style.overflowY = "hidden";
        const section = col.closest(".stack-area");
        const reversed = !!(section && section.classList.contains("reverse"));
        let timer = null;
        const interval = 2800;

        function computeStep() {
          const wrapper = col.querySelector(".card-wrapper");
          if (!wrapper) return Math.round(parseFloat(getComputedStyle(root).getPropertyValue("--card-w")) || 320);
          const gap = parseInt(getComputedStyle(col).getPropertyValue("gap")) || 14;
          return Math.round(wrapper.getBoundingClientRect().width + gap);
        }

        function start() {
          stop();
          timer = setInterval(() => {
            const max = col.scrollWidth - col.clientWidth;
            const cur = col.scrollLeft;
            const step = computeStep();
            if (reversed) {
              if (cur <= 4) col.scrollTo({ left: max, behavior: "smooth" });
              else col.scrollBy({ left: -step, behavior: "smooth" });
            } else {
              if (cur >= max - 4) col.scrollTo({ left: 0, behavior: "smooth" });
              else col.scrollBy({ left: step, behavior: "smooth" });
            }
          }, interval);
        }

        function stop() { if (timer) { clearInterval(timer); timer = null; } }

        col.addEventListener("mouseenter", stop);
        col.addEventListener("mouseleave", start);
        col.addEventListener("focusin", stop);
        col.addEventListener("focusout", start);
        col.addEventListener("touchstart", stop, { passive: true });
        col.addEventListener("touchend", () => setTimeout(start, 300), { passive: true });

        setTimeout(start, 600);
      });
    }

    prepareCards();
    observeCards();
    attachParallax();
    initAutoplay();
    root.style.opacity = "1";

    return () => {
      io.disconnect();
      // listeners are per-card; GC will remove them when DOM nodes removed on unmount
    };
  }, []);

  return (
    <div className="part3-pickup-card" ref={rootRef} aria-label="Pick up cards: juices, cookies, coffees">
      <div className="part3-pickup-card-title-wrap">
        <h1 className="part3-page-title">Our Manager Recommendation</h1>
        <p className="part3-page-intro">Carefully selected favourites from our manager — small-batch pastries, signature coffees and seasonal juices chosen for taste and value. Order ahead to skip the queue and enjoy exclusive pickup offers.</p>
      </div><br />
      <section className="vertical-carousel-1 stack-area" aria-labelledby="promo-juices">
        <div className="text-col" id="promo-juices">
          <h3 className="part3-boss-recommend" style={{ display: "none" }}>our boss recommend</h3>
          <h3>Fresh Cold-Pressed Juices</h3>
          <p><strong>Beetroot Boost</strong> — earth‑sweet beetroot with hints of apple and lemon for a refreshing immune lift.</p>
          <p><strong>Tomato Vitality</strong> — vine‑ripe tomatoes with celery and black pepper for a savoury vitamin kick.</p>
          <p><strong>Sunny Orange</strong> — hand‑squeezed oranges for a bright, citrusy start to your day.</p>
          <p>Pre-order for quick pickup. Cold‑pressed daily and ready to energize your morning.</p>
        </div>

        <div className="image-col" aria-hidden="false">
          <div className="card-wrapper">
            <div tabIndex="0" className="card card--1" role="img" aria-label="Beetroot Boost juice" data-bg="/assets/images/menu/juice/juice_Beatroot.png">
              <div className="parallax-layer"></div>
              <div className="img-tag">Beetroot Boost</div>
              <div className="hover-caption">Beetroot, Apple, Lemon — 250ml</div>
              <div className="gloss" aria-hidden="true"></div>
              <div className="badge">HKD 34</div>
            </div>
          </div>

          <div className="card-wrapper">
            <div tabIndex="0" className="card card--2" role="img" aria-label="Tomato Vitality juice" data-bg="/assets/images/menu/juice/juice_Tomato.png">
              <div className="parallax-layer"></div>
              <div className="img-tag">Tomato Vitality</div>
              <div className="hover-caption">Tomato, Celery, Black Pepper — 300ml</div>
              <div className="gloss" aria-hidden="true"></div>
              <div className="badge">HKD 30</div>
            </div>
          </div>

          <div className="card-wrapper">
            <div tabIndex="0" className="card card--3" role="img" aria-label="Sunny Orange juice" data-bg="/assets/images/menu/juice/juice_Orange.png">
              <div className="parallax-layer"></div>
              <div className="img-tag">Sunny Orange</div>
              <div className="hover-caption">Fresh Orange — 300ml</div>
              <div className="gloss" aria-hidden="true"></div>
              <div className="badge">HKD 28</div>
            </div>
          </div>
        </div>
      </section><br />

      <section className="vertical-carousel-2 stack-area reverse" aria-labelledby="promo-cookies">
        <div className="image-col" aria-hidden="false">
          <div className="card-wrapper">
            <div tabIndex="0" className="card card--1" role="img" aria-label="Peanut Butter Cups cookie" data-bg="/assets/images/menu/Cookie/Cookie_PeanutButterCookieCups.png">
              <div className="parallax-layer"></div>
              <div className="img-tag">Peanut Butter Cups</div>
              <div className="hover-caption">Crunchy base, creamy peanut butter</div>
              <div className="gloss" aria-hidden="true"></div>
              <div className="badge">HKD 42</div>
            </div>
          </div>

          <div className="card-wrapper">
            <div tabIndex="0" className="card card--2" role="img" aria-label="Thumbprint Jam cookie" data-bg="/assets/images/menu/Cookie/Cookie_Thumbprint.png">
              <div className="parallax-layer"></div>
              <div className="img-tag">Thumbprint Jam</div>
              <div className="hover-caption">Buttery rounds with seasonal jam</div>
              <div className="gloss" aria-hidden="true"></div>
              <div className="badge">HKD 38</div>
            </div>
          </div>

          <div className="card-wrapper">
            <div tabIndex="0" className="card card--3" role="img" aria-label="Cinnamon Spice cookie" data-bg="/assets/images/menu/Cookie/Cookie_CinnamonCookies.png">
              <div className="parallax-layer"></div>
              <div className="img-tag">Cinnamon Spice</div>
              <div className="hover-caption">Warm cinnamon & brown sugar</div>
              <div className="gloss" aria-hidden="true"></div>
              <div className="badge">HKD 36</div>
            </div>
          </div>
        </div>

        <div className="text-col" id="promo-cookies">
          <h3>Bakery Cookies Collection</h3>
          <p><strong>Peanut Butter Cups</strong> — crunchy cookie base topped with creamy peanut butter and a chocolate finish.</p>
          <p><strong>Thumbprint Jam</strong> — buttery rounds filled with seasonal fruit preserves for a classic bite.</p>
          <p><strong>Cinnamon Spice</strong> — warm cinnamon and brown sugar make this a perfect companion to coffee.</p>
          <p>Reserve cookies for pickup — freshly baked and portioned to go.</p>
        </div>
      </section><br />

      <section className="vertical-carousel-3 stack-area" aria-labelledby="promo-coffee">
        <div className="text-col" id="promo-coffee">
          <h3>Signature Coffee Moments</h3>
          <p><strong>Irish Coffee</strong> — smooth espresso fused with hints of cream for a comforting treat.</p>
          <p><strong>Espresso</strong> — single‑origin intensity, great as a short shot or base for milk drinks.</p>
          <p><strong>Flat White</strong> — velvety microfoam over pulled espresso for a silky mouthfeel.</p>
          <p>Pre-order your coffee to skip the queue. Add a cookie for a combo discount.</p>
        </div>

        <div className="image-col" aria-hidden="false">
          <div className="card-wrapper">
            <div tabIndex="0" className="card card--1" role="img" aria-label="Irish Coffee" data-bg="/assets/images/menu/coffee/coffee_IrishCoffee.png">
              <div className="parallax-layer"></div>
              <div className="img-tag">Irish Coffee</div>
              <div className="hover-caption">Espresso, cream — 200ml</div>
              <div className="gloss" aria-hidden="true"></div>
              <div className="badge">HKD 48</div>
            </div>
          </div>

          <div className="card-wrapper">
            <div tabIndex="0" className="card card--2" role="img" aria-label="Espresso" data-bg="/assets/images/menu/coffee/coffee_Espresso.png">
              <div className="parallax-layer"></div>
              <div className="img-tag">Espresso</div>
              <div className="hover-caption">Single-origin shot</div>
              <div className="gloss" aria-hidden="true"></div>
              <div className="badge">HKD 28</div>
            </div>
          </div>

          <div className="card-wrapper">
            <div tabIndex="0" className="card card--3" role="img" aria-label="Flat White" data-bg="/assets/images/menu/coffee/coffee_FlatWhite.png">
              <div className="parallax-layer"></div>
              <div className="img-tag">Flat White</div>
              <div className="hover-caption">Silky microfoam</div>
              <div className="gloss" aria-hidden="true"></div>
              <div className="badge">HKD 38</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}