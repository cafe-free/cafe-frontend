import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuClient from '../components/MenuClient'

export const metadata = {
  title: 'Menu - Cafe de Coral',
  description: 'Explore our delicious menu of food and drinks',
}

export default function MenuPage() {
  return (
    <main>
      <Header />
      
      <div className="menu-hero-image">
        <h1 className="menu-hero-title">Menu</h1>
      </div>

      <MenuClient />

      <Footer />
    </main>
  )
}
