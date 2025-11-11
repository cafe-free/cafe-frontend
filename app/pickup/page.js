import Link from 'next/link'
// import Header from '../components/Header'
// import Footer from '../components/Footer'

export const metadata = {
    title: 'Pick Up - Cafe de Coral',
    description: 'Order pickup items from Cafe de Coral',
}

export default function PickupPage() {
    return (
        <main>
            <Header />

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

            <Footer />
        </main>
    )
}
