import React from "react";
import "../assets/css/footer.css";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-nav">
        <ul className="footer-navlist">
          <li className="footer-navitem"><a href="/about">ABOUT</a></li>
          <li className="footer-navitem"><a href="/menu">MENU</a></li>
          <li className="footer-navitem"><a href="/pickup">PICK UP</a></li>
          <li className="footer-navitem"><a href="/news">NEWS</a></li>
          <li className="footer-navitem"><a href="/access">ACCESS</a></li>
        </ul>
      </div>

      <div className="footer-logo">
        <div className="footer-logo-img">
          <img src="/assets/images/Logo.png" alt="Logo" />
        </div>
      </div>

      <div className="footer-copyright">
        <div className="footer-copyright-infor">Cafe de Coral ©2025</div>
      </div>
    </footer>
  );
}
