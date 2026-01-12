import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamGallery from "../components/TeamGallery";
import VideoSection from "../components/VideoSection";
import { Link } from "react-router-dom";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Валидация на полетата
    if (!e.target.name.value.trim()) newErrors.name = "Моля, въведете име";
    if (!e.target.phone.value.trim())
      newErrors.phone = "Моля, въведете телефон";
    if (!e.target.privacy.checked) setPrivacyError(true);

    if (Object.keys(newErrors).length > 0 || !e.target.privacy.checked) {
      setErrors(newErrors);
      setTimeout(() => {
        setErrors({});
        setPrivacyError(false);
      }, 3000);
      return;
    }
    setStatus("sending");

    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("http://localhost:3010/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="  overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative section-container mt-4 overflow-hidden text-left">
        <div className="mx-autorelative z-10">
          {/* ПРОМЯНА: Използваме cols вместо rows */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* ЛЯВА ЧАСТ - ТЕКСТ (Заема 7 от 12 колони) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8" // добавихме col-span и space-y
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-brand-primary/20 shadow-sm"
              >
                <Sparkles size={14} className="text-brand-primary" />
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-brand-dark font-semibold">
                  Личен ментор
                </span>
              </motion.div>

              <h1 className="text-brand-dark tracking-tight font-display text-5xl md:text-7xl leading-[1.1]">
                Твоят път към
                <br />
                <span className="text-brand-primary italic font-light relative inline-block">
                  успеха
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1.2 }}
                    className="absolute -bottom-2 left-0 w-full h-3 text-brand-primary/30"
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
                <br /> започва тук!
              </h1>

              <div className="flex flex-col gap-8 items-start pt-4">
                <p className="font-sans font-light text-xl text-gray-500 max-w-xl leading-relaxed border-l-2 border-brand-primary/20 pl-6">
                  Търся амбициозни хора, които искат да променят стандарта си на
                  живот, да помагат на другите и да изградят кариера в сферата
                  на уелнес индустрията.
                </p>

                <div className="flex flex-wrap gap-4 justify-start items-center">
                  <a href="#join-form" className="btn-primary">
                    Кандидатствай сега
                  </a>
                  <a
                    href="#video"
                    className="btn-outline flex items-center gap-2 group"
                  >
                    Научи повече
                    <ArrowRight
                      size={18}
                      strokeWidth={1.2}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ДЯСНА ЧАСТ - СНИМКА (Заема 5 от 12 колони) */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group z-10 w-full max-w-[600px]"
              >
                {/* Сменихме rounded-[40rem] на по-стабилен кръг */}
                <div className="aspect-square rounded-full overflow-hidden border-4 md:border-8 border-white shadow-2xl bg-white">
                  <motion.img
                    src="/Miglena/Miglena_Join.webp"
                    alt="Миглена Аврамова"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Декоративен фон зад снимката */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-brand-primary/20 rounded-full blur-3xl -z-10 scale-110"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Team Gallery */}
      <TeamGallery />

      {/* 3. Video & Experience Section */}
      <VideoSection />

      {/* 2. Benefits Grid */}
      <section className="section-container ">
        {/* Divider Between Section 3 & 4 */}
        <div className="relative flex items-center justify-center pb-20">
          <div className="w-full max-w-5xl border-t border-brand-primary/40"></div>
          <div className="absolute  px-4">
            <Sparkles size={18} className="text-brand-primary/40" />
          </div>
        </div>
        <div className="mx-auto">
          <div className="mb-16 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h2 className="font-display font-medium text-brand-dark case tracking-tighter leading-none mb-6">
                Защо да избереш <br />
                <span className="text-brand-primary font-light italic">
                  моя екип?
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] /100 border bg-brand-cream border-brand-light/50 soft-shadow transition-all"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm mx-auto">
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
          <div className="flex flex-wrap gap-4 justify-center items-center mt-16">
            <a
              href="#join-form"
              className="btn-primary flex items-center gap-2 group"
            >
              Включи се като Собственик на Форевър бизнес
              <ArrowRight
                size={18}
                strokeWidth={1.2}
                className="group-hover:translate-x-2 transition-transform"
              />
            </a>
            <a
              href="#video"
              className="btn-outline flex items-center gap-2 group"
            >
              Включи се като префернциален клиент
              <ArrowRight
                size={18}
                strokeWidth={1.2}
                className="group-hover:translate-x-2 transition-transform"
              />
            </a>
          </div>
        </div>
      </section>

      {/* 4. Форевър Ливинг - Разширена Секция */}
      <section className="relative section-container bg-white overflow-hidden">
        {/* 1. ЗАГЛАВНА ЧАСТ */}
        <div className="mb-16 text-left  mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="font-display font-medium text-brand-dark case tracking-tighter leading-none mb-6">
              Кои са <br />
              <span className="text-brand-primary font-light italic">
                Форевър Ливинг?
              </span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brand-primary" />
              <p className="font-sans text-gray-400 text-xs case tracking-[0.3em] font-medium">
                Световният лидер в производството на продукти от Алое Вера!
              </p>
            </div>
          </motion.div>
        </div>

        {/* ДЕКОРАТИВЕН ВОДЕН ЗНАК (Скрит на мобилни за по-добър UX) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[15vw] md:text-[10vw] text-brand-primary/5 select-none pointer-events-none whitespace-nowrap">
          Forever
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* 2. ГОРЕН ГРИД: СТАТИСТИКИ И ИНФО */}
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start mb-24 ">
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
                <div className="bg-white rounded-[2.5rem] shadow-sm flex flex-col items-start justify-center p-8 md:p-10 border border-brand-light min-h-[260px] md:min-h-[280px] relative overflow-hidden group">
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
                <h2 className="font-display text-4xl md:text-5xl font-medium text-brand-dark tracking-tighter leading-tight">
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
                  е най-големият производител и дистрибутор на продукти от Алое
                  Вера в света. Компанията притежава над 50 милиона растения в
                  собствените си плантации в Доминиканската република и Тексас.
                </p>
                <div className="p-8 /40 rounded-3xl border-l-4 border-brand-primary italic text-brand-dark/80 text-base shadow-sm leading-relaxed">
                  „Ние контролираме целия процес – от засаждането на растението
                  до доставката до вашия дом. Това гарантира чистота без
                  компромиси.“
                </div>
              </div>
            </div>
          </div>
          {/* Малките карти (3 броя в колона) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 w-full relative z-10">
            {[
              {
                title: "Пълна Прозрачност",
                desc: "Собствени плантации, заводи и логистика – без външни доставчици.",
                icon: <BookOpenCheck size={20} />,
              },
              {
                title: "Наука и Патенти",
                desc: "Уникален процес на студена стабилизация, запазващ 100% от нутриентите.",
                icon: <Microscope size={20} />,
              },
              {
                title: "Етичен Избор",
                desc: "Сертификати IASC, Halal, Kosher и без тестове върху животни.",
                icon: <ShieldCheck size={20} />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-6  rounded-2xl border border-brand-light/50 shadow-sm transition-all hover:border-brand-primary/20"
              >
                <div className=" bg-brand-primary p-4 rounded-xl text-white shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display font-medium text-brand-dark text-2xl tracking-wider mb-1.5">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed font-light opacity-90 text-gray-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider Between Section 3 & 4 */}
          <div className="relative flex items-center justify-center py-4 bg-white">
            <div className="w-full max-w-5xl border-t border-brand-primary/40"></div>
            <div className="absolute bg-white px-4">
              <Sparkles size={18} className="text-brand-primary/40" />
            </div>
          </div>

          {/* 1. ЗАГЛАВНА ЧАСТ */}
          <div className=" text-center max-w-7xl mx-auto section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto" // Ограничаваме ширината на текста за по-добра четимост
            >
              <h2 className="font-display font-medium text-brand-dark tracking-tighter leading-none mb-8">
                Стабилност <br />
                <span className="text-brand-primary font-light italic">
                  отвъд финансовия успех
                </span>
              </h2>

              {/* ВЪВЕДЖАЩО ИЗРЕЧЕНИЕ */}

              <div className="border-y border-brand-light relative">
                <Quote
                  className="absolute top-4 left-0 text-brand-primary opacity-20"
                  size={40}
                />

                <h3 className="font-display text-2xl md:text-3xl text-brand-primary italic pl-10 leading-relaxed">
                  "Партньорството с Forever ви дава не само финансова свобода,
                  но и спокойствието на една етична и дългосрочна основа."
                </h3>
              </div>
            </motion.div>
          </div>

          {/* 3. ДОЛЕН ПАНЕЛ: ФАКТИ В 3 КОЛОНИ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: "Сигурност",
                title: "Частна Компания",
                text: "Forever е финансово независима компания без дългове. Това позволява на борда да взема решения в интерес на партньорите.",
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
                text: "Плантациите на Forever пречистват земната атмосфера от над 2 милиона тона CO2 ежегодно. Помагате активно на планетата.",
                icon: <Sprout size={24} />,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="group p-8 md:p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-brand-primary/20 transition-all duration-500 shadow-sm flex flex-col h-full text-left"
              >
                <span className="font-sans mx-auto text-[11px] uppercase tracking-[0.3em] text-brand-primary font-bold mb-6 opacity-60 ">
                  {item.label}
                </span>
                <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(item.icon, { className: "text-white" })}
                </div>
                <h3 className="text-center font-display text-2xl text-brand-dark font-medium mb-4">
                  {item.title}
                </h3>
                <p className="font-sans text-center text-gray-500 leading-relaxed font-light opacity-90">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    {/* 5. Contact Form Section */}
<section id="join-form" className="section-container px-4 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    {/* Заглавна част - центрирана на мобилни, ляво на десктоп */}

          <div className="mb-16 text-left  mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="font-display font-medium text-brand-dark case tracking-tighter leading-none mb-6">
              Свържи се <br />
              <span className="text-brand-primary font-light italic">
                с мен!
              </span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brand-primary" />
              <p className="font-sans text-gray-400 text-xs case tracking-[0.3em] font-medium">
                    Нека обсъдим твоите цели и как можем да ги постигнем заедно!
              </p>
            </div>
          </motion.div>
        </div>

    {/* Основна карта на формата */}
    <div className="flex flex-col lg:flex-row bg-white rounded-[2rem] md:rounded-[2.5rem] soft-shadow border border-brand-light/50 overflow-hidden">
      
      {/* Тъмен панел (Dark Panel) */}
      <div className="lg:w-[40%] bg-brand-dark p-8 md:p-20 text-white relative text-left overflow-hidden">
        <div className="relative z-10 space-y-8 md:space-y-10">
          <div className="space-y-4">
            <h2 className="font-display text-3xl md:text-5xl text-white font-medium tracking-tighter leading-tight">
              Готов ли си за <br />
              <span className="text-brand-primary italic font-light">стъпка напред?</span>
            </h2>
          </div>
          <p className="font-sans font-light text-white/60 leading-relaxed text-base md:text-lg">
            Попълни формата и ще се свържа с теб за безплатна опознавателна среща!
          </p>
          
          {/* Контактни методи */}
          <div className="space-y-4 md:space-y-6 pt-4 border-t border-white/10 text-sm md:text-base">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-brand-primary">
                <Mail size={18} />
              </div>
              <span className="font-sans font-light break-all text-[14px] md:text-base">
                miglena.avramova.as@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-brand-primary">
                <MessageSquare size={18} />
              </div>
              <span className="font-sans font-light text-[14px] break-all md:text-base">
                Viber: +359 886 787 899
              </span>
            </div>
          </div>
        </div>
        {/* Декоративен кръг - леко смален за мобилни */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 md:w-80 md:h-80 bg-brand-primary/10 rounded-full blur-[60px] md:blur-[100px] opacity-50" />
      </div>

      {/* Самата форма (Form Part) */}
      <div className="flex-1 p-6 md:p-20 text-left bg-white">
        <form onSubmit={handleSubmit} noValidate className="space-y-6 md:space-y-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-left">
            {/* Поле Име */}
            <div className="space-y-2">
              <label className={`font-sans text-xs md:text-sm font-medium text-brand-dark block ${errors.name ? "text-red-500" : ""}`}>
                Твоето име
              </label>
              <input
                name="name"
                type="text"
                placeholder="Име Фамилия"
                className={`w-full bg-brand-cream border-2 px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl outline-none transition-all font-sans text-sm text-brand-dark ${
                  errors.name ? "border-red-500/50 animate-shake" : "border-transparent focus:ring-2 focus:ring-brand-primary/20"
                }`}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] uppercase tracking-widest font-bold text-red-500 pl-2">
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Поле Телефон */}
            <div className="space-y-2 text-left">
              <label className={`font-sans text-xs md:text-sm font-medium text-brand-dark block ${errors.phone ? "text-red-500" : ""}`}>
                Телефонен номер
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="+359..."
                className={`w-full bg-brand-cream border-2 px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl outline-none transition-all font-sans text-sm text-brand-dark ${
                  errors.phone ? "border-red-500/50 animate-shake" : "border-transparent focus:ring-2 focus:ring-brand-primary/20"
                }`}
              />
              <AnimatePresence>
                {errors.phone && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] uppercase tracking-widest font-bold text-red-500 pl-2">
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="font-sans text-xs md:text-sm font-medium text-brand-dark block">
              Какво те мотивира?
            </label>
            <textarea
              name="message"
              rows="4"
              placeholder="Разкажи ми..."
              className="w-full bg-brand-cream border-none px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-sans text-sm text-brand-dark resize-none"
            ></textarea>
          </div>

          {/* Privacy Checkbox */}
          <div className="space-y-2">
            <div className="flex items-start gap-3 py-1 text-left">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                className={`mt-1 w-5 h-5 rounded border-2 transition-all cursor-pointer accent-brand-primary ${
                  privacyError ? "border-red-500 animate-shake" : "border-brand-primary/20 bg-brand-cream"
                }`}
              />
              <label htmlFor="privacy" className={`text-[11px] md:text-sm font-sans leading-tight cursor-pointer transition-colors ${privacyError ? "text-red-500" : "text-gray-400"}`}>
                Съгласен съм с{" "}
                <Link to="/privacyPolicy" className="text-brand-dark font-medium underline underline-offset-4">
                  Политиката за поверителност
                </Link>
              </label>
            </div>
            <AnimatePresence>
              {privacyError && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-[10px] uppercase tracking-widest font-bold text-red-500 pl-8">
                  Потвърдете съгласието си
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4 text-left">
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
            >
              {status === "sending" ? "Изпращане..." : "Изпрати запитване"}
              <SendHorizonal size={16} />
            </button>

            {/* Status Messages */}
            <AnimatePresence>
              {status === "success" && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="mt-4 text-brand-primary font-sans text-sm font-medium">Успешно изпратено!</motion.p>}
              {status === "error" && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="mt-4 text-red-500 font-sans text-sm font-medium">Грешка при изпращането.</motion.p>}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default JoinTeam;
