import styles from '../styles/About.module.css';
import SectionHeader from './SectionHeader';

const AboutImg = '/AboutImg.png';
const LineImg = '/Line 1.png';

export default function About() {
    function lineSeparator(position) {
        return (
            <div 
                className={`${position === "under" ? styles.under : ''} ${styles.line}`}
            >
                <img src={LineImg} alt="" />
            </div>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <SectionHeader title="ABOUT" />
                {/* <h1 className={styles.header}>ABOUT</h1> */}
                    <div className={styles.about}>
                        <div className={styles.imgCol}>
                            <img src={AboutImg} alt="About" />
                        </div>
                        <div className={styles.textCol}>
                            {lineSeparator()}
                            <div className={styles.title}>Wandering Time</div>
                            <p className={styles.desc}>
                                Push open the wooden door and be enveloped by warm yellow light. There's no hurried pace here, just the soft, slouchy sofas, the caramel aroma of hand-poured coffee, and the sparsely-flipped magazines on the bookshelf.
                                <br /><br />
                                Don't rush! Order a latte with a handmade scone, watch the sunlight filter through the gauze curtains onto the tabletop, or chat with friends by the window, letting time slip by. This isn't just a place to grab a cup of coffee, it's a little corner where you can pause and unwind for a moment.
                            </p>
                            {lineSeparator("under")}
                        </div>
                    </div>
            </div>
        </section>
    );
}