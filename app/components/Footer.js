import Link from 'next/link'

export default function Footer() {
  return (
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
  )
}
