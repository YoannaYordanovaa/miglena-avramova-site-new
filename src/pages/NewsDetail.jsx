import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Share2, ArrowRight } from "lucide-react";

// Пътят към вашия бекенд
const API_URL = "http://localhost:3010";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- ВСИЧКИ ХУКОВЕ ТРЯБВА ДА СА ТУК (НАЙ-ОТГОРЕ) ---
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false); // Дефинираме променливата тук

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${API_URL}/getNews`);
        const allNews = await response.json();
        const found = allNews.find((n) => n.id.toString() === id);
        setArticle(found);
      } catch (error) {
        console.error("Грешка при изтегляне на статията:", error);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    fetchArticle();
  }, [id]);

  // --- УСЛОВНИТЕ ПРОВЕРКИ ЗА RETURN ТРЯБВА ДА СА СЛЕД ХУКОВЕТЕ ---
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!article)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-cream space-y-6">
        <p className="font-display text-2xl text-brand-dark italic">Статията не е намерена...</p>
        <button onClick={() => navigate("/news")} className="btn-primary">Назад към начало</button>
      </div>
    );

  return (
    <div className="section-container text-brand-dark overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        {/* Бутон Назад */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-gray-400 hover:text-brand-primary transition-all mb-8 md:mb-12 uppercase text-[12px]"
        >
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
            <ArrowLeft size={16} />
          </div>
          Назад към продукти
        </button>

        {/* Хедър на статията */}
        <header className="space-y-6 mb-12 text-center">
          <div className="flex justify-center items-center gap-4 text-brand-primary font-bold text-[10px] uppercase tracking-[0.3em]">
            <span className="bg-brand-primary/10 px-4 py-2 rounded-full flex items-center gap-2">
              <Calendar size={12} /> {article.date}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-brand-dark tracking-tighter text-balance leading-[1.1]">
            {article.title}
          </h1>
        </header>

        {/* Основна Снимка */}
        {article.image && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 rounded-[2.5rem] md:rounded-[2.5rem] bg-white overflow-hidden shadow-2xl border-[6px] md:border-[6px] border-white"
          >
            <img
              src={`${API_URL}${article.image}`}
              className="w-full h-auto object-cover max-h-[600px]"
              alt={article.title}
            />
          </motion.div>
        )}

        {/* СЪДЪРЖАНИЕ */}
        <article className="bg-brand-light backdrop-blur-md rounded-[2.5rem] md:rounded-[2.5rem] p-8 md:p-20 shadow-sm border border-white/50 text-left relative">
          <div
  className="article-content bg-brand-light!"
  dangerouslySetInnerHTML={{ __html: article.text }}
/>

          {/* Бутон за действие */}
          {article.buttonText && article.buttonLink && (
            <div className="pt-12 border-t border-brand-light flex justify-center md:justify-start">
              <a
                href={article.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary "
              >
                {article.buttonText}
                <ArrowRight
                  size={18}
                  className="ml-3 group-hover:translate-x-2 transition-transform duration-500"
                />
              </a>
            </div>
          )}

          {/* Footer на статията */}
          <div className="mt-16 pt-10 border-t border-brand-light flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4 text-left w-full md:w-auto">
              <div className="w-14 h-14 rounded-full bg-brand-dark text-brand-primary flex items-center justify-center font-bold font-display text-xl shadow-lg border-2 border-brand-primary/20">
                M
              </div>
              <div>
                <span className="block text-xl font-display text-brand-dark leading-none">
                  Миглена Аврамова
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-brand-primary mt-1">
                  Автор & Консултант
                </span>
              </div>
            </div>

            {/* БУТОН ЗА СПОДЕЛЯНЕ */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }
              }}
              className={`
                relative overflow-hidden flex items-center gap-2 px-8 py-4 rounded-full 
                text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500
                ${copied 
                  ? "bg-brand-primary text-white border-brand-primary shadow-lg" 
                  : "bg-white text-gray-400 border border-gray-100 hover:text-brand-primary hover:border-brand-primary/30"
                }
              `}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                  >
                    Линкът е копиран
                  </motion.span>
                ) : (
                  <motion.div
                    key="share"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Share2 size={14} /> Сподели статията
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </article>
      </motion.div>

  
    </div>
  );
};

export default NewsDetail;