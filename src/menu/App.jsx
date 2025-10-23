import React, { useState } from 'react';
import Header from './components/Header';
import Footer from "./components/Footer.jsx";
import { menuData } from '../assets/js/data';

const categories = ["Food", "Drinks", "Tea"];

function CategoryListItem({ category }) {

    return (
        <div
            className={
                (category === 'Food' || category === 'Drinks') 
                ? "food-drinks" : ""
            }
        >
            <li 
                onClick={() => setSelectedCategory(category)}
                // className={
                    // selectedCategory === category ? "selected-menu-subcategory" : ""
                // }
            >
                {category}
            </li>
        </div>
    );
}

export function App() {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const filteredMenuData = selectedCategory 
        ? menuData.filter(item => item.category === selectedCategory) : menuData;

    
        // const handleCategoryChange = selectedSubcategory => {
    //     setSelectedCategory(selectedCategory);
    // }

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
                            <CategoryListItem category={"Food"} />
                            <CategoryListItem category={"Drinks"} />
                        <hr />

                        {categories.map((sub) => (
                            <li
                                onClick={() => setSelectedCategory(sub)}
                                className={
                                    selectedCategory === sub ? "selected-menu-subcategory" : ""
                                }
                            >
                                {sub}
                            </li>
                        ))}
                    
                    </ul>
                </nav>

                

                <div className="cards-container">
                    <MenuSection data={menuData} />
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
