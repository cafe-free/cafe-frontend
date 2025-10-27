import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'News - Cafe de Coral',
  description: 'Latest news from Cafe de Coral',
}

export default function NewsPage() {
  return (
    <main>
      <Header />
      
      <section className="section bg02-img">
        <div className="section-title">
          <h1 className="section-header">NEWS</h1>
        </div>
        <div className="news">
          <ul className="news-list">
            <li className="news-itme news-itme-border-top">
              <Link href="/news">
                <div className="news-date">2025.08.31</div>
                <div className="news-title">TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</div>
              </Link>
            </li>
            <li className="news-itme">
              <Link href="/news">
                <div className="news-date">2025.08.31</div>
                <div className="news-title">TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</div>
              </Link>
            </li>
            <li className="news-itme">
              <Link href="/news">
                <div className="news-date">2025.08.31</div>
                <div className="news-title">TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</div>
              </Link>
            </li>
            <li className="news-itme">
              <Link href="/news">
                <div className="news-date">2025.08.31</div>
                <div className="news-title">TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</div>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  )
}
