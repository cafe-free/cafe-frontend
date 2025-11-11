import React from "react";
import styles from "../styles/MenuSection.module.css";

export default function MenuList({ active, right, title, items, onClose }) {
    function CloseButton({ handleClick }) {
        return (
            <button className={styles.menuListClose} onClick={handleClick}>
                <div className={styles.closeButton}>
                    <div className={styles.closeButtonLine}></div>
                    <div className={styles.closeButtonLine}></div>
                </div>
            </button>
        );
    }

    return (
        <div
            className={`${styles.menuList} 
                ${right ? styles.menuListRight : ""} 
                ${active ? styles.menuListActive : ""}`}
        >
            <div
                className={`${styles.menuListUl} ${
                    right ? styles.menuListUlRight : ""
                }`}
            >
                <div className={styles.menuListTitle}>{title}</div>

                <CloseButton handleClick={onClose} />

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
