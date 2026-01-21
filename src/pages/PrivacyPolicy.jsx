import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  // Скролване до горе при зареждане
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: <Eye size={24} />,
      title: "1. Информация, която събираме",
      content:
        "Ние събираме информация, която Вие ни предоставяте доброволно чрез формите за контакт на сайта: Лични данни: Име, фамилия, имейл адрес, телефонен номер; Автоматично събирана информация: IP адрес, тип браузър, операционна система и данни за Вашето поведение на сайта чрез бисквитки (cookies).",
    },
    {
      icon: <FileText size={24} />,
      title: "2. Цели на обработването",
      content:
        "Използваме Вашите данни единствено за отговор на Ваши запитвания, предоставяне на информация относно бизнес възможности и продукти и подобряване на функционалността на нашия уебсайт.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "3. Споделяне на информация с трети страни",
      content:
        "Ние не продаваме Вашите лични данни. Можем да споделим информация само в следните случаи: За целите на регистрация като сътрудник във Форевър Ливинг Продъктс (само след Вашето изрично съгласие); Ако това се изисква от закона.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "4. Вашите права (GDPR)",
      content:
        "Вие имате право на достъп, коригиране или изтриване на Вашите лични данни по всяко време. Можете да оттеглите съгласието си за обработка, като се свържете с нас директно.",
    },
    {
      icon: <Lock size={24} />,
      title: "5. Сигурност на данните",
      content:
        "Прилагаме съвременни технически мерки за защита на Вашата информация срещу неоторизиран достъп, промяна или разкриване.",
    },
    {
      icon: <Lock size={24} />,
      title: "6. Бисквитки (Cookies)",
      content:
        "Нашият сайт използва бисквитки за аналитични цели (напр. Google Analytics). Можете да контролирате настройките за бисквитки във Вашия браузър.",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Section */}
      <section className="relative section-container pt-30 bg-brand-cream/30">
        <div className=" max-w-7xl mx-auto text-center">
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
            Политика за <br />
            <span className="text-brand-primary italic font-light">
              поверителност
            </span>
          </motion.h1>
          <p className="font-sans text-gray-400 uppercase tracking-[0.3em] text-[10px] md:text-xs">
            Последна актуализация: 12 Януари, 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                    {section.icon}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-brand-dark">
                    {section.title}
                  </h2>
                </div>
                <p className="font-sans text-gray-500 text-lg leading-relaxed font-light pl-16">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 p-10 bg-brand-dark rounded-[3rem] text-center text-white"
          >
            <h3 className="font-display text-2xl mb-4 text-brand-light italic">
              Въпроси относно Вашите данни?
            </h3>
            <p className="text-brand-light/80 mb-8 font-light">
              Ние сме тук, за да Ви помогнем. Пишете ни на нашия официален имейл
              адрес.
            </p>
            <a
              href="mailto:miglena.avramova@mail.com"
              className="text-brand-primary font-medium text-lg hover:underline break-all"
            >
              miglena.avramova.as@gmail.com
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
