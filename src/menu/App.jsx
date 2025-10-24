import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import { menuData } from "../assets/js/data";

// sample

export function App() {
    const [filters, setFilters] = useState({
        category: "Food",
        subcategory: "All",
    });

    // --- Derived subcategories based on selected category ---
    const subcategories = useMemo(() => {
        const subs = [
            ...new Set(
                menuData
                    .filter(item => item.category === filters.category)
                    .map(item => item.subcategory)
            ),
        ];
        return ["All", ...subs];
    }, [filters.category]);

    // --- Derived filtered data ---
    const filteredData = useMemo(() => {
        let result = menuData.filter(item => item.category === filters.category);
        if (filters.subcategory !== "All") {
            result = result.filter(item => item.subcategory === filters.subcategory);
        }
        return result;
    }, [filters]);

    // --- Handlers ---
    const handleCategoryChange = (category) => {
        setFilters({ category, subcategory: "All" });
    };

    const handleSubcategoryChange = (subcategory) => {
        setFilters(prev => ({ ...prev, subcategory }));
    };

    return (
        <>
            <Header />
            <div className="menu-hero-image">
                <h1 className="menu-hero-title">Menu</h1>
            </div>

            <div className="menu-container">
                <CategorySidebar
                    categories={["Food", "Drinks"]}
                    subcategories={subcategories}
                    filters={filters}
                    onCategoryChange={handleCategoryChange}
                    onSubcategoryChange={handleSubcategoryChange}
                />

                <div className="cards-container">
                    <MenuSection data={filteredData} filters={filters} />
                </div>
            </div>

            <Footer />
        </>
    );
}

function MenuSection({ data, selectedCategory, selectedSubcategory }) {

    function MenuCard({ item, index }) {
        return (
            <div key={index} className="menu-card">
                <div>
                    <img src={item.img} alt="Menu Item" />
                </div>
                <div className="menu-card-content">
                    <p className="menu-card-title">{item.title}</p>
                    <p className="menu-card-price">HKD {item.price.toFixed(2)}</p>
                </div>
            </div>
        );
    }

    if (selectedSubcategory === "All") {
        const itemsByCategory = Object.groupBy(data, (item) => item.subcategory);
        const entries = Object.entries(itemsByCategory);
        
        return (
            <>
                {Object.entries(grouped).map(([sub, items]) => (
                    <div key={sub} className="menu-card-container">
                        <div className="menu-subcategory-title">
                            <h2>{sub}</h2>
                        </div>
                        {items.map((item, i) => (
                            <MenuCard key={`${sub}-${i}`} item={item} />
                        ))}
                    </div>
                ))}
            </>
        );
    }

    // Single subcategory view
    return (
        <div className="menu-card-container">
            <div className="menu-subcategory-title">
                <h2>{filters.subcategory}</h2>
            </div>
            {data.map((item, i) => (
                <MenuCard key={i} item={item} />
            ))}
        </div>
    );
}

function MenuCard({ item }) {
    return (
        <div className="menu-card">
            <div>
                <img src={item.img} alt={item.title} />
            </div>
            <div className="menu-card-content">
                <p className="menu-card-title">{item.title}</p>
                <p className="menu-card-price">HKD {item.price.toFixed(2)}</p>
            </div>
        </div>
    );
}
