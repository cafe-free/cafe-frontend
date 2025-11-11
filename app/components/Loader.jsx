import { useRef, useEffect, useState } from "react";
import logo from "../../public/Logo.png";
import styles from '../styles/Loader.module.css';

export default function Loader({ isLoading, minMs }) {
    const [visible, setVisible] = useState(false);
    const shownAtRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        if (isLoading) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            shownAtRef.current = Date.now();
            setVisible(true);
            return;
        }

        if (!isLoading && visible) {
            const elapsed = Date.now() - shownAtRef.current;
            const remaining = Math.max(minMs - elapsed);

            if (remaining > 0) {
                timerRef.current = window.setTimeout(() => {
                    setVisible(false);
                    timerRef.current = null;
                }, remaining);
            } else {
                setVisible(false);
            }
        }
    }, [isLoading, minMs, visible]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    if (!visible) {
        return null;
    } 

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p>Now Loading</p>
        </div>
    );
}