import React, { useEffect, useRef } from "react";

/**
 * Part2SectionCarousel.jsx
 * Converts horizontal list carousels with center emphasis + autoplay.
 * Implementation follows original behavior: horizontal scroll, autoplay, left-tight rule.
 */

function Section({ id, title, items, direction = "ltr", startOffset = undefined }) {
  return (
    <section id={id} className="carousel-section" data-direction={direction} data-start-offset={startOffset}>
      <h2 className="section-title">{title}</h2>
      <div className="carousel-container">
        <div className="carousel-viewport" tabIndex="0" role="group" aria-label={`${title} carousel`}>
          <ul className="carousel-list">
            {items.map((it, i) => (
              <li className="carousel-item" key={i}>
                <img src={it.img} alt={it.alt} />
                <div className="badge">{it.price}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function Part2SectionCarousel() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Ensure rtl/ltr layout and set padding (left-tight rule for data-start-offset="0")
    const sections = Array.from(root.querySelectorAll(".carousel-section"));
    sections.forEach(section => {
      const dir = (section.getAttribute("data-direction") || "ltr").toLowerCase();
      const container = section.querySelector(".carousel-container");
      const viewport = container.querySelector(".carousel-viewport");
      const list = container.querySelector(".carousel-list");
      const items = Array.from(list.children);
      if (dir === "rtl") list.style.flexDirection = "row-reverse";
      else list.style.flexDirection = "";

      // compute step and autoplay behavior similar to original
      let autoplayTimer = null;
      const gap = parseInt(getComputedStyle(list).getPropertyValue("gap")) || 25;
      const step = () => {
        const item = items[0];
        return item ? Math.round(item.getBoundingClientRect().width + gap) : 260;
      };

      function doNext() {
        const max = viewport.scrollWidth - viewport.clientWidth;
        const cur = viewport.scrollLeft;
        if ((dir === "ltr" && cur >= max - 4) || (dir === "rtl" && cur <= 4)) {
          if (dir === "rtl") viewport.scrollTo({ left: max, behavior: "smooth" });
          else viewport.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const amt = dir === "rtl" ? -step() : step();
          viewport.scrollBy({ left: amt, behavior: "smooth" });
        }
      }

      function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(doNext, 3000);
      }
      function stopAutoplay() { if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; } }

      viewport.addEventListener("mouseenter", stopAutoplay);
      viewport.addEventListener("mouseleave", startAutoplay);
      viewport.addEventListener("focusin", stopAutoplay);
      viewport.addEventListener("focusout", startAutoplay);

      // swipe handling
      (function addSwipe() {
        let sx = 0, st = 0;
        viewport.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; st = Date.now(); stopAutoplay(); }, { passive: true });
        viewport.addEventListener("touchend", (e) => {
          const dx = e.changedTouches[0].clientX - sx; const dt = Date.now() - st;
          if (Math.abs(dx) > 40 && dt < 600) { if (dx < 0) doNext(); else viewport.scrollBy({ left: -step(), behavior: 'smooth' }); }
          startAutoplay();
        }, { passive: true });
      })();

      // center detection (closest to viewport center)
      function updateCenter() {
        const rect = viewport.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        let closest = null, minD = Infinity;
        items.forEach(it => it.classList.remove("center-pop"));
        items.forEach(it => {
          const r = it.getBoundingClientRect(); const cx = r.left + r.width / 2; const d = Math.abs(cx - centerX);
          if (d < minD) { minD = d; closest = it; }
        });
        if (closest) closest.classList.add("center-pop");
      }
      viewport.addEventListener("scroll", () => requestAnimationFrame(updateCenter), { passive: true });
      window.addEventListener("resize", () => requestAnimationFrame(updateCenter));
      setTimeout(updateCenter, 120);

      // initial left-tight handling
      if (section.getAttribute("data-start-offset") === "0") {
        viewport.style.paddingLeft = "0px";
      }

      // start autoplay after images load
      const imgs = items.map(i => i.querySelector("img")).filter(Boolean);
      if (imgs.length === 0) { startAutoplay(); updateCenter(); }
      else {
        let loaded = 0;
        imgs.forEach(img => {
          if (img.complete) { loaded++; if (loaded === imgs.length) startAutoplay(); }
          else {
            img.addEventListener("load", () => { loaded++; if (loaded === imgs.length) startAutoplay(); }, { once: true });
            img.addEventListener("error", () => { loaded++; if (loaded === imgs.length) startAutoplay(); }, { once: true });
          }
        });
      }

      // cleanup when unmount - intervals removed at top-level return
      // store references for later if needed
    });

    return () => {
      // Clear all timers by cloning nodes or similar if needed
      const viewports = Array.from(root.querySelectorAll(".carousel-viewport"));
      viewports.forEach(vp => {
        vp.removeEventListener("mouseenter", () => {});
        vp.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  const cakes = [
    { img: "/assets/images/menu/cake/Cake_ChocolateCupCakes.png", alt: "Chocolate Cupcakes", price: "HKD 45" },
    { img: "/assets/images/menu/cake/Cake_BananaWalnutLoaf.png", alt: "Banana Walnut Loaf", price: "HKD 50" },
    { img: "/assets/images/menu/cake/Cake_TiramisuDelight.png", alt: "Tiramisu Delight", price: "HKD 55" },
    { img: "/assets/images/menu/cake/Cake_BlackTeaCake.png", alt: "Black Tea Cake", price: "HKD 48" },
    { img: "/assets/images/menu/cake/Cake_RedVelvetRoyale.png", alt: "Red Velvet Royale", price: "HKD 60" },
    { img: "/assets/images/menu/cake/Cake_OperaSlice.png", alt: "Opera Slice", price: "HKD 52" },
  ];

  const teas = [
    { img: "/assets/images/menu/tea/tea_Lemontea.png", alt: "Lemon Tea", price: "HKD 30" },
    { img: "/assets/images/menu/tea/tea_Greentea.png", alt: "Green Tea", price: "HKD 28" },
    { img: "/assets/images/menu/tea/tea_Gingertea.png", alt: "Ginger Tea", price: "HKD 32" },
    { img: "/assets/images/menu/tea/tea_Whitetea.png", alt: "White Tea", price: "HKD 30" },
    { img: "/assets/images/menu/tea/tea_Blacktea.png", alt: "Black Tea", price: "HKD 33" },
    { img: "/assets/images/menu/tea/tea_Jasmine.png", alt: "Jasmine Tea", price: "HKD 31" },
  ];

  const coffees = [
    { img: "/assets/images/menu/coffee/coffee_Espresso.png", alt: "Espresso", price: "HKD 25" },
    { img: "/assets/images/menu/coffee/coffee_Cappuccino.png", alt: "Cappuccino", price: "HKD 35" },
    { img: "/assets/images/menu/coffee/coffee_Latte.png", alt: "Latte", price: "HKD 38" },
    { img: "/assets/images/menu/coffee/coffee_Mocha.png", alt: "Mocha", price: "HKD 40" },
    { img: "/assets/images/menu/coffee/coffee_IrishCoffee.png", alt: "Irish Coffee", price: "HKD 48" },
    { img: "/assets/images/menu/coffee/coffee_FlatWhite.png", alt: "Flat White", price: "HKD 38" },
  ];

  const juices = [
    { img: "/assets/images/menu/juice/juice_Beatroot.png", alt: "Beetroot Boost", price: "HKD 34" },
    { img: "/assets/images/menu/juice/juice_Tomato.png", alt: "Tomato Vitality", price: "HKD 30" },
    { img: "/assets/images/menu/juice/juice_Orange.png", alt: "Sunny Orange", price: "HKD 28" },
    { img: "/assets/images/menu/juice/juice_Kiwi.png", alt: "Kiwi Kick", price: "HKD 36" },
    { img: "/assets/images/menu/juice/juice_Mongo.png", alt: "Mango Delight", price: "HKD 39" },
    { img: "/assets/images/menu/juice/juice_Watermelon.png", alt: "Watermelon Delight", price: "HKD 42" },
  ];

  return (
    <div className="part2-pickup-container" ref={rootRef}>
      <div className="title-wrap">
        <h1 className="page-title">Pick Up Specials</h1>
        <p className="page-intro">Signature drinks and limited‑edition pastries prepped for pickup.</p>
      </div>

      <Section id="p2-carousel-cakes" title="Trending Cakes" items={cakes} direction="ltr" startOffset={0} />
      <Section id="p2-carousel-tea" title="Refreshing Teas" items={teas} direction="rtl" />
      <Section id="p2-carousel-coffees" title="Trending Coffees" items={coffees} direction="ltr" />
      <Section id="p2-carousel-Juices" title="Trending Juices" items={juices} direction="rtl" />
    </div>
  );
}