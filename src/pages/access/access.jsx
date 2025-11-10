import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/sanitize.css"; // optional if already imported globally
import "./access.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";



export default function AccessMain() {
  return (
    <>
     <Header />
     <br />
    <main className="section bg01-img" aria-label="Access">

    <section className="section section-top section-top--spaced" aria-hidden="true">
    <div className="top">
        <div className="top-block-1">
        <img
            className="top-image"
            src="/assets/images/news_section_top.png"
            alt="News hero image"
        />
        <h1 className="top-image-title">ACCESS</h1>
        <div className="top-block-bg" aria-hidden="true" />
        </div>
    </div>
    </section>

    <div className="access" role="region" aria-label="Location and information">
    <div className="access-left">
        <div className="access-map" aria-hidden="false">
        <iframe
            className="gmap"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509123!2d144.9537353153163!3d-37.81627997975157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11b1b3%3A0x5045675218ceed30!2sCafe%20de%20Coral!5e0!3m2!1sen!2sau!4v1616161616161!5m2!1sen!2sau"
            title="Location map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
        />
        </div>
    </div>

    <div className="access-right">
        <div className="access-infor">
        <div className="access-infor-address access-infor-font">
            <strong>Address</strong>: 近豐澤樓, 彩雲(二)邨啟輝樓 九龍彩雲二邨清水灣道55號, 55 Clear Water Bay Rd
        </div>
        <div className="access-infor-telephone access-infor-font">
            <strong>Telephone</strong>: 2123 4567
        </div>
        <div className="access-infor-business-hours access-infor-font">
            <strong>Business Hours</strong>: 10:00 - 12:30, 14:30 - 19:00
        </div>
        </div>
    </div>
    </div>
    </main>
     <Footer />
    </>

  );
}