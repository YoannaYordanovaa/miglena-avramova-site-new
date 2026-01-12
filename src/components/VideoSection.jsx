import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // 1. Добавен импорт
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ESC за затваряне и блокиране на скрола
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Спираме скрола
    } else {
      document.body.style.overflow = 'unset'; // Пускаме скрола
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <section id="video" className="overflow-hidden section-container">
      <div className="mx-auto">
        
        {/* Заглавна част */}
        <div className="mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="font-display font-medium text-brand-dark case tracking-tighter leading-none mb-6">
              Защо да се присъединиш <br />
              <span className="text-brand-primary font-light italic">към нас?</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brand-primary" />
              <p className="font-sans text-gray-400 text-xs case tracking-[0.3em] font-medium">
                Превърни амбицията си в устойчив и печеливш бизнес
              </p>
            </div>
          </motion.div>
        </div>

        {/* Превю на Видеото */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div className="relative aspect-video md:aspect-[21/9] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-brand-cream border border-brand-light/20 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)]">
            
            <img 
              src="/video-cover.webp" 
              alt="Team Life" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-dark/20 transition-colors duration-500" />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center"
              >
                <div className="absolute w-24 h-24 md:w-32 md:h-32 border border-white/30 rounded-full animate-ping" />
                <div className="absolute w-20 h-20 md:w-28 md:h-28 border border-white/50 rounded-full" />
                
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white text-brand-dark rounded-full flex items-center justify-center shadow-2xl z-10 transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  <Play 
                    className="ml-1 w-6 h-6 md:w-8 md:h-8"
                    fill="currentColor" 
                  />
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-10 left-10 hidden md:block">
              <p className="text-white font-display text-xs font-medium case tracking-[0.4em] opacity-80">
                Нека ти разкажа...
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. MODAL С ИЗПОЛЗВАНЕ НА PORTAL */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[99999] bg-brand-dark/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[100000] p-2"
              >
                <X size={40} />
              </button>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-3xl bg-black relative"
              >
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/2Ak1IIp9jdc?autoplay=1" // Добавен autoplay при отваряне
                  title="Miglena Avramova Team"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default VideoSection;