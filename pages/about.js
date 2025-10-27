import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/About.module.css'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Cafe de Coral</title>
        <meta name="description" content="Learn more about Cafe de Coral" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/sanitize.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>

      <main className={styles.main}>
        <header className="header">
          <div className="header-Logo">
            <img src="/Logo.png" alt="Cafe de Coral Logo" />
          </div>
          <nav className="header-nav">
            <ul className="header-navlist">
              <li className="header-navitem">
                <Link href="/">TOP</Link>
              </li>
              <li className="header-navitem">
                <Link href="/about">ABOUT</Link>
              </li>
              <li className="header-navitem">
                <Link href="/menu">MENU</Link>
              </li>
              <li className="header-navitem">
                <Link href="/pickup">PICK UP</Link>
              </li>
              <li className="header-navitem">
                <Link href="/news">NEWS</Link>
              </li>
              <li className="header-navitem">
                <Link href="/access">ACCESS</Link>
              </li>
            </ul>
          </nav>
        </header>

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

        <footer className="footer">
          <div className="footer-nav">
            <ul className="footer-navlist">
              <li className="footer-navitem">
                <Link href="/about">ABOUT</Link>
              </li>
              <li className="footer-navitem">
                <Link href="/menu">MENU</Link>
              </li>
              <li className="footer-navitem">
                <Link href="/pickup">PICK UP</Link>
              </li>
              <li className="footer-navitem">
                <Link href="/news">NEWS</Link>
              </li>
              <li className="footer-navitem">
                <Link href="/access">ACCESS</Link>
              </li>
            </ul>
          </div>
          <div className="footer-logo">
            <div className="footer-logo-img">
              <img src="/Logo.png" alt="Cafe de Coral Logo" />
            </div>
          </div>
          <div className="footer-copyright">
            <div className="footer-copyright-infor">Cafe de Coral ©2025</div>
          </div>
        </footer>
      </main>
    </>
  )
}
