import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutDetailed from "./pages/AboutDetailed";
import JoinTeam from "./pages/JoinTeam";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Products from "./pages/products";
import News from "./components/News";
import AdminPanel from "./pages/AdminPanel";
import NewsDetail from "./pages/NewsDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function App() {
  return (
    <Router>
      <ScrollToTop />

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
              <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
            </Routes>
          </MainLayout>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
