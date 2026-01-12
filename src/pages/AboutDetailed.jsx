import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import AboutGallery from "../components/AboutGallery";

import {
  Heart,
  Dog,
  Star,
  Leaf,
  X,
  ArrowRight,
  Sparkles,
  Coffee,
  Briefcase,
  Quote,
  PawPrint,
  ChevronDown, // Добавено, за да не гърми грешка за Briefcase/ChevronDown
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const AboutDetailed = () => {
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(null);

  const entryTransition = { duration: 1.6, ease: [0.16, 1, 0.3, 1] };

  const credentials = [
    {
      icon: <Dog size={22} />,

      title: "Медицинска експертиза",

      desc: "Ветеринарен лекар по education, с дълбоко разбиране за тялото, здравето и силата на природата.",
    },

    {
      icon: <Briefcase size={22} />,

      title: "Бизнес опит",

      desc: "Предприемач с реален практически опит в изграждането и развитието на устойчив бизнес.",
    },

    {
      icon: <Star size={22} />,

      title: "Личен опит с продуктите на Форевър",

      desc: "Преминала през собствена промяна със C9 – –10 кг и ново начало за здравето и енергията.",
    },

    {
      icon: <Heart size={22} />,

      title: "Моята мисия",

      desc: "Помагам на хората да открият своя път към свобода, баланс и по-смислен начин на живот.",
    },
  ];

  return (
    <div className=" min-h-screen">
      {/* 1. HERO SECTION - Minimal & Personal */}

      <section className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 text-brand-primary"
          >
            <PawPrint size={18} />

            <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-brand-dark">
              Лична история
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl text-brand-dark leading-[1.1] mb-8"
          >
            За мен <br />
            <span className="text-brand-primary italic font-light">
              и моя път
            </span>
          </motion.h1>
        </div>
      </section>

      {/* 2. STORY SECTION - Editorial Layout */}

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Images & Floating Badge */}

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white"
            >
              <img
                src="/Miglena/Miglena_aboutDetailed.webp"
                className="w-full h-full object-cover"
                alt="Миглена"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 -right-4 md:-right-8 bg-white text-brand-dark p-6 md:p-8 rounded-[2rem] shadow-2xl max-w-[220px]"
            >
              <div className="flex gap-2 mb-3 text-brand-primary">
                <Heart size={20} /> <PawPrint size={20} />
              </div>

              <p className="text-sm font-regular leading-relaxed opacity-90 italic">
                От ветеринарната медицина до уелнес лидерството.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Narrative */}

          <div className="lg:col-span-7 space-y-12 text-left">
            <div className="space-y-6 font-sans text-gray-500 text-lg font-light leading-relaxed">
              <h2 className="font-display text-4xl md:text-5xl text-brand-dark tracking-tight">
                Здравей, казвам се{" "}
                <span className="text-brand-primary italic font-light">
                  Миглена!
                </span>
              </h2>

              <p>
                По професия съм{" "}
                <strong className="text-brand-dark">ветеринарен лекар</strong>.
                Имам две прекрасни дъщери и съпруг, който ме подкрепя в
                начинанията ми. Винаги съм обичала животните, така научих и
                дъщерите си и поради тази причина вкъщи живеем с няколко
                наемателя, които често забравят за своите задължения - котарака
                Кирчо, морското свинче Дарвин и един африкански охлюв, който все
                още не си е избрал име...
              </p>

              <p>
                Въпреки това от над 10 години не практикувам професията си, тъй
                като професионалният ми път ме отведе в друга посока – към
                собствен бизнес. Който фалира... Започнах да си търся работа,
                както повечето хора през периода на Covid-кризата. Отне ми
                време, но чакането си заслужаваше...{" "}
              </p>

              {/* SCROLL DOWN ИНДИКАТОР - ВГРАДЕН ПОД ЦИТАТА */}

              <div className="flex flex-col items-center justify-center py-10 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-primary font-bold opacity-60">
                  Продължи нататък
                </span>

                <motion.a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();

                    document
                      .querySelector("#about")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* Анимирани стрелки */}

                  <div className="flex flex-col items-center -space-y-2">
                    <motion.div
                      animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ChevronDown
                        size={24}
                        className="text-brand-primary"
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                    >
                      <ChevronDown
                        size={24}
                        className="text-brand-primary"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION SECTION */}

      <section
        id="about"
        className="relative py-12 md:py-20 bg-white overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-12 md:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={entryTransition}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h1 className="font-display text-4xl md:text-6xl text-brand-dark leading-tight tracking-tighter">
              Моят път към <br />
              <span className="text-brand-primary italic font-light relative">
                баланса и енергията
              </span>
            </h1>
          </motion.div>

          {/* Highlighted Quote */}

          <div className="border-y border-brand-light relative">
            <Quote
              className="absolute top-4 left-0 text-brand-primary opacity-20"
              size={40}
            />

            <h3 className="font-display text-2xl md:text-3xl text-brand-primary italic pl-10 leading-relaxed">
              "Винаги съм вярвала, че няма нищо случайно на този свят и моята
              среща с <strong>Форевър Ливинг</strong> не беше изключение..."
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...entryTransition, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <p className="font-sans text-xl text-gray-500 leading-relaxed max-w-4xl mx-auto font-light">
              Днес имам честта да работя с прекрасен екип и вдъхновяващи
              ментори, които ме подкрепят и насърчават във всичките ми
              начинания. Успях не само да открия своето призвание, но и да
              помогна на много други хора като мен!
            </p>

            <p className="font-sans text-xl text-gray-500 leading-relaxed max-w-4xl mx-auto font-light">
              Вярвам, че всяка жена заслужава да се чувства значима, финансово
              независима и изпълнена с енергия. Ако и ти усещаш, че е време да
              спреш да отлагаш мечтите си и търсиш среда, която да те дърпа
              нагоре, аз съм тук, за да ти подам ръка. Нека извървим този път
              заедно.
            </p>

            <div className="flex justify-center pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Link
                  to="/join"
                  className="btn-primary group w-full sm:w-auto text-center justify-center flex items-center px-10 py-5"
                >
                  Ела в моя екип!{" "}
                  <ArrowRight
                    size={18}
                    strokeWidth={1.2}
                    className="ml-2 group-hover:translate-x-2 transition-transform"
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. TRANSFORMATION SECTION */}

      <section className="py-24 px-6 bg-brand-dark relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left space-y-8">
            <h2 className="font-display text-4xl md:text-6xl text-white">
              Промяната, която <br />
              <span className="text-brand-primary italic">преживях лично</span>
            </h2>

            <p className="text-white/60 text-xl font-light max-w-lg">
              Когато ме питат кой е любимият ми продукт, отговарям без
              колебание:{" "}
              <Link
                to="https://foreverliving.com/shop/bgr/bg-BG/products/475-C9-GEL-VANILLA?fboId=359100008314&purchaseFlowType=PERSONAL&languageCode=bg-BG&memberTitleId=8&storeId=74&countryCode=bgr&isBots=true&discountConfigType=11&uniqueExtRefID=4729ffc1-e225-4e04-a56e-f54ecf9e1dac&shortenUrl=thealoeveraco.shop/CZNu1yA4&referralUuid=b77a9075-fbc8-4d85-a029-37ea2d45b79b"
                className="inline-flex items-center gap-1.5 text-white font-semibold group border-b border-brand-light hover:text-brand-primary hover:border-brand-primary transition-all duration-300"
              >
                Програмата C9!
                <ArrowRight
                  size={18}
                  strokeWidth={1.2}
                  className="ml-2 group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </p>

            <div className="space-y-4 text-white">
              {[
                { label: "Общо 10 кг по-малко", icon: <Sparkles size={16} /> },

                {
                  label: "Регулирано кръвно налягане",
                  icon: <Heart size={16} />,
                },

                {
                  label: "Край на безсънието и главоболието",
                  icon: <Star size={16} />,
                },

                {
                  label: "Невероятен прилив на енергия",
                  icon: <Zap size={16} />,
                },
              ].map((point, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="flex items-center gap-4 text-white/90 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                    {point.icon}
                  </div>

                  <span className="text-lg font-light">{point.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="p-10 md:p-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] text-center space-y-8">
              <Leaf size={48} className="mx-auto text-brand-primary" />

              <h3 className="font-display text-2xl md:text-3xl text-white italic font-light">
                "Влюбих се в продуктите и в свободата, която ми дават."
              </h3>

              <button
                onClick={() => navigate("/join")}
                className="btn-primary mx-auto flex items-center"
              >
                Разгледай продуктите!
                <ArrowRight
                  size={18}
                  strokeWidth={1.2}
                  className="ml-2 group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[200] bg-brand-dark/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
          >
            <img
              src={selectedImg.src}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-white/10"
              alt=""
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Помощни икони

const Zap = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default AboutDetailed;
