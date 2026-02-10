import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3010";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const response = await fetch(`${API_URL}/getNews`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Грешка при зареждане на новините:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-left space-y-4">
          <span className="font-accent text-3xl text-brand-primary block">
            актуално
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-brand-dark tracking-tighter italic">
            Новини &{" "}
            <span className="text-brand-primary not-italic">Събития</span>
          </h1>
          <p className="font-sans text-gray-500 text-xl max-w-2xl font-light">
            Бъдете в крак с последните новини от света на уелнеса и нашия екип.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.length > 0 ? (
            news.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-brand-light rounded-[3rem] overflow-hidden border border-brand-light/50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                {/* Снимка на новината (Добавена) */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      item.image
                        ? `${API_URL}${item.image}`
                        : "/news-placeholder.webp"
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={item.title}
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-dark shadow-sm">
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className="p-10 flex flex-col flex-grow">
                  <h2 className="font-display text-3xl text-brand-dark mb-6 group-hover:text-brand-primary transition-colors leading-tight">
                    {item.title}
                  </h2>

                  <p className="font-sans text-gray-500 leading-relaxed mb-8 line-clamp-3 flex-grow font-light text-lg">
                    {item.text?.replace(/<[^>]*>?/gm, "")}
                  </p>

                  <Link
                    to={`/news/${item.id}`}
                    className="pt-6 border-t border-brand-light flex items-center justify-between group/link"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover/link:text-brand-primary transition-colors">
                      Прочети повече
                    </span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                </div>
              </motion.article>
            ))
          ) : !loading ? (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-brand-primary/20 rounded-[3rem]">
              <p className="text-gray-400 font-display text-2xl italic">
                В момента няма нови новини...
              </p>
            </div>
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="animate-spin w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
