import styles from './About.module.css';
import SectionHeader from './SectionHeader';
import AboutImg from '../../public/AboutImg.png';
import LineImg from '../../public/Line 1.png';

export default function About() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <SectionHeader id="about" title="ABOUT" />
                <div className={styles.imgCol}>
                    <img src={AboutImg} alt="About" />
                </div>
                <div className={styles.title}>Wandering Time</div>
                <p className={styles.desc}>
                    Push open the wooden door and be enveloped by warm yellow light. There's no hurried pace here, just the soft, slouchy sofas, the caramel aroma of hand-poured coffee, and the sparsely-flipped magazines on the bookshelf.
                    <br /><br />
                    Don't rush! Order a latte with a handmade scone, watch the sunlight filter through the gauze curtains onto the tabletop, or chat with friends by the window, letting time slip by. This isn't just a place to grab a cup of coffee, it's a little corner where you can pause and unwind for a moment.
                </p>
                <div className={styles.line}>
                    <img src={LineImg} alt="" />
                </div>
            </div>
        </section>
    );
}