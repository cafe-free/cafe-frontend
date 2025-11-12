// import Link from "next/link";
'use client';

import React, { useState } from "react";
const Logo = "/Logo.png";
import styles from '../styles/Header.module.css'


export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  return (
    <>
      <header
        id="header"
        className={`${styles.header} ${menuActive ? styles.headerActive : ""}`}
      >
        <div className={styles.headerLogo}>
          <img src={Logo} alt="Logo" />
        </div>
        <nav className={styles.headerNav}>
          <ul className={styles.headerNavlist}>
            <li className={styles.headerNavitem}>
              <a className={styles.headerNavitemLink} href="\">TOP</a>
            </li>
            <li className={styles.headerNavitem}>
              <a className={styles.headerNavitemLink} href="#about">ABOUT</a>
            </li>
            <li className={styles.headerNavitem}>
              <a className={styles.headerNavitemLink} href="\menu">MENU</a>
            </li>
            <li className={styles.headerNavitem}>
              <a className={styles.headerNavitemLink} href="#pickup">PICK UP</a>
            </li>
            <li className={styles.headerNavitem}>
              <a className={styles.headerNavitemLink} href="#news">NEWS</a>
            </li>
            <li className={styles.headerNavitem}>
              <a className={styles.headerNavitemLink} href="#access">ACCESS</a>
            </li>
            {/* {["TOP", "ABOUT", "MENU", "PICK UP", "NEWS", "ACCESS"].map((item) => (
              <li key={item} className={styles.headerNavitem}>
                <a href="#">{item}</a>
              </li>
            ))} */}
          </ul>
        </nav>
      </header>

      <button id="headerMenu" className={styles.headerMenu} onClick={toggleMenu}>
        <div
          id="headerMenuLogo"
          className={`${styles.headerMenuLogo} ${
            menuActive ? styles.headerMenuLogoActive : ""
          }`}
        >
          <div className={styles.headerMenuLogoLine}></div>
          <div className={styles.headerMenuLogoLine}></div>
          <div className={styles.headerMenuLogoLine}></div>
        </div>
      </button>
    </>
  );
}
