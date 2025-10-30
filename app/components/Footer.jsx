import React from "react";
import styles from "../styles/Footer.module.css";
import logo from "../../public/Logo.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerNav}>
        <ul className={styles.footerNavlist}>
          <li className={styles.footerNavitem}>
            <a className={styles.footerNavitemLink} href="#">ABOUT</a>
          </li>
          <li className={styles.footerNavitem}>
            <a className={styles.footerNavitemLink} href="#">MENU</a>
          </li>
          <li className={styles.footerNavitem}>
            <a className={styles.footerNavitemLink} href="#">PICK UP</a>
          </li>
          <li className={styles.footerNavitem}>
            <a className={styles.footerNavitemLink} href="#">NEWS</a>
          </li>
          <li className={styles.footerNavitem}>
            <a className={styles.footerNavitemLink} href="#">ACCESS</a>
          </li>
        </ul>
      </div>

      <div className={styles.footerLogo}>
        <div className={styles.footerLogoImg}>
          <img className={styles.footerLogoImgImage} src="/Logo.png" alt="Logo" />
        </div>
      </div>

      <div className={styles.footerCopyright}>
        <div className={styles.footerCopyrightInfo}>Cafe de Coral ©2025</div>
      </div>
    </footer>
  );
}