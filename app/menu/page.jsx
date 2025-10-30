import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuClient from '../components/MenuClient'
import styles from '../styles/Menu.module.css';
import '../globals.css';

export const metadata = {
  title: 'Menu - Cafe de Coral',
  description: 'Explore our delicious menu of food and drinks',
}

export default function MenuPage() {
  return (
    <main>
      <Header />
      
      <div className={styles.menuHeroImage}>
        <h1 className={styles.menuHeroTitle}>Menu</h1>
      </div>

      <MenuClient />

      <Footer />
    </main>
  )
}
