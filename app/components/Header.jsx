import React from "react";
import logo from "../../public/Logo.png";
import styles from '../styles/Header.module.css'

export default function Header({ isOnHomepage }) {
    return (
        <header
            className={styles.header}
            style={isOnHomepage ? undefined : {backgroundColor: 'var(--highlight)'}}
        >
            <div className={styles.logo}>
                <img src="/Logo.png"
                    className={styles.logoImg}
                    alt="Cafe de Coral logo" />
            </div>

            <nav className={styles.nav} aria-label="Main navigation">
                <ul className={styles.navlist}>
                    <li><a href="index.html" className={styles.navItem}>TOP</a></li>
                    <li><a href="#" className={styles.navItem}>ABOUT</a></li>
                    <li><a href="/menu" className={styles.navItem}>MENU</a></li>
                    <li><a href="#" className={styles.navItem}>PICK UP</a></li>
                    <li><a href="#" className={styles.navItem}>NEWS</a></li>
                    <li><a href="#" className={styles.navItem}>ACCESS</a></li>
                </ul>
            </nav>
        </header>
    );
}
