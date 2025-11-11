// src/pages/pickup/pickup.jsx
import React, { Suspense } from "react";
import "../../assets/css/sanitize.css";      // still global reset (optional)
// import "../../assets/css/pickup.css"; 
import "./Pickup.css"                     // page-specific CSS (local copy or overrides)
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// lazy loading for heavy parts, use React.lazy
import Part1MainCarousel from "./Part1MainCarousel";
import Part2SectionCarousel from "./Part2SectionCarousel";
import Part3CardsCarousel from "./Part3CardsCarousel";


export default function PickupPage() {
  return (
    <>
      <Header />
      <br /><br />
      <main>
        <Suspense fallback={<div style={{padding:20}}>Loading pickup...</div>}>
          <Part1MainCarousel /><br />
          <Part2SectionCarousel /><br />
          <Part3CardsCarousel /><br />
        </Suspense>
      </main>
      <br /><br />
      <Footer />

    </>
  );
}