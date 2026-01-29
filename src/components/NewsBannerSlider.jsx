import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3010";

const NewsBannerSlider = ({ news = [] }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (news.length <= 1) return;
    const timer = setInterval(() => paginate(1), 10000); // По-дълго време за четене
    return () => clearInterval(timer);
  }, [current, news.length]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrent((prev) => (prev === news.length - 1 ? 0 : prev + 1));
    } else {
      setCurrent((prev) => (prev === 0 ? news.length - 1 : prev - 1));
    }
  };

  if (!news || news.length === 0) return null;

  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-[#0a0a0a] max-w-[1924px] mx-auto mt-20">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Динамичен Градиент за максимална четливост */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

          {/* Изображение с фин паралакс ефект */}
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            src={news[current]?.image ? `${API_URL}${news[current].image}` : "/Miglena/news-placeholder.webp"}
            className="w-full h-full object-cover opacity-70"
            alt={news[current]?.title}
          />

          {/* Съдържание */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
              <div className="max-w-3xl">
                {/* Категория и Дата */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <span className="bg-brand-primary px-4 py-1.5 rounded-full text-[10px] text-white uppercase tracking-[0.2em] shadow-lg shadow-brand-primary/20">
                    Актуално
                  </span>
                  <div className="flex items-center gap-2 text-white/60 text-[11px] uppercase tracking-widest font-medium">
                    <Calendar size={14} className="text-brand-primary" />
                    {news[current]?.date}
                  </div>
                </motion.div>

                {/* Заглавие */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-4xl md:text-7xl font-display text-white leading-[1.1] tracking-tighter mb-6 text-balance"
                >
                  {news[current]?.title}
                </motion.h2>

                {/* Описание */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/60 font-sans font-light text-lg md:text-xl line-clamp-2 leading-relaxed mb-10 max-w-xl"
                >
                  {news[current]?.text?.replace(/<[^>]*>?/gm, "")}
                </motion.p>

                {/* Бутон */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to={`/news/${news[current]?.id}`}
                    className="group relative inline-flex items-center gap-3 text-brand-primary"
                  >
                    <span className="relative z-10">Виж детайли</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Навигация - Glassmorphism */}
      <div className="absolute bottom-12 right-6 md:right-12 z-30 flex items-center gap-3">
        <button
          onClick={() => paginate(-1)}
          className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 group"
        >
          <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Изтънчени индикатори (Dots) */}
      <div className="absolute bottom-12 left-6 md:left-12 z-30 flex items-center gap-3">
        {news.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            className="group py-4 focus:outline-none"
          >
            <div
              className={`h-[3px] transition-all duration-700 rounded-full ${
                idx === current ? "w-12 bg-brand-primary" : "w-6 bg-white/20 group-hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default NewsBannerSlider;