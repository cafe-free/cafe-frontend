// src/pages/news/news.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/sanitize.css";
import "./news.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { newsArticles } from "../../assets/data/newsData.js";

export default function NewsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(newsArticles.length / itemsPerPage);
  const displayedItems = newsArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <Header />
      {/* <br /> */}
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
              {/* <button
                className="nav-arrow nav-double prev"
                aria-label="First page"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                &laquo;
              </button> */}
              <button
                className="nav-arrow nav-single prev"
                aria-label="Previous page"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              <nav className="nav-pages" aria-label="Page numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <React.Fragment key={page}>
                    {page > 1 && <span className="sep">|</span>}
                    <button
                      className={`page ${page === currentPage ? "active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
              </nav>

              <button
                className="nav-arrow nav-single next"
                aria-label="Next page"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
              {/* <button 
                className="nav-arrow nav-double next"
                aria-label="Last page"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button> */}
            </div>

            <ul className="news-list" role="list">
              {displayedItems.map((it, idx) => (
                <li
                  key={it.id}
                  className={`news-item ${idx === 0 ? "news-item-border-top" : ""} ${idx === displayedItems.length - 1 ? "news-item-border-bottom" : ""}`}
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