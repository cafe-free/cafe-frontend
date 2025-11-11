// src/pages/news/article/newsArticle.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import "../../../assets/css/sanitize.css";
import "../news.css";
import "./newsArticle.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { newsArticles } from "../../../assets/data/newsData.js";

export default function NewsArticle() {
  const { id } = useParams();
  const article = newsArticles.find((a) => a.id === id);

  // Fallback if article not found (safety net)
  if (!article) {
    return (
      <>
        <Header />
        <main style={{ padding: 40, textAlign: "center" }}>
          <p>Article not found.</p>
          <Link to="/news">← Back to News</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <br />
      <main>
        {/* section news header */}
        <section className="section section-top section-top--spaced" aria-label="Top hero">
          <div className="top">
            <div className="top-block-1">
              <img className="top-image" src="/assets/images/news_section_top.png" alt="News hero image" />
              <h1 className="top-image-title">NEWS</h1>
              <div className="top-block-bg" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* news section image  */}
        <section className="section bg02-img" aria-label="Article">
          <div className="news-article">
            <div className="article-layout">
              {/* <img src={article.image} alt={article.title} className="article-image" /> */}
              <div className="article-text">
                <h2 className="news-article-title">{article.title}</h2>
                <br /><img src={article.image} alt={article.title} className="article-image" /><br />
                <br /><div className="news-article-date"><b>{article.date}</b></div>
                <div
                  className="news-article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <Link to="/news">← Back to News</Link>
            </div>
          </div>
        </section>

        
      </main>
      <Footer />
    </>
  );
}