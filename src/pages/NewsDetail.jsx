import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Share2, ArrowRight, User } from "lucide-react";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("miglena_news") || "[]");
    const found = saved.find((n) => n.id.toString() === id);
    setArticle(found);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!article)
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="bg-brand-cream min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6 font-sans text-brand-dark overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        {/* Бутон Назад */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-gray-400 hover:text-brand-primary transition-all mb-8 md:mb-12 uppercase text-[10px] font-bold tracking-[0.2em] italic"
        >
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
            <ArrowLeft size={16} />
          </div>
          Към всички новини
        </button>

        {/* Хедър на статията */}
        <header className="space-y-6 mb-12 text-center">
          <div className="flex items-center gap-4 text-brand-primary font-bold text-[10px] uppercase tracking-[0.3em]">
            <span className="bg-brand-primary/10 px-3 py-1 rounded-full flex items-center gap-2">
              <Calendar size={12} /> {article.date}
            </span>
          </div>
          <h1 className="font-display text-brand-dark tracking-tighter text-balance">
            {article.title}
          </h1>
        </header>

        {/* Основна Снимка */}
        {article.image && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-[6px] md:border-[12px] border-white soft-shadow"
          >
            <img
              src={article.image}
              className="w-full h-full object-cover max-h-[500px]"
              alt={article.title}
            />
          </motion.div>
        )}

        {/* СЪДЪРЖАНИЕ */}
        <article className="bg-white/70 backdrop-blur-md rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 shadow-sm border border-white/50 text-left relative">
          <div
            className="tiptap-content font-sans leading-relaxed font-regular text-brand-dark/70"
            dangerouslySetInnerHTML={{ __html: article.text }}
          />

          {/* Бутон за действие (Action Button) */}
          {article.buttonText && article.buttonLink && (
            <div className="mt-16 pt-12 border-t border-brand-light flex justify-center md:justify-start">
              <a
                href={article.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
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

            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors border border-gray-100 px-6 py-3 rounded-full hover:bg-white active:scale-95">
              <Share2 size={14} /> Сподели статията
            </button>
          </div>

          {/* Декоративен елемент */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
        </article>

        {/* Долна навигация */}
        <div className="mt-12 text-center">
          <p className="font-display italic text-brand-dark/40 ">
            Благодарим ви, че четете нашия блог.
          </p>
        </div>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .tiptap-content p { margin-bottom: 1.8rem; line-height: 1.8; }
        .tiptap-content b, .tiptap-content strong { font-weight: 700; color: #003f00; font-style: normal; }
        .tiptap-content a { color: #74ab1a; text-decoration: underline; text-underline-offset: 4px; font-weight: 600; transition: opacity 0.3s; }
        .tiptap-content a:hover { opacity: 0.7; }
        
        .tiptap-content h2 { font-family: "Cormorant Infant", serif; font-size: 2.2rem; color: #003f00; margin: 3rem 0 1.5rem; font-style: italic; line-height: 1.2; }
        .tiptap-content h3 { font-family: "Cormorant Infant", serif; font-size: 1.8rem; color: #003f00; margin: 2rem 0 1rem; font-style: italic; }
        
        .tiptap-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 2rem; color: #74ab1a; }
        .tiptap-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 2rem; color: #74ab1a; }
        .tiptap-content li { margin-bottom: 0.8rem; color: #4b5563; }
        
        .tiptap-content blockquote { 
          border-left: 4px solid #74ab1a; 
          padding: 1rem 0 1rem 2rem; 
          margin: 3rem 0; 
          font-size: 1.5rem; 
          color: #003f00; 
          background: rgba(116, 171, 26, 0.03);
          border-radius: 0 2rem 2rem 0;
        }

        .tiptap-content img { 
          border-radius: 2rem; 
          margin: 3rem auto; 
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border: 4px solid white;
        }

        @media (max-width: 768px) {
          .tiptap-content h2 { font-size: 1.8rem; }
          .tiptap-content blockquote { font-size: 1.2rem; padding-left: 1.5rem; }
          .tiptap-content p { font-size: 1.1rem; }
        }
      `,
        }}
      />
    </div>
  );
};

export default NewsDetail;
