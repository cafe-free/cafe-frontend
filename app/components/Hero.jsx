import styles from './Hero.module.css';
import Logo from '../../public/Logo.png';
import TopImg01 from '../../public/TopImg01.png';
import TopImg02 from '../../public/TopImg02.png';
import TopImg03 from '../../public/TopImg03.png';

export default function Hero() {
    return (
        <section id="top" className={styles.section}>
            <div className={styles.top}>
                <div className={styles.block0}>
                    <div className={styles.logo}>
                        <div className={styles.logoImg}>
                            <img src={Logo} alt="Logo" />
                        </div>
                    </div>
                </div>
                <div className={styles.block}>
                    <img src={TopImg01} alt="" />
                    <div className={styles.bg}></div>
                </div>
                <div className={`${styles.block} ${styles.hideOnMobile}`}>
                    <img src={TopImg02} alt="" />
                    <div className={styles.bg}></div>
                </div>
                <div className={`${styles.block} ${styles.hideOnMobile}`}>
                    <img src={TopImg03} alt="" />
                    <div className={styles.bg}></div>
                </div>
            </div>
        </section>
    );
}

