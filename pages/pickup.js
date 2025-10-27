import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Pickup.module.css'

export default function Pickup() {
  return (
    <>
      <Head>
        <title>Pick Up - Cafe de Coral</title>
        <meta name="description" content="Order pickup items from Cafe de Coral" />
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
            <h1 className="section-header">PICK UP</h1>
          </div>
          <div className="pickup-inner">
            <ul className="pickup-list">
              <li className="pickup-itme">
                <div className="pickup-card">
                  <div className="pickup-card-inner">
                    <Link href="/pickup">
                      <div className="pickup-card-inner-bg"></div>
                      <div className="pickup-card-infor">
                        <div className="pickup-card-img">
                          <img src="/PickUp01.png" alt="Pickup Item" />
                        </div>
                        <div className="pickup-card-title">TEXT</div>
                        <div className="pickup-card-price">$:00000</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </li>
              <li className="pickup-itme">
                <div className="pickup-card">
                  <div className="pickup-card-inner pickup-card-inner-line">
                    <Link href="/pickup">
                      <div className="pickup-card-inner-bg"></div>
                      <div className="pickup-card-infor">
                        <div className="pickup-card-img">
                          <img src="/PickUp01.png" alt="Pickup Item" />
                        </div>
                        <div className="pickup-card-title">TEXT</div>
                        <div className="pickup-card-price">$:00000</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </li>
              <li className="pickup-itme">
                <div className="pickup-card">
                  <div className="pickup-card-inner">
                    <Link href="/pickup">
                      <div className="pickup-card-inner-bg"></div>
                      <div className="pickup-card-infor">
                        <div className="pickup-card-img">
                          <img src="/PickUp01.png" alt="Pickup Item" />
                        </div>
                        <div className="pickup-card-title">TEXT</div>
                        <div className="pickup-card-price">$:00000</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
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
