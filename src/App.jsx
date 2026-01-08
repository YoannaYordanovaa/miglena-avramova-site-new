import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutDetailed from "./components/AboutDetailed";
import JoinTeam from "./components/JoinTeam";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Products from "./components/products"; // ПРОВЕРИ ДАЛИ НЕ Е Products
import News from "./components/News"; // ПОПРАВЕНО: Премахната двойна наклонена черта
import AdminPanel from "./components/AdminPanel";
import NewsDetail from "./components/NewsDetail";
import TeamGallery from "./components/TeamGallery";
import VideoSection from "./components/VideoSection";

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Контейнерът тук има bg-brand-cream, но MainLayout също има. 
          Можеш да оставиш само един за по-чист код. */}
      <div className="min-h-screen selection:bg-brand-primary selection:text-white">
        <Navbar />
        <main>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<JoinTeam />} />
              <Route path="/about" element={<AboutDetailed />} />
              <Route path="/shop" element={<Products />} />
              <Route path="/shop/:category" element={<Products />} />
              <Route path="/news" element={<News />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/joingallery" element={<TeamGallery />} />
              <Route path="/joinvideo" element={<VideoSection />} />
            </Routes>
          </MainLayout>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;