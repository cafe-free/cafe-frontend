import styles from '../styles/Access.module.css';
import SectionHeader from './SectionHeader.jsx';

export default function Access() {
    return (
        <section id="access" className={styles.section}>
            <div className={styles.container}>
                <SectionHeader title="ACCESS" />
            </div>
            <div className={styles.wrap}>
                <div className={styles.map}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3897861.0649475167!2d135.13416443733436!3d39.27914238230676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2shk!4v1762842616920!5m2!1szh-TW!2shk"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Location map"
                    />
                </div>
                <div className={styles.info}>
                    <span className={[styles.address, styles.font].join(' ')}>
                        <h4>Address:</h4>
                        Christian Action, Choi Wan (II) Estate Kai Fai House, 55 Clear Water Bay Rd
                    </span>
                    <span className={[styles.tel, styles.font].join(' ')}>
                        <h4>Tel:</h4>
                        2123 4567
                    </span>
                    <span className={[styles.hours, styles.font].join(' ')}>
                        <h4>Opening Hours:</h4>
                        10:00 - 12:30,  <br /> 14:30 - 19:00
                    </span>
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
