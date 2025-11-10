import React, { useEffect, useRef, useState } from "react";

const menuItems = [
  { name: "Sourdough Loaf", price: "HKD 48", img: "/assets/images/menu/pickup_bread1.png" },
  { name: "Signature Cheesecake", price: "HKD 68", img: "/assets/images/menu/pickup_cake1.png" },
  { name: "Chocolate Cookies (Box)", price: "HKD 120", img: "/assets/images/menu/pickup_cake2.png" },
  { name: "Buttery Croissants", price: "HKD 28", img: "/assets/images/menu/pickup_coffee1.png" },
  { name: "Single-Origin Espresso", price: "HKD 30", img: "/assets/images/menu/pickup_coffee2.png" }
];

export default function Part1MainCarousel() {
  const rootRef = useRef(null);
  const [index, setIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const autoplayTimerRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll(".card"));
    const dots = Array.from(root.querySelectorAll(".dots li"));
    const itemNameEl = root.querySelector(".item-name");
    const itemPriceEl = root.querySelector(".item-price");
    const leftBtn = root.querySelector(".nav-arrow.left");
    const rightBtn = root.querySelector(".nav-arrow.right");
    const container = root.querySelector(".carousel-container");

    function updatePositions(idx) {
      cards.forEach((card, i) => {
        const offset = (i - idx + cards.length) % cards.length;
        card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");
        if (offset === 0) card.classList.add("center");
        else if (offset === 1) card.classList.add("right-1");
        else if (offset === 2) card.classList.add("right-2");
        else if (offset === cards.length - 1) card.classList.add("left-1");
        else if (offset === cards.length - 2) card.classList.add("left-2");
        else card.classList.add("hidden");
      });
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      if (itemNameEl) itemNameEl.style.opacity = "0";
      if (itemPriceEl) itemPriceEl.style.opacity = "0";
      setTimeout(() => {
        if (itemNameEl) itemNameEl.textContent = menuItems[idx].name;
        if (itemPriceEl) itemPriceEl.textContent = menuItems[idx].price;
        if (itemNameEl) itemNameEl.style.opacity = "1";
        if (itemPriceEl) itemPriceEl.style.opacity = "1";
      }, 220);
    }

    function goTo(newIndex) {
      if (animatingRef.current) return;
      animatingRef.current = true;
      const idx = ((newIndex % cards.length) + cards.length) % cards.length;
      currentIndexRef.current = idx;
      setIndex(idx);
      updatePositions(idx);
      setTimeout(() => { animatingRef.current = false; }, 800);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimerRef.current = setInterval(() => {
        // read currentIndexRef for up-to-date index
        goTo(currentIndexRef.current + 1);
      }, 4200);
    }
    function stopAutoplay() {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    }

    // handlers
    const onLeft = () => goTo(currentIndexRef.current - 1);
    const onRight = () => goTo(currentIndexRef.current + 1);
    const onDotClick = (i) => () => goTo(i);
    const onCardClick = (i) => () => goTo(i);
    const keyHandler = (e) => {
      if (e.key === "ArrowLeft") goTo(currentIndexRef.current - 1);
      else if (e.key === "ArrowRight") goTo(currentIndexRef.current + 1);
    };

    // touch swipe
    let touchStartX = 0;
    const onTouchStart = (e) => { touchStartX = e.changedTouches[0].screenX; };
    const onTouchEnd = (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? currentIndexRef.current + 1 : currentIndexRef.current - 1);
    };

    // bind listeners
    if (leftBtn) leftBtn.addEventListener("click", onLeft);
    if (rightBtn) rightBtn.addEventListener("click", onRight);
    dots.forEach((d, i) => d.addEventListener("click", onDotClick(i)));
    cards.forEach((c, i) => c.addEventListener("click", onCardClick(i)));
    document.addEventListener("keydown", keyHandler);
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    if (container) {
      container.addEventListener("mouseenter", stopAutoplay);
      container.addEventListener("mouseleave", startAutoplay);
      container.addEventListener("focusin", stopAutoplay);
      container.addEventListener("focusout", startAutoplay);
    }

    // initialize positions and autoplay
    updatePositions(currentIndexRef.current);
    startAutoplay();

    // cleanup
    return () => {
      stopAutoplay();
      if (leftBtn) leftBtn.removeEventListener("click", onLeft);
      if (rightBtn) rightBtn.removeEventListener("click", onRight);
      dots.forEach((d, i) => d.removeEventListener("click", onDotClick(i)));
      cards.forEach((c, i) => c.removeEventListener("click", onCardClick(i)));
      document.removeEventListener("keydown", keyHandler);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchend", onTouchEnd);
      if (container) {
        container.removeEventListener("mouseenter", stopAutoplay);
        container.removeEventListener("mouseleave", startAutoplay);
        container.removeEventListener("focusin", stopAutoplay);
        container.removeEventListener("focusout", startAutoplay);
      }
    };
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ensure currentIndexRef reflects state when user code sets index directly (rare)
  useEffect(() => { currentIndexRef.current = index; }, [index]);

  return (
    <div className="part1-pickup-orginal-block" ref={rootRef} style={{ padding: 10, marginTop: 120 }}>
      <div className="pickup-block">
        <div className="carousel-container" aria-roledescription="carousel" aria-label="Pickup menu carousel">
          <button className="nav-arrow left" aria-label="Previous" title="Previous">‹</button>
          <div className="carousel-track" id="menu-track" role="list">
            {menuItems.map((m, i) => (
              <div className="card" data-index={i} key={i} role="listitem" aria-label={m.name}>
                <img src={m.img} alt={m.name} />
                <div className="card-caption">{m.name} — {m.price}</div>
              </div>
            ))}
          </div>
          <button className="nav-arrow right" aria-label="Next" title="Next">›</button>
        </div>

        <ul className="dots" id="menu-dots" aria-label="Carousel indicators">
          {menuItems.map((_, i) => (
            <li key={i} data-index={i} role="button" aria-label={`Slide ${i + 1}`} className={i === index ? "active" : ""} />
          ))}
        </ul>

        <div className="item-info">
          <h2 className="item-name">{menuItems[index].name}</h2>
          <p className="item-price">{menuItems[index].price}</p>
        </div>
      </div>
    </div>
  );
}