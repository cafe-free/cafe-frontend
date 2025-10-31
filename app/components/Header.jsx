import React from "react";
import Link from "next/link";
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
                    <Link href="/" className={styles.navItem}>TOP</Link>
                    <li><a href="#" className={styles.navItem}>ABOUT</a></li>
                    <Link href="/menu" className={styles.navItem}>MENU</Link>
                    <li><a href="#" className={styles.navItem}>PICK UP</a></li>
                    <li><a href="#" className={styles.navItem}>NEWS</a></li>
                    <li><a href="#" className={styles.navItem}>ACCESS</a></li>
                </ul>
            </nav>
        </header>
    );
}
