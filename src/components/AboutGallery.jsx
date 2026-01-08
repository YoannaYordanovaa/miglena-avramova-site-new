import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Plus } from 'lucide-react';

// Помощна функция за заглавия
function getPhotoTitle(id) {
  const titles = {
    1: "Екипна среща", 2: "Обучение", 3: "Пътуване", 4: "Forever Event",
    5: "Вечеря", 6: "Успех", 7: "Презентация", 8: "Екипен дух"
  };
  return titles[id] || `Момент ${id}`;
}

const Miglena_Avramova_Photos = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  src: `/Miglena/miglena-avramova-${i + 1}.jpg`,
  title: getPhotoTitle(i + 1),
}));

const InteractiveGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const showAllPhotos = () => setVisibleCount(Miglena_Avramova_Photos.length);

  return (
    <section className="py-20 md:py-32 px-6   overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Заглавна част в стила на началната страница */}
   <div className="mb-16 text-left">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                      >
                        <h2 className="text-4xl md:text-6xl font-display font-medium text-brand-dark case tracking-tighter leading-none mb-6">
                        Любими моменти <br />
                          <span className="text-brand-primary font-light italic">
                            с любими хора...
                          </span>
                        </h2>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-[1px] bg-brand-primary" />
                          <p className="font-sans text-gray-400 text-xs case tracking-[0.3em] font-medium">
                            Един проект, една визия, едно семейство
                          </p>
                        </div>
                      </motion.div>
                    </div>

        {/* Masonry Grid с по-модерни отстояния */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {Miglena_Avramova_Photos.slice(0, visibleCount).map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedImage(photo)}
                className="relative break-inside-avoid rounded-[2.5rem] overflow-hidden cursor-zoom-in group soft-shadow transition-all duration-500 hover:-translate-y-2"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Елегантен Overlay */}
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white/20 backdrop-blur-md p-5 rounded-full text-white mb-4 scale-50 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 size={24} />
                  </div>
                  <p className="text-white font-display text-lg italic tracking-wide text-center px-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {photo.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Бутон "Виж повече" в стила на бранда */}
        {visibleCount < Miglena_Avramova_Photos.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 text-center"
          >
            <button
              onClick={showAllPhotos}
              className="btn-primary flex items-center gap-3 mx-auto group"
            >
              Виж още моменти
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </motion.div>
        )}
      </div>

      {/* LIGHTBOX MODAL - Напълно изчистен */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-dark/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-all">
              <X size={40} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-8"
            >
              <img
                src={selectedImage.src}
                className="max-w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl border-4 border-white/10"
                alt="Selected"
              />
              <div className="text-center space-y-2">
                <span className="font-accent text-3xl text-brand-primary block">{selectedImage.title}</span>
                <p className="font-sans text-xs case tracking-[0.3em] text-white/40 font-medium italic">Споделен момент</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveGallery;