import styles from './SectionHeader.module.css';

export default function SectionHeader({ title, white = false, padTop = false, id }) {
    return (
        <div id={id} className={styles.wrap}>
            <h1
                className={[styles.header, white ? styles.white : '', padTop ? styles.padTop : ''].join(' ').trim()}
            >
                {title}
            </h1>
        </div>
    )

}
