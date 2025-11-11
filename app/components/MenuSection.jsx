'use client';

import React, { useState } from "react";
import styles from "../styles/MenuSection.module.css";
import MenuButton from "./MenuButton";
import MenuList from "./MenuList";

export default function MenuSection() {
    const [activeMenu, setActiveMenu] = useState(null);

    const openMenu = (type) => setActiveMenu(type);
    const closeMenu = () => setActiveMenu(null);

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}>
                <div className={styles.sectionHeaderPosition}>
                    <h1 className={`${styles.sectionHeader} ${styles.sectionHeaderWhite} ${styles.sectionHeaderPaddingTop}`}>
                        MENU
                    </h1>
                </div>

                <div className={styles.menuTime}>
                    {/* FOOD */}
                    <div className={styles.menuTimeInner}>
                        <MenuButton
                            label="FOOD"
                            type="food"
                            onClick={() => openMenu("food")}
                            className={styles.menuFoodButton}
                            titleClass={styles.menuFoodTitle}
                        />

                        <MenuList
                            active={activeMenu === "food"}
                            title="FOOD"
                            items={["Dessert", "Bread", "Sandwich", "Others"]}
                            onClose={closeMenu}
                            right={false}
                        />
                    </div>

                    {/* DRINK */}
                    <div className={styles.menuTimeInner}>
                        <MenuButton
                            label="DRINK"
                            type="drink"
                            onClick={() => openMenu("drink")}
                            className={styles.menuDrinkButton}
                            titleClass={styles.menuDrinkTitle}
                        />

                        <MenuList
                            active={activeMenu === "drink"}
                            title="DRINK"
                            items={["Coffee", "Tea", "Others"]}
                            onClose={closeMenu}
                            right={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
