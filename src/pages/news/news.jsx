// src/pages/news/news.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/sanitize.css"; // optional if already imported globally
import "./news.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function NewsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/assets/data/news-list.json")
      .then((r) => {
        if (!r.ok) throw new Error("no data");
        return r.json();
      })
      .then(setItems)
      .catch(() => {
        setItems([
          { id: "news-01", date: "2025.08.31", title: "This is the first news about our Cafe shop" },
          { id: "news-02", date: "2025.08.31", title: "This is the second news about our Cafe shop" },
          { id: "news-03", date: "2025.08.31", title: "This is the third news about our Cafe shop" },
          { id: "news-04", date: "2025.08.31", title: "This is the fourth news about our Cafe shop" },
          { id: "news-05", date: "2025.08.31", title: "This is the fifth news about our Cafe shop" },
          { id: "news-06", date: "2025.08.31", title: "This is the sixth news about our Cafe shop" }
        ]);
      });
  }, []);

  return (
    <>
      <Header />
      <br />
      <main>
        <section className="section section-top section-top--spaced" aria-label="Top hero">
          <div className="top">
            <div className="top-block-1">
              <img className="top-image" src="/assets/images/news_section_top.png" alt="News hero image" />
              <h1 className="top-image-title">NEWS</h1>
              <div className="top-block-bg" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="section bg02-img" aria-label="News list">
          <div className="news">
            <div className="news-nav" aria-label="News pagination">
              <button className="nav-arrow nav-double prev" aria-label="First page">&laquo;</button>
              <button className="nav-arrow nav-single prev" aria-label="Previous page">&lt;</button>

              <nav className="nav-pages" aria-label="Page numbers">
                <button className="page">1</button>
                <span className="sep">|</span>
                <button className="page">2</button>
                <span className="sep">|</span>
                <button className="page">3</button>
                <span className="sep">|</span>
                <button className="page">4</button>
                <span className="sep">|</span>
                <button className="page">5</button>
                <span className="sep">|</span>
                <button className="page">6</button>
              </nav>

              <button className="nav-arrow nav-single next" aria-label="Next page">&gt;</button>
              <button className="nav-arrow nav-double next" aria-label="Last page">&raquo;</button>
            </div>

            <ul className="news-list" role="list">
              {items.map((it, idx) => (
                <li
                  key={it.id}
                  className={`news-itme ${idx === 0 ? "news-itme-border-top" : ""} ${idx === items.length - 1 ? "news-itme-border-bottom" : ""}`}
                >
                  <Link to={`/news/${encodeURIComponent(it.id)}`}>
                    <div className="news-date">{it.date}</div>
                    <div className="news-body">
                      <div className="news-title">{it.title}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <br /><br />
      <Footer />
    </>
  );
}