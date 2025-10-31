import React from "react";
import Link from "next/link";
import logo from "../../public/Logo.png";
import styles from '../styles/Header.module.css'

export default function Header({ isOnHomepage }) {
    return (
        <header
            className={styles.header}
            style={isOnHomepage ? {position: 'absolute'} : {backgroundColor: 'var(--highlight)'}}
        >
            <div className={styles.logo}>
                <img src="/Logo.png"
                    className={styles.logoImg}
                    alt="Cafe de Coral logo" />
            </div>

            <nav className={styles.nav} aria-label="Main navigation">
                <ul className={styles.navlist}>
                    <Link href="/" className={styles.navItem}>TOP</Link>
                    <Link href="/" className={styles.navItem}>ABOUT</Link>
                    <Link href="/menu" className={styles.navItem}>MENU</Link>
                    <Link href="/" className={styles.navItem}>PICK UP</Link>
                    <Link href="/" className={styles.navItem}>NEWS</Link>
                    <Link href="/" className={styles.navItem}>ACCESS</Link>
                </ul>
            </nav>
        </header>
    );
}
