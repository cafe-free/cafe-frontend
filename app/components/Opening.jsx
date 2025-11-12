'use client';

import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
const OpeningLogo1 = "/OpeningLogo1.png";
const OpeningLogo2 = "/OpeningLogo2.png";

export default function Opening() {
  const [isLoading, setIsLoading] = useState(true);
  const [maskActive, setMaskActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // adds "loading-close"
      setMaskActive(true); // adds "opening-go"
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="opening"
      className={`${styles.opening} ${!isLoading ? styles.loadingClose : ""}`}
    >
      <div
        id="openingMask"
        className={`${styles.openingMask} ${
          maskActive ? styles.openingGo : ""
        }`}
      >
        <div>
          <img
            className={styles.openingLogo1}
            src={OpeningLogo1}
            alt="Opening Logo 1"
          />
          <img
            className={styles.openingLogo2}
            src={OpeningLogo2}
            alt="Opening Logo 2"
          />
        </div>
      </div>
    </div>
  );
}
