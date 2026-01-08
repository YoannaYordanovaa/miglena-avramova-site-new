import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutDetailed from "./components/AboutDetailed"; // Този компонент обединява всичко за началната страница
import JoinTeam from "./components/JoinTeam";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; // Помощен компонент за скролване нагоре
import Products from "./components/products";
import News from "./components//News";
import AdminPanel from "./components/AdminPanel";
import NewsDetail from "./components/NewsDetail"; // Импорт

function App() {
  return (
    <Router>
      {/* ScrollToTop трябва да е вътре в Router, но извън Routes */}
      <ScrollToTop />

      <div className="min-h-screen bg-brand-cream selection:bg-brand-primary selection:text-white">
        <Navbar />

        <main>
          <Routes>
            {/* Начална страница - вече използва Home вместо Hero */}
            <Route path="/" element={<Home />} />

            {/* Страница Ела в моя екип */}
            <Route path="/join" element={<JoinTeam />} />
            <Route path="/about" element={<AboutDetailed />} />
            <Route path="/shop" element={<Products />} />
            <Route path="/shop/:category" element={<Products />} />
            <Route path="/news" element={<News />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/news/:id" element={<NewsDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
