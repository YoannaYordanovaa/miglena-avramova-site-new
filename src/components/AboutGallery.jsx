import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Miglena_Avramova_Photos = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  src: `/Miglena/miglena-avramova-${i + 1}.webp`,
}));

const InteractiveGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const galleryRef = useRef(null);

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

  const showNext = (e) => {
    e.stopPropagation();
    const currentIndex = Miglena_Avramova_Photos.findIndex(
      (img) => img.id === selectedImage.id,
    );
    const nextIndex = (currentIndex + 1) % Miglena_Avramova_Photos.length;
    setSelectedImage(Miglena_Avramova_Photos[nextIndex]);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    const currentIndex = Miglena_Avramova_Photos.findIndex(
      (img) => img.id === selectedImage.id,
    );
    const prevIndex =
      (currentIndex - 1 + Miglena_Avramova_Photos.length) %
      Miglena_Avramova_Photos.length;
    setSelectedImage(Miglena_Avramova_Photos[prevIndex]);
  };

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
    <section ref={galleryRef} className="section-container scroll-mt-10">
      <div className="stack-space">
        {/* Header */}
        <div className="mb-12 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h1 className="font-display font-medium text-brand-dark leading-none mb-4">
              Любими моменти <br />
              <span className="text-brand-primary font-light italic">
                с любими хора...
              </span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brand-primary" />
              <p className="font-sans text-gray-400 text-xs tracking-[0.2em]">
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
            flex snap-x snap-mandatory no-scrollbar -mx-6 px-6 gap-4
            ${isExpanded ? "flex-wrap overflow-x-visible pb-10" : "overflow-x-auto pb-6"}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Toggle Button */}
        <div className="text-center">
          <button onClick={handleToggle} className="btn-primary ">
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
                className="fixed inset-0 z-[99999] bg-brand-light/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
                onClick={() => setSelectedImage(null)}
              >
                {/* Навигация за Мобилни (Отдолу) и Десктоп (Отстрани) */}
                <button
                  onClick={showPrev}
                  className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-3 text-white md:text-brand-dark/40 hover:text-brand-dark hover:bg-brand-primary/10 rounded-full transition-all z-[100001]"
                >
                  <ChevronLeft
                    size={window.innerWidth < 768 ? 40 : 64}
                    strokeWidth={1}
                  />
                </button>

                <button
                  onClick={showNext}
                  className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-3 text-white md:text-brand-dark/40 hover:text-brand-dark hover:bg-brand-primary/10 rounded-full transition-all z-[100001]"
                >
                  <ChevronRight
                    size={window.innerWidth < 768 ? 40 : 64}
                    strokeWidth={1}
                  />
                </button>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-6 right-6 p-4 text-brand-dark hover:rotate-90 transition-transform duration-300 z-[100001]"
                >
                  <X size={36} strokeWidth={1.5} />
                </button>

                {/* КОНТЕЙНЕР */}
                <div className="relative flex flex-col items-center justify-center w-full h-full max-w-5xl pointer-events-none">
                  <AnimatePresence mode="wait">
                    {" "}
                    <motion.div
                      key={selectedImage.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={selectedImage.src}
                        className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/50"
                        alt="Selected"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
};

export default InteractiveGallery;
