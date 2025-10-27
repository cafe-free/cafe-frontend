import Link from 'next/link'

export default function Header() {
  return (
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
  )
}
