import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const savedNews = localStorage.getItem("miglena_news");
    if (savedNews) setNews(JSON.parse(savedNews));
  }, []);

  return (
    <div className=" min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-left space-y-4">
          <span className="font-accent text-3xl text-brand-primary block">актуално</span>
          <h1 className="font-display text-5xl md:text-7xl text-brand-dark tracking-tighter italic">
            Новини & <span className="text-brand-primary not-italic">Събития</span>
          </h1>
          <p className="font-sans text-gray-500 text-xl max-w-2xl font-light">
            Бъдете в крак с последните новини от света на уелнеса, екипните ни срещи и вдъхновяващи истории.
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
                className="group bg-white rounded-[3rem] p-10 border border-brand-light/50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-6 text-[10px] uppercase tracking-widest font-bold text-brand-primary">
                  <Calendar size={14} />
                  {item.date}
                </div>
                
                <h2 className="font-display text-3xl text-brand-dark mb-6 group-hover:text-brand-primary transition-colors leading-tight">
                  {item.title}
                </h2>
                
                <p className="font-sans text-gray-500 leading-relaxed mb-8 line-clamp-4 flex-grow font-light text-lg">
                  {item.text}
                </p>

                <div className="pt-6 border-t border-brand-light flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Прочети повече</span>
                  <div className="w-10 h-10 rounded-full  flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-brand-primary/20 rounded-[3rem]">
              <p className="text-gray-400 font-display text-2xl italic">В момента няма нови новини...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;