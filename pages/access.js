import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Access.module.css'

export default function Access() {
  return (
    <>
      <Head>
        <title>Access - Cafe de Coral</title>
        <meta name="description" content="Find us - Cafe de Coral location and contact information" />
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
