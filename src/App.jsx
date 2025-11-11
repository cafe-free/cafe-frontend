// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./assets/css/sanitize.css";

// lazy pages
const PickupPage = lazy(() => import("./components/Pickup/Pickup.jsx"));
const NewsList = lazy(() => import("./components/News/News.jsx"));
const NewsArticle = lazy(() => import("./components/News/Article/newsArticle.jsx"));
const AboutPage = lazy(() => import("./components/About/About.jsx"));
const AccessPage = lazy(() => import("./components/Access/Access.jsx"));


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