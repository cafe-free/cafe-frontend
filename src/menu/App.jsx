import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { menuData } from "../../lib/data";

export function App() {

    const [selectedCategory, setSelectedCategory] = useState("Food");
    const [selectedSubcategory, setSelectedSubcategory] = useState("All");

    const getSubcategories = (cat) => [
        ...new Set(menuData.filter(i => i.category === cat).map(i => i.subcategory))
    ];

    const subcategoriesToDisplay = getSubcategories(selectedCategory);

    function CategoryListItem({ category, isSub }) {
        const isFoodDrinks = (category === 'Food' || category === 'Drinks');
        const isSelected = (category === selectedCategory) || (category === selectedSubcategory);

        const handleListItemClick = () => {
            if (isSub) {
                setSelectedSubcategory(category);
                return;
            }

            switch (category) {
                case "All":
                    setSelectedSubcategory("All");
                    break;
                case "Food":
                    setSelectedCategory("Food");
                    setSelectedSubcategory("All");
                    break;
                case "Drinks":
                    setSelectedCategory("Drinks");
                    setSelectedSubcategory("All");
                    break;
                default:
                    break;
            }
        }

        return (
            <div
                className={ isFoodDrinks ? "food-drinks" : "" }
            >
                <li 
                    onClick={handleListItemClick}
                    className={
                        isSelected ? "selected-list-item" : ""
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

            {/* for testing */}
            {/* <h3>selected: {selectedCategory}</h3> 
            <h3>selected sub: {selectedSubcategory}</h3>  */}

            <div className="menu-container">
                <nav className="menu-category-list">
                    <ul>
                        <li className="menu-category">Categories</li>
                            <CategoryListItem category={"Food"} isSub={false}/>
                            <CategoryListItem category={"Drinks"} isSub={false}/>
                        <hr />
                        
                        <CategoryListItem category={"All"} isSub={false}/>

                        {subcategoriesToDisplay
                            .map((sub) => (
                                <CategoryListItem category={sub} isSub={true}/>
                        ))}
                    
                    </ul>
                </nav>

                <div className="cards-container">
                    <MenuSection data={menuData} selectedCategory={selectedCategory} selectedSubcategory={selectedSubcategory} />
                </div>
            </div>

            <Footer />
        </>
    );
}

function MenuSection({ data, selectedCategory, selectedSubcategory }) {

    const filteredByCategory = data.filter(item => item.category === selectedCategory);

    function MenuCard({ item, index }) {
        return (
            <div key={index} className="menu-card">
                <div>
                    <img src={item.img} alt="Menu Item" />
                </div>
                <div className="menu-card-content">
                    <p className="menu-card-title">{item.title}</p>
                    <p className="menu-card-price">HKD {item.price.toFixed(1)}</p>
                </div>
            </div>
        );
    }

    if (selectedSubcategory === "All") {
        const itemsByCategory = Object.groupBy(filteredByCategory, (item) => item.subcategory);
        const entries = Object.entries(itemsByCategory);
        
        return (
            <>
                {entries.map(([sub, items]) => {
                    return (
                        <div key={sub} className="menu-card-container">
                            <div className="menu-subcategory-title">
                                <h2>{sub}</h2>
                            </div>

                            { 
                                items.map((item, index) => (
                                    <MenuCard item={item} index={index} key={`${sub}-${index}`}/>
                                )) 
                            }

                        </div>
                    );

                })}
            </>
        );
    } 
    else {

        const filteredMenu = data.filter((it) => it.subcategory === selectedSubcategory);
        return (
            <>
                <div className="menu-card-container">
                    <div className="menu-subcategory-title">
                        <h2>{selectedSubcategory}</h2>
                    </div>
                    {
                        filteredMenu.map((item, index) => (
                            <MenuCard item={item} index={index}/>
                        ))
                    }
                </div>
            </>
        );
    }

}