import React from "react";
import logo from "../../public/Logo.png";

export default function Footer() {
    return (
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
                    <img src="/Logo.png" alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <div className="footer-copyright-infor">Cafe de Coral ©2025</div>
            </div>
        </footer>
    );
}