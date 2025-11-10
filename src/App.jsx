// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./assets/css/sanitize.css";

// lazy pages
const PickupPage = lazy(() => import("./pages/pickup/pickup.jsx"));
const NewsList = lazy(() => import("./pages/news/news.jsx"));
const NewsArticle = lazy(() => import("./pages/news/Article/newsArticle.jsx"));
const AboutPage = lazy(() => import("./pages/about/about.jsx"));
const AccessPage = lazy(() => import("./pages/access/access.jsx"));


export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<PickupPage />} />
          <Route path="/pickup" element={<PickupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/access" element={<AccessPage />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          {/* add other routes here */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}