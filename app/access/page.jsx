import styles from '../styles/Access.module.css';
import Access from '../components/Access';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Access',
};

export default function Page() {
  return (
    <main className={styles.access}>
        <Header isOnHomepage={false} />
        <Access />
        <Footer />
    </main>
  );
}
