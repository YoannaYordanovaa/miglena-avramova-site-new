import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamGallery from "../components/TeamGallery";
import VideoSection from "../components/VideoSection";
import { Link } from "react-router-dom";
import JoinContactForm from "../components/JoinContactForm";
import {
  Users,
  TrendingUp,
  CheckCircle2,
  MessageSquare,
  Award,
  Mail,
  SendHorizonal,
  ChevronRight,
  Sparkles,
  Briefcase,
  ArrowRight,
  GraduationCap,
  Target,
  Microscope,
  BookOpenCheck,
  ShieldCheck,
  Heart,
  Quote,
  Sprout,
} from "lucide-react";

const JoinTeam = () => {
  const [status, setStatus] = useState("");
  const entryTransition = { duration: 1.6, ease: [0.16, 1, 0.3, 1] };
  const [privacyError, setPrivacyError] = useState(false);
  const [errors, setErrors] = useState({});
  const floatingTransition = {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  };
  const benefits = [
    {
      icon: <TrendingUp className="text-brand-primary" />,
      title: "Финансова свобода",
      text: "Изгради собствен бизнес с доказан модел и неограничен потенциал за доходи.",
    },
    {
      icon: <Users className="text-brand-primary" />,
      title: "Подкрепяща общност",
      text: "Ставаш част от екип, в който взаимната помощ и споделянето на опит са приоритет.",
    },
    {
      icon: <Target className="text-brand-primary" />,
      title: "Личностно развитие",
      text: "Безплатни обучения за лидерство, маркетинг и психологическа устойчивост.",
    },
    {
      icon: <Award className="text-brand-primary" />,
      title: "Признание",
      text: "Бонуси, международни пътувания и събития за най-активните партньори.",
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
    }
  };

  const [factIndex, setFactIndex] = useState(0);
  const factScrollRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  return (
    <div className=" overflow-hidden">
      {/* 1. Hero Section */}
      <section className="section-container ">
        <div className="stack-space">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* ТЕКСТОВА ЧАСТ - Първа на мобилни, Лява на десктоп */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center gap-2 backdrop-blur-md bg-white/90 border border-brand-primary/10
             px-4 py-3 rounded-2xl shadow-xl will-change-transform"
              >
                <Sparkles size={16} className="text-brand-primary shrink-0" />
                <span className="text-[10px] lg:text-[11px] uppercase tracking-widest text-brand-dark ">
                  Личен ментор
                </span>
              </motion.div>

              <h1 className="text-brand-dark tracking-tight font-display text-4xl sm:text-5xl md:text-7xl leading-[1.1]">
                Твоят път към
                <br />
                <span className="text-brand-primary italic font-light relative inline-block">
                  успеха
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1.2 }}
                    className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-brand-primary/30"
                    viewBox="0 0 300 12"
                  >
                    <path
                      d="M1 10C50 3 150 3 299 10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
                <br className="hidden md:block" /> започва тук!
              </h1>

              <p className="font-sans font-light max-w-xl mx-auto lg:mx-0 leading-relaxed border-l-0 lg:border-l-2 border-brand-primary/20 lg:pl-6">
                Изгради кариера, която не те затваря в офис, а ти дава енергията
                и времето да живееш живота, който искаш!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
                <a href="#join-form" className="btn-primary ">
                  Кандидатствай сега
                </a>
                <a href="#video" className="btn-outline ">
                  Научи повече
                  <ArrowRight
                    size={18}
                    strokeWidth={1.2}
                    className="group-hover:translate-x-2 transition-transform shrink-0"
                  />
                </a>
              </div>
            </motion.div>

            {/* СНИМКА - Втора на мобилни (под заглавието), Дясна на десктоп */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[600px]">
                <div className="aspect-square rounded-full overflow-hidden border-4 md:border-8 border-white shadow-2xl bg-brand-light">
                  <img
                    src="/Miglena/Miglena_Join.webp"
                    alt="Миглена Аврамова"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Декоративен фон */}
                <div className="absolute inset-0 bg-brand-primary/10 rounded-full blur-2xl -z-10 scale-110" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Video & Experience Section */}
      <VideoSection />

      {/* 2. Benefits Grid */}
      <section className="section-container ">
        <div className="stack-space">
          <div className="mb-12 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h1 className="font-display font-medium text-brand-dark case leading-none mb-4">
                Защо да избереш <br />
                <span className="text-brand-primary font-light italic">
                  моя екип?
                </span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-primary" />
                <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                  Един проект, една визия, едно семейство
                </p>
              </div>
            </motion.div>
          </div>

          {/* КОНТЕЙНЕР С ХОРИЗОНТАЛЕН СКРОЛ ЗА ТЕЛЕФОН */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="
        flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 pb-4 gap-6
        md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-x-visible md:pb-0 md:mx-0 md:px-0 md:gap-8
      "
          >
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="
            min-w-[85vw] md:min-w-0 snap-center
            p-8 rounded-[2.5rem] border bg-brand-cream border-brand-light/50 soft-shadow transition-all flex flex-col
          "
              >
                <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center mb-8 shadow-sm mx-auto shrink-0">
                  {b.icon}
                </div>
                <h3 className="font-display font-medium text-brand-dark text-2xl mb-3 text-center">
                  {b.title}
                </h3>
                <p className="font-sans leading-relaxed font-light opacity-90 text-gray-500 text-center">
                  {b.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* PAGINATION DOTS */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {benefits.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  activeIndex === i
                    ? "w-8 bg-brand-primary"
                    : "w-2 bg-brand-primary/20"
                }`}
              />
            ))}
          </div>

          {/* БУТОНИ */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 md:mt-16">
            <a href="https://thealoeveraco.shop/5R3LN273" className="btn-primary" target="_blank">
              <span>Собственик на Форевър бизнес</span>
              <ArrowRight
                size={18}
                strokeWidth={1.2}
                className="group-hover:translate-x-2 transition-transform shrink-0"
              />
            </a>
            <a href="https://thealoeveraco.shop/5R3LN273" className="btn-outline " target="_blank">
              <span>Преференциален клиент</span>
              <ArrowRight
                size={18}
                strokeWidth={1.2}
                className="group-hover:translate-x-2 transition-transform shrink-0"
              />
            </a>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center w-full opacity-100">
        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-brand-primary" />
        <div className="mx-4 rotate-45 border border-brand-primary w-2 h-2" />
        <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-brand-primary" />
      </div>

      {/* 4. Team Gallery */}
      <TeamGallery />

      {/* 4. Форевър Ливинг - Разширена Секция */}
      <section
        id="forever-section"
        className="section-container bg-brand-light"
      >
        <div className="stack-space">
          {/* 1. ЗАГЛАВНА ЧАСТ */}
          <div className="mb-12 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h1 className="font-display font-medium text-brand-dark case leading-none mb-4">
                Кои са <br />
                <span className="text-brand-primary font-light italic">
                  Форевър Ливинг?
                </span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-primary" />
                <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                  Световният лидер в производството на продукти от Алое Вера!
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mx-auto z-10">
            {/* 2. ГОРЕН ГРИД: СТАТИСТИКИ И ИНФО */}
            <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start mb-10 ">
              {/* Лява страна: Визуални Статистики */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-brand-primary p-10 md:p-12 rounded-[2.5rem] text-white shadow-2xl shadow-brand-primary/20"
                  >
                    <h4 className="font-display text-6xl md:text-7xl font-medium mb-3 italic tracking-tighter text-white">
                      45+
                    </h4>
                    <div className="space-y-1">
                      <p className="font-sans text-[12px] uppercase tracking-[0.2em] font-bold opacity-90">
                        Години Лидерство
                      </p>
                      <p className="font-sans text-sm opacity-75 font-light leading-relaxed">
                        Стабилност от 1978 г. без промяна в мисията.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-brand-dark p-10 md:p-12 rounded-[2.5rem] text-white shadow-xl"
                  >
                    <h4 className="font-display text-6xl md:text-7xl font-medium mb-3 italic tracking-tighter text-white">
                      160+
                    </h4>
                    <div className="space-y-1">
                      <p className="font-sans text-[12px] uppercase tracking-[0.2em] font-bold opacity-90">
                        Държави
                      </p>
                      <p className="font-sans text-sm opacity-75 font-light leading-relaxed">
                        Глобално присъствие и логистична мрежа.
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="md:pt-20 space-y-6">
                  <div className="bg-brand-light rounded-[2.5rem] shadow-sm flex flex-col items-start justify-center p-8 md:p-10 border border-brand-light min-h-[260px] md:min-h-[280px] relative overflow-hidden group">
                    <Sparkles className="absolute -right-4 -top-4 text-brand-primary/10 w-32 h-32 group-hover:rotate-12 transition-transform duration-700" />
                    <Briefcase
                      className="text-brand-primary mb-6"
                      size={32}
                      strokeWidth={1.5}
                    />
                    <p className="font-display text-brand-dark text-3xl tracking-tighter leading-tight">
                      Бизнес без <br />
                      <span className="text-brand-primary italic font-light">
                        граници
                      </span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-6 font-sans uppercase tracking-widest leading-relaxed">
                      Възможност за доходи <br /> от всяка точка на света.
                    </p>
                  </div>

                  <div className=" border border-brand-primary/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center">
                    <TrendingUp className="text-brand-primary mb-2" size={20} />
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-dark font-bold leading-relaxed">
                      Вертикално Интегрирани
                    </p>
                  </div>
                </div>
              </div>

              {/* Дясна страна: Подробна Информация */}
              <div className="lg:col-span-5 space-y-10 py-4">
                <div className="space-y-6">
                  <h2 className="font-display text-4xl md:text-5xl ">
                    Стабилност, която <br />
                    <span className="text-brand-primary italic font-light font-display">
                      променя животи
                    </span>
                  </h2>
                </div>

                <div className="space-y-8 font-sans text-gray-500 text-lg leading-relaxed font-light">
                  <p>
                    <a
                      href="https://foreverliving.com/bgr/bg-bg/about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary font-bold hover:text-brand-dark underline transition-colors"
                    >
                      Форевър Ливинг
                    </a>{" "}
                    е най-големият производител и дистрибутор на продукти от
                    Алое Вера в света. Компанията притежава над 50 милиона
                    растения в собствените си плантации в Доминиканската
                    република и Тексас.
                  </p>
                  <div className="p-8 /40 rounded-3xl border-l-4 border-brand-primary italic text-brand-dark/80 text-base shadow-sm leading-relaxed">
                    „Ние контролираме целия процес – от засаждането на
                    растението до доставката до вашия дом. Това гарантира
                    чистота без компромиси.“
                  </div>
                </div>
              </div>
            </div>
            {/* Малки карти (3 броя в колона) */}
            <div className="flex flex-col space-y-6 w-full relative z-10 px-2 md:grid md:grid-cols-3 md:space-y-0 md:gap-12">
              {[
                {
                  title: "Пълна Прозрачност",
                  desc: "Собствени плантации, заводи и логистика – без външни доставчици.",
                  icon: <BookOpenCheck size={24} />,
                },
                {
                  title: "Наука и Патенти",
                  desc: "Уникален процес на студена стабилизация, запазващ 100% от нутриентите.",
                  icon: <Microscope size={24} />,
                },
                {
                  title: "Етичен Избор",
                  desc: "Сертификати IASC, Halal, Kosher и без тестове върху животни.",
                  icon: <ShieldCheck size={24} />,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="group relative flex items-start gap-6"
                >
                  {/* Лява страна: Икона и Линия */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-full border border-brand-primary/20 flex items-center justify-center text-brand-primary bg-white shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    {/* Вертикална линия, която свързва елементите на мобилни */}
                    <div className="w-[1px] h-full bg-gradient-to-b from-brand-primary/20 to-transparent mt-4 md:hidden"></div>
                  </div>

                  {/* Дясна страна: Текст */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-2xl text-brand-dark tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-sans text-gray-500 leading-relaxed font-light text-[15px] md:text-base">
                      {item.desc}
                    </p>

                    {/* Долен кант за мобилни */}
                    <div className="w-full h-[1px] bg-brand-light mt-8 md:hidden"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 1. ЗАГЛАВНА ЧАСТ */}
            <div className=" text-center mt-4 mb-4 md:mt-20 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                {/* ВЪВЕДЖАЩО ИЗРЕЧЕНИЕ */}

                <div className="border-y border-brand-light relative">
                  <Quote
                    className="absolute top-4 left-0 text-brand-primary opacity-20"
                    size={40}
                  />

                  <h3 className="font-display text-xl md:text-3xl text-brand-primary italic pl-10 leading-relaxed">
                    "Партньорството с Форевър ви дава не само финансова свобода,
                    но и спокойствието на една етична и дългосрочна основа."
                  </h3>
                </div>
              </motion.div>
            </div>

            {/* 3. ДОЛЕН ПАНЕЛ: ФАКТИ */}
            <div className="relative">
              <div
                ref={factScrollRef}
                onScroll={() => {
                  if (factScrollRef.current) {
                    const { scrollLeft, offsetWidth } = factScrollRef.current;
                    setFactIndex(Math.round(scrollLeft / offsetWidth));
                  }
                }}
                className="
      /* Мобилни: Хоризонтален скрол */
      flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 pb-4 gap-6
      /* Десктоп: Решетка */
      md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 md:mx-0 md:px-0 md:gap-8
    "
              >
                {[
                  {
                    label: "Сигурност",
                    title: "Частна Компания",
                    text: "Форевър е финансово независима компания без дългове. Това позволява на борда да взема решения в интерес на партньорите.",
                    icon: <Target size={24} />,
                  },
                  {
                    label: "Завещание",
                    title: "Наследяем Бизнес",
                    text: "Изградената от Вас мрежа и доходи могат да бъдат прехвърлени на Вашите наследници – сигурност за Вашето семейство.",
                    icon: <Award size={24} />,
                  },
                  {
                    label: "Екология",
                    title: "Еко Отпечатък",
                    text: "Плантациите на Форевър пречистват земната атмосфера от над 2 милиона тона CO2 ежегодно. Помагате активно на планетата.",
                    icon: <Sprout size={24} />,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -8 }}
                    className="
          /* Важно за мобилния изглед: */
          min-w-[85vw] md:min-w-0 snap-center
          /* Стил на картата: */
          group p-8 md:p-10 rounded-[2.5rem] bg-[#fcfaf7]/80 backdrop-blur-md border border-white shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all duration-500 flex flex-col h-full text-center
        "
                  >
                    <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-brand-primary font-bold mb-6 opacity-60">
                      {item.label}
                    </span>

                    <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-primary text-white flex items-center justify-center mb-6 transition-transform duration-700 shadow-lg shadow-brand-primary/20">
                      {React.cloneElement(item.icon, {
                        className: "text-white",
                        size: 28,
                      })}
                    </div>

                    <h3 className="font-display text-2xl text-brand-dark font-medium mb-4 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="font-sans leading-relaxed font-light text-sm md:text-base">
                      {item.text}
                    </p>

                    {/* Малък визуален индикатор за мобилни */}
                    <div className="mt-auto pt-6 md:hidden">
                      <div className="w-8 h-1 bg-brand-primary/10 mx-auto rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ДИНАМИЧНИ ТОЧКИ (PAGINATION DOTS) - Mobile Only */}
              <div className="flex justify-center gap-2 mt-6 md:hidden">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      factIndex === i
                        ? "w-8 bg-brand-primary"
                        : "w-2 bg-brand-primary/20"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center mx-auto mt-10">
              <a href="#join-form" className="btn-primary ">
                Кандидатствай сега
              </a>{" "}
            </div>
          </div>
        </div>
      </section>

      <JoinContactForm />
    </div>
  );
};

export default JoinTeam;
