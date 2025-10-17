import React from 'react';
import Header from './components/Header';
import Footer from "./components/Footer.jsx";

export function App() {
    return (
        <>
            <Header />
            <div className="menu-hero-image">
                <h1 className="menu-hero-title">Menu</h1>
            </div>

            <div className="menu-container">
                <nav className="menu-category-list">
                    <ul>
                        <li className="menu-category">Categories</li>
                        <div className="food-drinks">
                            <li>Food</li>
                        </div>
                        <div className="food-drinks selected-menu-subcategory">
                            <li>Drinks</li>
                        </div>
                        <hr />
                        <li className="selected-menu-subcategory">Subcategory 1</li>
                        <li>Subcategory 2</li>
                        <li>Subcategory 3</li>
                        <li>Subcategory 4</li>
                        <li>Subcategory 5</li>
                        <li>Subcategory 6</li>
                    </ul>
                </nav>

                <div className="cards-container">
                    <MenuSection title="Coffee" />
                    <MenuSection title="Tea" />
                </div>
            </div>

            <Footer />
        </>
    );
}

function MenuSection({ title }) {
    return (
        <div className="menu-card-container">
            <div className="menu-subcategory-title">
                <h2>{title}</h2>
            </div>
            {Array.from({ length: 8 }).map((_, index) => (
                <div className="menu-card" key={`${title}-${index}`}>
                    <div>
                        <img src="https://picsum.photos/300/?random=10" alt="Menu Item" />
                    </div>
                    <div className="menu-card-content">
                        <p className="menu-card-title">Delicious Dish</p>
                        <p className="menu-card-price">HKD 50</p>
                    </div>
                </div>
            ))}
        </div>
    );
}


