import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Access from '../components/Access'

export const metadata = {
    title: 'Access - Cafe Coral',
    description: 'Find us - Cafe de Coral location and contact information',
}

export default function AccessPage() {
    return (
        <>
            <Header isOnHomepage={false} />
            <main>
                <Access />
            </main>
            <Footer />
        </>
    )
}