import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import Pickup from './components/Pickup';
import News from './components/News';
import Access from './components/Access';
import './globals.css';

// export const metadata = {
//     title: 'Cafe de Coral - Home',
//     description: 'Wandering Time - A cozy cafe experience',
// }

export default function HomePage() {
    return (
        <>
            <Header isOnHomepage={true}/>
            <main>
                <Hero />

                <About />

                <MenuSection />

                <Pickup />

                <News />
                
                <Access />
            </main>
            <Footer />
        </>
    );
}
