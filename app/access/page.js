import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Access - Cafe de Coral',
  description: 'Find us - Cafe de Coral location and contact information',
}

export default function AccessPage() {
  return (
    <main>
      <Header />
      
      <section className="section bg01-img">
        <div className="section-title">
          <h1 className="section-header">ACCESS</h1>
        </div>
        <div className="access">
          <div className="access-map"></div>
          <div className="access-infor">
            <div className="access-infor-address access-infor-font">ABCABCABCABC</div>
            <div className="access-infor-telephone access-infor-font">XXXX-XXXX</div>
            <div className="access-infor-business-hours access-infor-font">00:00-00:00</div>
            <div className="access-infor-route">
              <Link className="access-infor-route-link" href="/access">
                <button>route</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
