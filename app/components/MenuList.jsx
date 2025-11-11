import React from "react";
import styles from "../styles/MenuSection.module.css";

export default function MenuList({ active, right, title, items, onClose }) {
    return (
        <div
            className={
                `${styles.menuList} 
                 ${right ? styles.menuListRight : ""} 
                 ${active ? styles.menuListActive : ""}`
            }
        >
            <div
                className={`${styles.menuListUl} ${
                    right ? styles.menuListUlRight : ""
                }`}
            >
                <div className={styles.menuListTitle}>{title}</div>

                <button className={styles.menuListClose} onClick={onClose}>
                    <div className={styles.closeLogo}>
                        <div className={styles.closeLogoLine}></div>
                        <div className={styles.closeLogoLine}></div>
                    </div>
                </button>

                <ul className={styles.menuListInner}>
                    {items.map((item) => (
                        <li key={item} className={styles.menuListItem}>
                            <a href="">{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
