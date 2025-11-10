// src/pages/news/article/newsArticle.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../../assets/css/sanitize.css"; // optional if already global
import "../news.css"; // reuse main news styles
import "./newsArticle.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function NewsArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`/assets/data/news-${encodeURIComponent(id)}.json`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(setArticle)
      .catch(() => {
        setArticle({
          id,
          title: "2025 Cafe New Coffee Highlight: Mashed Raspberry Cold Brew with Micro-Oxidized Beans",
          date: "2025.08.31",
          content:
            "<p>This trending specialty drink blends sun-ripened raspberry puree with cold-brewed coffee made from micro-oxidized beans. It's low-sugar, high-acid, and delivers a fresh raspberry tang balanced by smooth coffee. Topped with oat milk foam, it's become a viral hit in boutique cafes.</p>"
        });
      });
  }, [id]);

  if (!article) return <div style={{ padding: 20 }}>Loading…</div>;

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

        <section className="section bg02-img" aria-label="Article">
          <div className="news-article">
            <div className="news-article-date"><b>{article.date}</b></div>
            <h2 className="news-article-title">{article.title}</h2>
            <div className="news-article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
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