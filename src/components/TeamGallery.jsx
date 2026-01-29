import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Maximize2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Miglena_Avramova_Photos = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  src: `/Team/Miglena_Avramova_${i + 1}.webp`,
}));

const InteractiveGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const galleryRef = useRef(null);

  // Спираме скрола на основната страница, когато снимката е отворена
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const initialCount = 8;
  const visiblePhotos = isExpanded
    ? Miglena_Avramova_Photos
    : Miglena_Avramova_Photos.slice(0, initialCount);

  const handleToggle = () => {
    if (isExpanded) {
      galleryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        setIsExpanded(false);
      }, 300);
    } else {
      setIsExpanded(true);
    }
  };

  // Функции за навигация в Lightbox-а
  const showNext = (e) => {
    e.stopPropagation();
    const currentIndex = Miglena_Avramova_Photos.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % Miglena_Avramova_Photos.length;
    setSelectedImage(Miglena_Avramova_Photos[nextIndex]);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    const currentIndex = Miglena_Avramova_Photos.findIndex(
      (img) => img.id === selectedImage.id
    );
    const prevIndex =
      (currentIndex - 1 + Miglena_Avramova_Photos.length) %
      Miglena_Avramova_Photos.length;
    setSelectedImage(Miglena_Avramova_Photos[prevIndex]);
  };

  // Поддръжка на клавишни стрелки
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") showNext(e);
      if (e.key === "ArrowLeft") showPrev(e);
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <section ref={galleryRef} className="section-container scroll-mt-10 bg-brand-light">
      <div className="stack-space">
        {/* Header */}
        <div className="mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h1 className=" font-display font-medium text-brand-dark case leading-none mb-4">
              Запознай се <br />
              <span className="text-brand-primary font-light italic">
                с екипа!
              </span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brand-primary" />
              <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                Защото най-големият успех е свободата да бъдеш с тези, които
                обичаш...
              </p>
            </div>
          </motion.div>
        </div>

       {/* Галерия */}
<motion.div
  layout
  className={`
    /* Базови стилове за мобилни */
    flex snap-x snap-mandatory no-scrollbar -mx-6 px-6 gap-4
    
    /* АКО Е РАЗПЪНАТО: Преминаваме към решетка или wrap-ване */
    ${isExpanded 
      ? "flex-wrap overflow-x-visible pb-10" 
      : "overflow-x-auto pb-6"}

    /* ДЕСКТОП: Винаги решетка */
    sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-x-visible sm:pb-0 sm:mx-0 sm:px-0 md:gap-6
  `}
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
        className={`
          /* Снимката на телефон: Ако НЕ е разпънато, заема 80% за скрол. Ако Е разпънато, заема около 45% за решетка */
          ${isExpanded ? "min-w-[calc(50%-1rem)]" : "min-w-[80vw]"}
          sm:min-w-0 
          relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer group bg-gray-50 shadow-sm snap-center
        `}
      >
        <img
          src={photo.src}
          alt={photo.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* ... останалият код за overlay-а остава същият ... */}
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
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] bg-brand-light/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                onClick={() => setSelectedImage(null)}
              >
                {/* Контроли за навигация */}
                <button
                  onClick={showPrev}
                  className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-3 text-white md:text-brand-dark/40 hover:text-brand-dark hover:bg-brand-primary/10 rounded-full transition-all z-[100001]"
                >
                  <ChevronLeft size={48} strokeWidth={1} />
                </button>

                <button
                  onClick={showNext}
                  className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-3 text-white md:text-brand-dark/40 hover:text-brand-dark hover:bg-brand-primary/10 rounded-full transition-all z-[100001]"
                >
                  <ChevronRight size={48} strokeWidth={1} />
                </button>

                <button className="absolute top-6 right-6 p-4 text-brand-dark hover:rotate-90 transition-transform duration-300 z-[100001]">
                  <X size={36} strokeWidth={1.5} />
                </button>

                <motion.div
                  key={selectedImage.id} // Важно за анимацията при смяна на снимка
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-20 max-w-5xl w-full flex flex-col items-center gap-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedImage.src}
                    className="max-w-full max-h-[100vh] object-contain rounded-2xl shadow-2xl border border-gray-100"
                    alt="Selected"
                  />
                  <div className="text-center">
                    <h4 className="text-brand-dark font-display italic text-2xl md:text-3xl leading-none">
                      {selectedImage.title}
                    </h4>
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
