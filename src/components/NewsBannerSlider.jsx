import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const NewsBannerSlider = ({ news = [] }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // 1 за напред, -1 за назад

  // Автоматична смяна на слайдовете
  useEffect(() => {
    if (news.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
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
    <section className="relative h-[400px] md:h-[400px] w-full overflow-hidden bg-brand-dark mt-20">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* Overlay за четливост на текста */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent z-10" />

          {/* Снимка */}
          <img
            src={news[current]?.image || "/Miglena/news-placeholder.webp"}
            className="w-full h-full object-cover opacity-60"
            alt={news[current]?.title}
          />

          {/* Съдържание */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
              <div className="max-w-2xl space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <span className="bg-brand-primary/20 backdrop-blur-md border border-brand-primary/30 px-3 py-1 rounded-full text-[10px] text-brand-primary font-bold uppercase tracking-[0.2em]">
                    Актуално
                  </span>
                  <span className="text-white text-[10px] uppercase tracking-widest font-medium">
                    {news[current]?.date}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-4xl font-display text-white leading-[1.1] tracking-tight"
                >
                  {news[current]?.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/70 font-sans font-light text-base md:text-xl line-clamp-2 leading-relaxed"
                >
                  {news[current]?.text?.replace(/<[^>]*>?/gm, "")}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <Link
                    to={`/news/${news[current]?.id}`}
                    className="btn-primary group inline-flex items-center"
                  >
                    Прочети повече
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Навигационни стрелки (само за десктоп) */}
      <div className="absolute bottom-10 right-12 z-30 hidden md:flex gap-4">
        <button
          onClick={() => paginate(-1)}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all group"
        >
          <ChevronLeft size={24} className="group-active:scale-90" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all group"
        >
          <ChevronRight size={24} className="group-active:scale-90" />
        </button>
      </div>

      {/* Прогрес точки (Dots) */}
      <div className="absolute bottom-10 left-12 z-30 flex gap-2">
        {news.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              idx === current ? "w-8 bg-brand-primary" : "w-2 bg-brand-light/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsBannerSlider;
