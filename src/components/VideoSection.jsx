import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="video" className=" overflow-hidden py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Заглавна част в стила на Join страницата */}
        <div className="mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className=" font-display font-medium text-brand-dark case tracking-tighter leading-none mb-6">
              Защо да се присъединиш <br />
              <span className="text-brand-primary font-light italic">към нас?</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brand-primary" />
              <p className="font-sans text-gray-400 text-xs case tracking-[0.3em] font-medium">
                Един проект, една визия, едно семейство
              </p>
            </div>
          </motion.div>
        </div>

        {/* Видео контейнер с "Join" стилистика */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {/* Рамка и Сянка */}
          <div className="relative aspect-video md:aspect-[21/9] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-brand-cream border border-brand-light/20 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)]">
            
            {/* Thumbnail */}
            <img 
              src="/video-cover.jpg" 
              alt="Team Life" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Тъмен филтър (Overlay) */}
            <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-dark/20 transition-colors duration-500" />

            {/* Централен Play бутон - Минималистичен */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center"
              >
                {/* Външни пулсиращи кръгове */}
                <div className="absolute w-24 h-24 md:w-32 md:h-32 border border-white/30 rounded-full animate-ping" />
                <div className="absolute w-20 h-20 md:w-28 md:h-28 border border-white/50 rounded-full" />
                
                {/* Самият бутон */}
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white text-brand-dark rounded-full flex items-center justify-center shadow-2xl z-10 transition-colors group-hover:bg-brand-primary group-hover:text-white">
                 <Play 
  className="ml-1 w-6 h-6 md:w-8 md:h-8" // w-6 = 24px, w-8 = 32px
  fill="currentColor" 
/>
                </div>
              </motion.div>
            </div>

            {/* Текст в ъгъла (като списание) */}
            <div className="absolute bottom-10 left-10 hidden md:block">
              <p className="text-white font-display text-xs font-medium case tracking-[0.4em] opacity-80">
                Нека ти разкажа...
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL / LIGHTBOX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-dark/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={40} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-3xl bg-black"
            >
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/2Ak1IIp9jdc" 
                title="Miglena Avramova Team"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoSection;