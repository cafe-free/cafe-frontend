import React from "react";
import "../assets/css/header.css";

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-Logo">
        <img src="/assets/images/Logo.png" alt="Logo" />
      </div>
      <nav className="header-nav" aria-label="Main navigation">
        <ul className="header-navlist">
          <li className="header-navitem"><a href="/">TOP</a></li>
          <li className="header-navitem"><a href="/about">ABOUT</a></li>
          <li className="header-navitem"><a href="/menu">MENU</a></li>
          <li className="header-navitem"><a href="/pickup">PICK UP</a></li>
          <li className="header-navitem"><a href="/news">NEWS</a></li>
          <li className="header-navitem"><a href="/access">ACCESS</a></li>
        </ul>
      </nav>
    </header>
  );
}