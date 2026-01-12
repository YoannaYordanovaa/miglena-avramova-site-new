import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import AboutGallery from "../components/AboutGallery";
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Video,
  ArrowRight,
  Sparkles,
  Heart,
  Star,
  Quote,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const entryTransition = { duration: 1.6, ease: [0.16, 1, 0.3, 1] };
  const floatingTransition = {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  };

  const testimonials = [
  {
    name: "Елена П.",
    role: "Бизнес консултант",
    image: "/images/elena.jpg", // Смени с твоя път
    text: "Програмата с Алое Вера ми върна фокуса и лекотата, от които имах нужда.",
  },
  {
    name: "Мария С.",
    role: "Майка и Мениджър",
    image: "/images/maria.jpg",
    text: "Миглена ме преведе през целия процес с невероятно търпение и професионализъм.",
  },
  {
    name: "Йоана К.",
    role: "Творец",
    image: "/images/yoana.jpg",
    text: "Най-накрая намерих човек, който разбира, че здравето не е само витамини.",
  },
];
  return (
    <div ref={containerRef} className="relative  overflow-x-hidden">
      {/* 2. HERO SECTION */}
      <section className="relative section-container mt-8 min-h-[100vh] md:min-h-screen flex items-center section-container z-10 overflow-hidden">
        <div className=" mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center stack-space">
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={entryTransition}
              className="lg:col-span-7 text-center md:text-left space-y-6 md:space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-light/60 backdrop-blur-md border border-brand-primary/20 shadow-sm"
              >
                <Sparkles size={14} className="text-brand-primary" />
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-brand-dark font-semibold">
                  Част от Форевър Ливинг повече от 10 години!
                </span>
              </motion.div>

              <h1 className=" text-brand-dark tracking-tight font-display">
                Върни си <br />
                <span className="text-brand-primary italic font-light relative">
                  енергията
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
                <br /> и баланса
              </h1>

              <div className="flex flex-col gap-8 items-center md:items-start pt-4">
                <p className="font-sans font-light text-xl text-gray-500 max-w-xl leading-relaxed border-l-0 md:border-l-2 border-brand-primary/20 pl-0 md:pl-6">
                  Вдъхновявам хората да излязат от рутината и да се посветят на
                  себе си, своите хобита и близките си – вървим заедно по пътя
                  на растежа и промяната.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <Link
                    to="/join"
                    className="btn-primary group w-full sm:w-auto text-center justify-center flex items-center px-10 py-5"
                  >
                    Започни днес{" "}
                    <ArrowRight
                      size={18}
                      strokeWidth={1.2}
                      className="ml-2 group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* ДЯСНА ЧАСТ: СНИМКА */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={entryTransition}
              className="lg:col-span-5 relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group z-10"
              >
                <div className="aspect-square rounded-[20rem] overflow-hidden border-4 md:border-8 border-brand-cream shadow-2xl bg-brand-light">
                  <motion.img
                    src="/Miglena/Miglena_About.webp"
                    alt="Миглена Аврамова"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={floatingTransition}
                  className="absolute -bottom-6 md:-bottom-10 -left-4 md:-left-8 bg-brand-light/95 backdrop-blur-md px-8 py-5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-brand-light/50 z-20 flex items-center gap-3"
                >
                  <Heart
                    className="text-brand-primary"
                    fill="currentColor"
                    size={16}
                  />
                  <p className="font-sans text-brand-dark text-sm md:text-base whitespace-nowrap tracking-tight">
                    Собственик на Форевър бизнес
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-brand-primary/10 rounded-full blur-3xl -z-10 scale-110"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION - EDITORIAL MINIMALIST */}
      <section
        id="about"
        className="relative section-container bg-brand-light overflow-hidden"
      >
      
        <div className=" relative z-10">
          <div className="mb-16 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h2 className="font-display font-medium text-brand-dark case leading-none mb-6">
                Моята цел <br />
                <span className="text-brand-primary font-light italic">
                  растеж и вдъхновение!
                </span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-primary" />
                <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                  Да вървим заедно по пътя към една по-добра версия на себе си!
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...entryTransition, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h4 className="font-sans text-left text-gray-500 leading-relaxed font-light">
              Здравей, казвам се Миглена и съм тук, за да ти разкажа... <br />{" "}
              Как всеки ден се срещам с хора, които търсят по-здравословен,
              смислен и свободен начин на живот. Хора, които искат да се
              измъкнат от рутината на работа от 9:00 до 17:00 и да се посветят
              на своите хобита, близки и личностно развитие. Те мечтаят за
              баланс, удовлетворение и възможност да изразят себе си по
              най-добрия начин.
            </h4>

            <div className="flex justify-start pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Link
                  to="/about"
                  className="btn-primary group w-full sm:w-auto text-center justify-center flex items-center px-10 py-5"
                >
                  Научи повече{" "}
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

      {/* 4. GALLERY SECTION */}

      <AboutGallery />

      {/* 4. TESTIMONIALS */}
      <section className="section-container bg-brand-light relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-6">
            <div className="mb-16 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <h2 className="font-display font-medium text-brand-dark case leading-none mb-6">
                  Хора, които
                  <br />
                  <span className="text-brand-primary font-light italic">
                    трансформираха ежедневието си
                  </span>
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-brand-primary" />
                  <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                    Доказателства, че промяната е възможна за всеки, който е
                    готов да опита!
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex text-brand-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-gray-400">
                Доверие, изградено с години
              </p>
            </div>
          </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
  {testimonials.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      whileHover={{ y: -5 }}
      className="p-8 rounded-[2.5rem] bg-[#fcfaf7]/50 backdrop-blur-sm border border-brand-light/50 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
    >
      <div className="space-y-6">
        {/* Икона за кавички с лек цвят */}
        <div className="text-brand-primary/20 transition-transform group-hover:scale-110 duration-300">
           <Quote size={40} fill="currentColor" />
        </div>
        
        <p className="font-sans text-gray-600 italic leading-relaxed ">
          "{item.text}"
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4 border-t border-brand-light/30 pt-6">
        {/* СНИМКАТА ТУК */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-primary/20 shadow-inner">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + item.name }} // Fallback ако снимката липсва
            />
          </div>
          {/* Декоративно малко кръгче */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-primary rounded-full border-2 border-white" />
        </div>

        <div>
          <p className=" text-base text-brand-dark">
            {item.name}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-brand-primary font-medium">
            {item.role}
          </p>
        </div>
      </div>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="section-container relative">
        <div className="relative z-10">
          <div className="mb-16 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h2 className="font-display font-medium text-brand-dark case leading-none mb-6">
                Свържи се
                <br />
                <span className="text-brand-primary font-light italic">
                  с мен!
                </span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-primary" />
                <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                  Отворена линия за твоите идеи, въпроси и мечти...
                </p>
              </div>
            </motion.div>
          </div>
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            <div className="lg:col-span-5 bg-brand-dark rounded-[2.5rem] p-10 md:p-12 text-white flex flex-col justify-between overflow-hidden relative">
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-5xl font-display text-white leading-tight">
                  Направи първата крачка <br />
                  <span className="text-brand-primary italic">
                    към промяната!
                  </span>
                </h2>
                <p className="text-white/60 font-sans leading-relaxed">
                  Ако усещаш, че е време за промяна, направи първата крачка и се
                  свържи с мен!
                </p>
              </div>

              <div className="relative z-10 space-y-4 mt-12">
                <a
                  href="tel:+359886787899"
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-brand-light/10 group-hover:bg-brand-primary transition-colors">
                    <Phone size={20} />
                  </div>
                  <span className="font-sans font-light break-all text-[14px] md:text-base">0886 787 899</span>
                </a>
                <a
                  href="mailto:miglena.avramova@mail.com"
                  className="flex items-center gap-4 group break-all"
                >
                  <div className="p-3 rounded-xl bg-brand-light/10 group-hover:bg-brand-primary transition-colors">
                    <Mail size={20} />
                  </div>
                  <span className="font-sans font-light break-all text-[14px] md:text-base">
                    miglena.avramova.as@gmail.com
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Instagram",
                  icon: <Instagram size={32} />,
                  color: "text-brand-primary",
                  href: "https://www.instagram.com/avramovamiglenaa/",
                  desc: "Вдъхновение и ежедневни практики",
                },
                {
                  name: "Facebook",
                  icon: <Facebook size={32} />,
                  color: "text-brand-primary",
                  href: "https://www.facebook.com/profile.php?id=61564479065889",
                  desc: "Бъди част от общността",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...entryTransition, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  href={social.href}
                  target="_blank"
                  className="bg-brand-light p-8 rounded-[2.5rem] shadow-sm border border-brand-light flex flex-col justify-between group"
                >
                  <div className={social.color}>{social.icon}</div>
                  <div className="mt-12">
                    <h4 className="font-display text-2xl text-brand-dark">
                      {social.name}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">{social.desc}</p>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.2}
                      className="group-hover:translate-x-2 transition-transform text-brand-primary"
                    />
                  </div>
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={entryTransition}
                whileHover={{ scale: 1.02 }}
                href="https://www.tiktok.com/@avramovamiglenaa"
                target="_blank"
                className="md:col-span-2 bg-brand-light p-8 rounded-[2.5rem] shadow-sm border border-brand-light flex items-center justify-between group"
              >
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-brand-dark text-white rounded-2xl">
                    <Video size={24} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-display text-2xl text-brand-dark">
                      TikTok
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Бързи съвети за уелнес
                    </p>
                  </div>
                </div>
                <ArrowRight
                  className="group-hover:translate-x-2 transition-transform text-brand-primary"
                  size={28}
                />
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
