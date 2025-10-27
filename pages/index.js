import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Cafe de Coral</title>
        <meta name="description" content="Wandering Time - A cozy cafe experience" />
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

        <section className="section section-top">
          <div className="top">
            <div className="top-block-0">
              <div className="top-logo">
                <div className="top-logo-img">
                  <img src="/Logo.png" alt="Cafe de Coral Logo" />
                </div>
              </div>
            </div>
            <div className="top-block-1">
              <img src="/TopImg01.png" alt="Cafe Interior" />
              <div className="top-block-bg"></div>
            </div>
            <div className="top-block-2">
              <img src="/TopImg02.png" alt="Coffee Making" />
              <div className="top-block-bg"></div>
            </div>
            <div className="top-block-3">
              <img src="/TopImg03.png" alt="Cafe Atmosphere" />
              <div className="top-block-bg"></div>
            </div>
          </div>
        </section>

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

        <section className="section">
          <div className="section-title">
            <div className="section-header-position">
              <h1 className="section-header section-header-white">MENU</h1>
            </div>
            <div className="menu-time">
              <div className="menu-food">
                <div className="menu-food-title">
                  <div>FOOD</div>
                </div>
              </div>
              <div className="menu-drink">
                <div className="menu-drink-title">
                  <div>DRINK</div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
