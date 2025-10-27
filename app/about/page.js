import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'About - Cafe de Coral',
  description: 'Learn more about Cafe de Coral',
}

export default function AboutPage() {
  return (
    <main>
      <Header />
      
      <section className="section bg01-img">
        <div className="section-title">
          <h1 className="section-header">ABOUT</h1>
          <div className="about-itme">
            <div className="about-itme-img">
              <img src="/AboutImg.png" alt="About Cafe" />
            </div>
            <div className="about-itme-text">
              <div className="about-itme-text-line-top">
                <img src="/Line 1.png" alt="Decorative Line" />
              </div>
              <div className="about-itme-text-title">Wandering Time</div>
              <div className="about-itme-text-infor">
                Push open the wooden door and be enveloped by warm yellow light.
                There's no hurried pace here, just the soft, slouchy sofas, the caramel aroma of hand-poured
                coffee, and the sparsely-flipped magazines on the bookshelf.<br />
                <br />
                Don't rush! Order a latte with a handmade scone, watch the sunlight filter through the gauze
                curtains onto the tabletop, or chat with friends by the window, letting time slip by. This isn't
                just a place to grab a cup of coffee, it's a little corner where you can pause and unwind for a
                moment.
              </div>
              <div className="about-itme-text-line-under">
                <img src="/Line 1.png" alt="Decorative Line" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
