// src/pages/about/about.jsx
import React from "react";
import "../../assets/css/sanitize.css";
import "./about.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
        <br />
      {/* Top cover (same structure as original about.html) */}
      <section className="section section-top section-top--spaced" aria-label="Top hero">
        <div className="top">
          <div className="top-block-1">
            <img
              className="top-image"
              src="/assets/images/news_section_top.png"
              alt="About hero image"
              loading="lazy"
            />
            <h1 className="top-image-title">ABOUT</h1>
            <div className="top-block-bg" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* main about section (keeps original class names and layout) */}
      <section className="section bg01-img" aria-label="About">
        <div className="section-title">
          <div className="about-itme" role="region" aria-label="About information">
            <div className="about-itme-img" aria-hidden="true">
              <img
                src="/assets/images/AboutImg.png"
                alt="About image"
                loading="lazy"
              />
            </div>

            <div className="about-itme-text">
              <div className="about-itme-text-line-top" aria-hidden="true">
                <img src="/assets/images/Line 1.png" alt="" />
              </div>

              <div className="about-itme-text-title">Wandering Time</div>

              <div className="about-itme-text-infor">
                Push open the wooden door and be enveloped by warm yellow light.
                There's no hurried pace here, just the soft, slouchy sofas, the caramel aroma of hand-poured
                coffee, and the sparsely-flipped magazines on the bookshelf.
                <br />
                <br />
                Don't rush! Order a latte with a handmade scone, watch the sunlight filter through the gauze
                curtains onto the tabletop, or chat with friends by the window, letting time slip by. This isn't
                just a place to grab a cup of coffee, it's a little corner where you can pause and unwind for a
                moment.
              </div>

              <div className="about-itme-text-line-under" aria-hidden="true">
                <img src="/assets/images/Line 1.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}