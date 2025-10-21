import React from 'react';
import Header from './components/Header';
import Footer from "./components/Footer.jsx";
import { menuData } from '../assets/js/data.js';

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
                    <MenuSection data={menuData} />
                    {/* <MenuSection title="Coffee" /> */}
                    {/* <MenuSection title="Tea" /> */}
                </div>
            </div>

            <Footer />
        </>
    );
}

function MenuSection({ data }) {
    const itemsByCategory = Object.groupBy(data, (item) => item.category);

    return (
        <>
            {Object.entries(itemsByCategory).map(([category, items]) => (
                <div key={category} className="menu-card-container">
                    <div className="menu-subcategory-title">
                        <h2>{category}</h2>
                    </div>
                    {items.map((item, index) => (
                        <div key={index} className="menu-card">
                            <div>
                                <img src={item.img} alt="Menu Item" />
                            </div>
                            <div className="menu-card-content">
                                <p className="menu-card-title">{item.title}</p>
                                <p className="menu-card-price">HKD {item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}
