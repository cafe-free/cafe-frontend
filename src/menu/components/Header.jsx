import React from "react";
import logo from "../../assets/images/Logo.png"

export default function Header() {
    return (
      <header className="header" style={{ background: '#374063', color: '#fff' }}>
        <div className="header-logo">
          <img src={logo} alt="Cafe de Coral logo" />
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
    )
}
