'use client'

import { useEffect, useState } from 'react';
import styles from '../styles/Menu.module.css';

export default function MenuClient() {
    const [selectedCategory, setSelectedCategory] = useState("Food");
    const [selectedSubcategory, setSelectedSubcategory] = useState("All");
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Fetch menu data from the API when the component mounts
    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch('/api/menu');
                const data = await response.json();
                setMenuData(data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuData();
    }, []);

    if (loading) {
        return <div>Loading menu...</div>;
    }

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
            <div className={isFoodDrinks ? styles.foodDrinks : ""}>
                <li
                    onClick={handleListItemClick}
                    className={`${isSelected ? styles.selectedListItem : ""} ${styles.menuCategoryListItem}`}
                >
                    {category}
                </li>
            </div>
        );
    }

    return (
        <div className={styles.menuContainer}>
            <nav className={styles.menuCategoryList}>
                <ul className={styles.menuCategoryListUl}>
                    <li className={`${styles.menuCategory} ${styles.menuCategoryListItem}`}>Categories</li>
                        <CategoryListItem category={"Food"} isSub={false}/>
                        <CategoryListItem category={"Drinks"} isSub={false}/>
                    <hr />

                    <CategoryListItem category={"All"} isSub={false}/>

                    {subcategoriesToDisplay.map((sub) => (
                        <CategoryListItem key={`sub-${sub}`} category={sub} isSub={true}/>
                    ))}
                </ul>
            </nav>

            <div className={styles.cardsContainer}>
                <MenuSection 
                    data={menuData} 
                    selectedCategory={selectedCategory} 
                    selectedSubcategory={selectedSubcategory} 
                />
            </div>
        </div>
    );
}

function MenuSection({ data, selectedCategory, selectedSubcategory }) {
    const filteredByCategory = data.filter(item => item.category === selectedCategory);

    function MenuCard({ item, index }) {
        return (
            <div key={index} className={styles.menuCard}>
                <div>
                    <img className={styles.menuCardImage} src={item.img} alt="Menu Item" />
                </div>
                <div className={styles.menuCardContent}>
                    <p className={styles.menuCardTitle}>{item.title}</p>
                    <p className={styles.menuCardPrice}>HKD {item.price.toFixed(1)}</p>
                </div>
            </div>
        );
    }

    if (selectedSubcategory === "All") {
        const itemsBySubcategory = filteredByCategory.reduce((accumulator, currentItem) => {
            (accumulator[currentItem.subcategory] = (accumulator[currentItem.subcategory] || [])).push(currentItem);
            return accumulator;
        }, {});
        const entries = Object.entries(itemsBySubcategory);

        return (
            <>
                {entries.map(([sub, items]) => {
                    return (
                        <div key={sub} className={styles.menuCardContainer}>
                            <div className={styles.menuSubcategoryTitle}>
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
            <div className={styles.menuCardContainer}>
                <div className={styles.menuSubcategoryTitle}>
                    <h2>{selectedSubcategory}</h2>
                </div>
                {
                    filteredMenu.map((item, index) => (
                        <MenuCard item={item} index={index} key={index}/>
                    ))
                }
            </div>
        );
    }
}
