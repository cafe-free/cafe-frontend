import styles from './Access.module.css';
import SectionHeader from './SectionHeader.jsx';

export default function Access() {
    return (
        <section id="access" className={styles.section}>
            <div className={styles.container}>
                <SectionHeader title="ACCESS" />
            </div>
            <div className={styles.wrap}>
                <div className={styles.map}></div>
                <div className={styles.info}>
                    <p className={[styles.address, styles.font].join(' ')}>ABCABCABCABC</p>
                    <p className={[styles.tel, styles.font].join(' ')}>XXXX-XXXX</p>
                    <p className={[styles.hours, styles.font].join(' ')}>00:00-00:00</p>
                    <p className={styles.route}>
                        <a href="#" className={styles.routeLink}>
                            <button className={styles.routeBtn}>route</button>
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}