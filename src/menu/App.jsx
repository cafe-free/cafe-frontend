import React from 'react';

export function App() {
  return (
    <>
      <header className="header" style={{ background: '#374063', color: '#fff' }}>
        <div className="header-logo">
          <img src="./src/assets/images/Logo.png" alt="Cafe de Coral logo" />
        </div>
        <nav className="header-nav" aria-label="Main navigation">
          <ul className="header-navlist">
            <li><a href="index.html">TOP</a></li>
            <li><a href="#">ABOUT</a></li>
            <li><a href="menu.html">MENU</a></li>
            <li><a href="pick_up.html">PICK UP</a></li>
            <li><a href="#">NEWS</a></li>
            <li><a href="#">ACCESS</a></li>
          </ul>
        </nav>
      </header>

      <div className="menu-hero-image">
        <h1 className="menu-hero-title">Menu</h1>
      </div>

      <div className="menu-container">
        <nav className="menu-category-list">
          <ul>
            <li className="menu-category">Categories</li>
            <div className="food-drinks">
              <li>Food</li>
            </div>
            <div className="food-drinks selected-menu-subcategory">
              <li>Drinks</li>
            </div>
            <hr />
            <li className="selected-menu-subcategory">Subcategory 1</li>
            <li>Subcategory 2</li>
            <li>Subcategory 3</li>
            <li>Subcategory 4</li>
            <li>Subcategory 5</li>
            <li>Subcategory 6</li>
          </ul>
        </nav>

        <div className="cards-container">
          <MenuSection title="Coffee" />
          <MenuSection title="Tea" />
        </div>
      </div>

      <footer className="footer">
        <div className="footer-nav">
          <ul className="footer-navlist">
            <li className="footer-navitem"><a href="#">ABOUT</a></li>
            <li className="footer-navitem"><a href="#">MENU</a></li>
            <li className="footer-navitem"><a href="#">PICK UP</a></li>
            <li className="footer-navitem"><a href="#">NEWS</a></li>
            <li className="footer-navitem"><a href="#">ACCESS</a></li>
          </ul>
        </div>
        <div className="footer-logo">
          <div className="footer-logo-img">
            <img src="./src/assets/images/Logo.png" alt="" />
          </div>
        </div>
        <div className="footer-copyright">
          <div className="footer-copyright-infor">Cafe de Coral ©2025</div>
        </div>
      </footer>
    </>
  );
}

function MenuSection({ title }) {
  return (
    <div className="menu-card-container">
      <div className="menu-subcategory-title">
        <h2>{title}</h2>
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="menu-card" key={`${title}-${index}`}>
          <div>
            <img src="https://picsum.photos/300/?random=10" alt="Menu Item" />
          </div>
          <div className="menu-card-content">
            <p className="menu-card-title">Delicious Dish</p>
            <p className="menu-card-price">HKD 50</p>
          </div>
        </div>
      ))}
    </div>
  );
}


