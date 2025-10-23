import React, { useState } from 'react';
import Header from './components/Header';
import Footer from "./components/Footer.jsx";
import { menuData } from '../assets/js/data';

const categories = ["Coffee", "Juice", "Tea"];


export function App() {

    const [selectedCategory, setSelectedCategory] = useState("All");
    const filteredMenuData = selectedCategory 
        ? menuData.filter(item => item.category === selectedCategory) : [];

    function CategoryListItem({ category }) {
        const isSelected = category === selectedCategory;
        const isFoodDrinks = (category === 'Food' || category === 'Drinks');

        return (
            <div
                className={ isFoodDrinks ? "food-drinks" : "" }
            >
                <li 
                    onClick={ !isFoodDrinks ? () => setSelectedCategory(category) : () => setSelectedCategory("All") }
                    className={ 
                        isSelected ? "selected-menu-subcategory" : ""
                    }
                >
                    {category}
                </li>
            </div>
        );
    }

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

                        {categories.map((c) => (
                            <CategoryListItem category={c}/>
                        ))}
                    
                    </ul>
                </nav>

                <div className="cards-container">
                    <MenuSection data={menuData} selectedCategory={selectedCategory} />
                </div>
            </div>

            <Footer />
        </>
    );
}

function MenuSection({ data, selectedCategory }) {
    const itemsByCategory = Object.groupBy(data, (item) => item.category);
    // const itemsOfSelectedCategory = selectedCategory != null
    //     ? itemsByCategory.filter(item => item.category === selectedCategory) : itemsByCategory; 

    return (
        <>
            {Object.entries(itemsByCategory).map(([category, items]) => (
                <div key={category} className="menu-card-container">
                    <div className="menu-subcategory-title">
                        <h2>{category}</h2>
                    </div>

                    { 
                        selectedCategory == "All" ? 
                            items.map((item, index) => (
                                <div key={index} className="menu-card">
                                    <div>
                                        <img src={item.img} alt="Menu Item" />
                                    </div>
                                    <div className="menu-card-content">
                                        <p className="menu-card-title">{item.title}</p>
                                        <p className="menu-card-price">HKD {item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            )) 
                        : "Unavailable"
                    }

                </div>
            ))}
        </>
    );
}
