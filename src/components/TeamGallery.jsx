import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

const photoTitles = [
  "Екипна среща",       // Снимка 1
  "Обучение в Офиса",   // Снимка 2
  "Пътуване до Гърция", // Снимка 3
  "Forever Global Rally",// Снимка 4
  "Празнична Вечеря",   // Снимка 5
  "Признание за Успех", // Снимка 6
  "Бизнес Презентация", // Снимка 7
  "Екипен Дух",         // Снимка 8
  "Първи Стъпки",       // Снимка 9
  "Лятна Академия",     // Снимка 10
  "Мотивация и Растеж", // Снимка 11
  "Международен Форум", // Снимка 12
  "Здраве и Алое",      // Снимка 13
  "Усмивки от Събитие", // Снимка 14
  "Нови Възможности",   // Снимка 15
  "Екипна Вечеря",      // Снимка 16
  "Началото на Промяната", // Снимка 17
  "Екипна среща",       // Снимка 18
  "Обучение в Офиса",   // Снимка 19
  "Пътуване до Гърция", // Снимка 20
  "Forever Global Rally",// Снимка 21
  "Празнична Вечеря",   // Снимка 22
  "Признание за Успех", // Снимка 23
  "Бизнес Презентация", // Снимка 24
  "Екипен Дух",         // Снимка 25
  "Първи Стъпки",       // Снимка 26
  "Лятна Академия",     // Снимка 27
  "Мотивация и Растеж", // Снимка 28
];
const Miglena_Avramova_Photos = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  src: `/Team/Miglena_Avramova_${i + 1}.webp`,
  title: photoTitles[i] || `Любим момент ${i + 1}`,
}));

const InteractiveGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const galleryRef = useRef(null);

  // Блокиране на скрола на body при отворена снимка
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedImage]);

  const initialCount = 8;
  const visiblePhotos = isExpanded
    ? Miglena_Avramova_Photos
    : Miglena_Avramova_Photos.slice(0, initialCount);

  const handleToggle = () => {
    if (isExpanded) {
      galleryRef.current?.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
      
      setTimeout(() => {
        setIsExpanded(false);
      }, 300);
    } else {
      setIsExpanded(true);
    }
  };

  // Функции за навигация
  const showNext = (e) => {
    e?.stopPropagation();
    const currentIndex = Miglena_Avramova_Photos.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % Miglena_Avramova_Photos.length;
    setSelectedImage(Miglena_Avramova_Photos[nextIndex]);
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    const currentIndex = Miglena_Avramova_Photos.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + Miglena_Avramova_Photos.length) % Miglena_Avramova_Photos.length;
    setSelectedImage(Miglena_Avramova_Photos[prevIndex]);
  };

  // Слушател за клавиатура
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <section ref={galleryRef} className="py-20 md:py-32 px-6 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-6xl font-display font-medium text-brand-dark case tracking-tighter leading-none mb-6">
              Запознай се <br />
              <span className="text-brand-primary font-light italic">с екипа!</span>
            </h2>

            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brand-primary" />
              <p className="font-sans text-gray-400 text-xs case tracking-[0.3em] font-medium">
               Хората, които ще те подкрепят по пътя към успеха!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Галерия */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visiblePhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                onClick={() => setSelectedImage(photo)}
                className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden cursor-pointer group bg-gray-50 shadow-sm"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                    <Maximize2 size={16} />
                  </div>
                  <p className="text-white font-sans text-sm font-medium tracking-wide">
                    {photo.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Toggle Button */}
        <div className="mt-16 text-center">
          <button
            onClick={handleToggle}
            className="btn-primary flex items-center gap-3 mx-auto group"
          >
            {isExpanded ? (
              <>
                Скрий моменти{" "}
                <ChevronUp
                  size={16}
                  className="group-hover:-translate-y-1 transition-transform"
                />
              </>
            ) : (
              <>
                Виж всички моменти{" "}
                <ChevronDown
                  size={16}
                  className="group-hover:translate-y-1 transition-transform"
                />
              </>
            )}
          </button>
        </div>
      </div>

      {/* LIGHTBOX С PORTAL */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-white/95 backdrop-blur-xl flex items-center justify-center p-6"
              onClick={() => setSelectedImage(null)}
            >
              {/* Стрелки за навигация */}
              <button 
                onClick={showPrev}
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-3 text-brand-dark/40 hover:text-brand-dark hover:bg-brand-primary/10 rounded-full transition-all z-[100001]"
              >
                <ChevronLeft size={48} strokeWidth={1} />
              </button>

              <button 
                onClick={showNext}
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-3 text-brand-dark/40 hover:text-brand-dark hover:bg-brand-primary/10 rounded-full transition-all z-[100001]"
              >
                <ChevronRight size={48} strokeWidth={1} />
              </button>

              <button 
                className="absolute top-6 right-6 p-3 hover:rotate-90 transition-transform duration-300 text-brand-dark z-[100001]"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} strokeWidth={1.5} />
              </button>

              <motion.div
                key={selectedImage.id} // Ключът позволява на Framer Motion да анимира смяната
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                  alt="Selected"
                />
                <div className="mt-8 text-center">
                  <h4 className="text-brand-dark font-display italic text-2xl md:text-3xl">
                    {selectedImage.title}
                  </h4>
                  <div className="w-8 h-[2px] bg-brand-primary mx-auto mt-4 opacity-40" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default InteractiveGallery;