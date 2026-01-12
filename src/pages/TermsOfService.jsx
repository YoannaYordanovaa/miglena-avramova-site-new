import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Scale, ShieldAlert, ShoppingBag, Users, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: <Info size={24} />,
      title: "1. Обща информация",
      content: "Този уебсайт е собственост на Миглена Аврамова, независим собственик на бизнес (FBO) към Forever Living Products. Информацията тук е с цел представяне на бизнес възможности и уелнес продукти."
    },
    {
      icon: <Users size={24} />,
      title: "2. Ползване на сайта",
      content: "С достъпа си до този сайт, Вие се съгласявате да го използвате само за законни цели. Забранено е копирането на текстово или визуално съдържание без изричното съгласие на автора."
    },
    {
      icon: <ShoppingBag size={24} />,
      title: "3. Продукти и Поръчки",
      content: "Всички поръчки на продукти се осъществяват през официалната платформа на Forever Living. Ние не съхраняваме плащания и не носим отговорност за логистиката, извършвана от компанията-майка."
    },
    {
      icon: <ShieldAlert size={24} />,
      title: "4. Отказ от отговорност",
      content: "Продуктите и съветите в този сайт не са предназначени за диагностика, лечение или предотвратяване на заболявания. Консултирайте се с лекар преди започване на всякакви нови хранителни режими."
    },
    {
      icon: <Scale size={24} />,
      title: "5. Промени в условията",
      content: "Запазваме си правото да актуализираме тези Общи условия по всяко време. Ваше задължение е периодично да проверявате тази страница за промени."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
         <section className="relative pt-32 pb-20 px-6 bg-brand-cream/30">
             <div className="max-w-4xl mx-auto text-center">
               <Link 
                 to="/" 
                 className="inline-flex items-center gap-2 text-brand-primary mb-8 hover:-translate-x-2 transition-transform font-sans text-xs uppercase tracking-widest font-bold"
               >
                 <ArrowLeft size={16} /> Обратно към началото
               </Link>
               
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="font-display text-5xl md:text-7xl text-brand-dark mb-6 tracking-tighter"
               >
                 Общи <br />
                 <span className="text-brand-primary italic font-light">условия</span>
               </motion.h1>
               <p className="font-sans text-gray-400 uppercase tracking-[0.3em] text-[10px] md:text-xs">
                 Последна актуализация: 12 Януари, 2026
               </p>
             </div>
           </section>

      {/* Content Section */}
      <section className="section-container py-5 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-16">
            {sections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col md:flex-row gap-6 md:gap-10"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                    {section.icon}
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl text-brand-dark">
                    {section.title}
                  </h2>
                  <p className="font-sans text-gray-500 text-lg leading-relaxed font-light pt-4">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Statement */}
          <div className="mt-24 pt-12 border-t border-brand-light">
            <p className="font-sans text-gray-400 text-sm text-center leading-relaxed italic">
              Използвайки този уебсайт, Вие потвърждавате, че сте прочели и разбрали настоящите Общи условия. За допълнителна информация, моля свържете се с нас.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;