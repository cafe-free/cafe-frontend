
import styles from '../styles/About.module.css';
import About from '../components/About';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'About',
};

export default function Page() {
  return (
    <main className={styles.fontPrimary}>
        <Header isOnHomepage={false} />
        <About />
        <Footer />
    </main>
  );
}