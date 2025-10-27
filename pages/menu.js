import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { menuData } from '../src/assets/js/data'
import styles from '../styles/Menu.module.css'

export default function Menu() {
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
      <div className={isFoodDrinks ? "food-drinks" : ""}>
        <li 
          onClick={handleListItemClick}
          className={isSelected ? "selected-list-item" : ""}
        >
          {category}
        </li>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Menu - Cafe de Coral</title>
        <meta name="description" content="Explore our delicious menu of food and drinks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/sanitize.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/menu.css" />
        <link rel="stylesheet" href="/css/card.css" />
      </Head>

      <main className={styles.main}>
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

        <div className="menu-hero-image">
          <h1 className="menu-hero-title">Menu</h1>
        </div>

        <div className="menu-container">
          <nav className="menu-category-list">
            <ul>
              <li className="menu-category">Categories</li>
              <CategoryListItem category={"Food"} isSub={false}/>
              <CategoryListItem category={"Drinks"} isSub={false}/>
              <hr />
              
              <CategoryListItem category={"All"} isSub={false}/>

              {subcategoriesToDisplay.map((sub) => (
                <CategoryListItem key={sub} category={sub} isSub={true}/>
              ))}
            </ul>
          </nav>

          <div className="cards-container">
            <MenuSection data={menuData} selectedCategory={selectedCategory} selectedSubcategory={selectedSubcategory} />
          </div>
        </div>

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
      </main>
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
              <MenuCard item={item} index={index} key={index}/>
            ))
          }
        </div>
      </>
    );
  }
}
