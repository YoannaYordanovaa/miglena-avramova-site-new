import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import AboutGallery from "../components/AboutGallery";
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Video,
  ArrowRight,
  Sparkles,
  Star,
  Quote,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null); // Дефинирано само веднъж
  const [activeIndex, setActiveIndex] = useState(0); // Дефинирано само веднъж

  const entryTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

  const testimonials = [
    {
      name: "Елена П.",
      role: "Бизнес консултант",
      image: "/images/elena.jpg",
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

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      {/* 2. HERO SECTION */}
      <section className="relative w-full overflow-hidden flex items-center pt-20 md:pt-24 lg:pt-0 lg:min-h-screen">
        <div className="flex flex-col lg:flex-row w-full items-stretch">
          <div className="relative w-full h-[50vh] lg:h-screen lg:w-1/2 lg:order-2 lg:pt-20">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="h-full w-full relative will-change-transform"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              }}
            >
              <div className="hidden lg:block absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-brand-cream to-transparent z-10" />
              <img
                src="/Miglena/Miglena_About.webp"
                className="w-full h-full object-cover object-top lg:object-center"
                alt="Миглена Аврамова"
                loading="eager"
                fetchpriority="high"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-30 shadow-xl backdrop-blur-md bg-white/90 top-6 right-6 p-4 rounded-2xl lg:top-auto lg:bottom-20 lg:left-[-30px] border border-brand-primary/10 will-change-transform"
            >
              <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3">
                <Sparkles size={16} className="text-brand-primary lg:size-4" />
                <span className="text-[9px] lg:text-[11px] font-bold uppercase tracking-widest text-brand-dark whitespace-nowrap">
                  10+ Години Опит
                </span>
              </div>
            </motion.div>
          </div>

          <div className="relative w-full lg:w-1/2 flex items-center justify-center lg:justify-end z-20">
            <div className="section-container lg:max-w-2xl lg:px-12 xl:px-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="bg-white lg:bg-transparent -mt-20 lg:mt-0 p-8 md:p-12 lg:p-0 rounded-[2.5rem] lg:rounded-none shadow-2xl lg:shadow-none mx-4 sm:mx-0 will-change-transform"
              >
                <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                  <div className="h-[1px] w-8 bg-brand-primary" />
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-primary">
                    Добре дошъл!
                  </p>
                </div>
                <h1 className="text-brand-dark font-display mb-8 text-center lg:text-left tracking-tighter">
                  Върни си <br />
                  <span className="text-brand-primary italic font-light relative">
                    енергията
                    <svg className="absolute -bottom-2 left-0 w-full h-2 text-brand-primary/20" viewBox="0 0 300 12">
                      <path d="M1 10C50 3 150 3 299 10" stroke="currentColor" strokeWidth="6" fill="none" />
                    </svg>
                  </span>
                  <br /> и баланса
                </h1>
                <div className="space-y-8 md:space-y-10">
                  <p className="font-sans font-light text-base md:text-xl leading-relaxed text-center lg:text-left lg:border-l-2 lg:border-brand-primary/20 lg:pl-6">
                    Вдъхновявам хората да излязат от рутината и да се посветят на себе си, своите хобита и близките си.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pb-2">
                    <Link to="/join" className="btn-primary w-full sm:w-auto px-10 py-5 rounded-full shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-transform">
                      Започни днес
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-brand-primary/5 rounded-full blur-[120px] -z-10" />
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="relative section-container bg-brand-light overflow-hidden">
        <div className="relative z-10 max-w-7xl">
          <div className="mb-16 text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block">
              <h1 className="font-display font-medium text-brand-dark case leading-none mb-4">
                Моята цел <br />
                <span className="text-brand-primary font-light italic">растеж и вдъхновение!</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-primary" />
                <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                  Да вървим заедно по пътя към една по-добра версия на себе си!
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...entryTransition, delay: 0.2 }} viewport={{ once: true }} className="space-y-10">
            <p className="font-sans text-left text-gray-500 leading-relaxed font-light">
             Здравей, казвам се Миглена и съм тук, за да ти разкажа... <br />{" "}
              Как всеки ден се срещам с хора, които търсят по-здравословен,
              смислен и свободен начин на живот. Хора, които искат да се
              измъкнат от рутината на работа от 9:00 до 17:00 и да се посветят
              на своите хобита, близки и личностно развитие. Те мечтаят за
              баланс, удовлетворение и възможност да изразят себе си по
              най-добрия начин.
            </p>
            <div className="flex justify-start pt-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
                <Link to="/about" className="btn-primary group w-full sm:w-auto text-center justify-center flex items-center px-10 py-5">
                  Научи повече <ArrowRight size={18} strokeWidth={1.2} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <AboutGallery />

      {/* 4. TESTIMONIALS */}
      <section className="section-container bg-brand-light relative overflow-hidden">
        <div className="relative z-10 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-6">
            <div className="text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h1 className="font-display font-medium text-brand-dark case leading-none mb-4 text-4xl md:text-6xl">
                  Хора, които <br /> <span className="text-brand-primary font-light italic">трансформираха ежедневието си</span>
                </h1>
              </motion.div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex text-brand-primary">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-gray-400">Доверие, изградено с години</p>
            </div>
          </div>

          <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 pb-4 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:pb-0 md:mx-0 md:px-0 md:gap-8">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="min-w-[85vw] md:min-w-0 snap-center p-8 rounded-[2.5rem] bg-[#fcfaf7]/50 backdrop-blur-sm border border-brand-light/50 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group will-change-transform"
              >
                <div className="space-y-6">
                  <div className="text-brand-primary/20 transition-transform group-hover:scale-110 duration-300">
                    <Quote size={40} fill="currentColor" />
                  </div>
                  <p className="font-sans italic">"{item.text}"</p>
                </div>
                <div className="mt-8 flex items-center gap-4 border-t border-brand-light/30 pt-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-primary/20 shadow-inner">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-base text-brand-dark font-medium">{item.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-brand-primary font-medium">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {testimonials.map((_, i) => (
              <div key={i} className={`h-1.5 transition-all duration-300 rounded-full ${activeIndex === i ? "w-8 bg-brand-primary" : "w-2 bg-brand-primary/20"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="section-container relative">
        <div className="relative z-10 max-w-7xl">
          <div className="mb-16 text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h1 className="font-display font-medium text-brand-dark case leading-none mb-4">
                Свържи се <br /> <span className="text-brand-primary font-light italic">с мен!</span>
              </h1>
            </motion.div>
          </div>
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            <div className="lg:col-span-5 bg-brand-dark rounded-[2.5rem] p-10 md:p-12 text-white flex flex-col justify-between overflow-hidden relative">
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-5xl font-display text-white leading-tight">
                  Направи първата крачка <br /> <span className="text-brand-primary italic">към промяната!</span>
                </h2>
                <p className="text-white/60 font-sans leading-relaxed">Ако усещаш, че е време за промяна, свържи се с мен!</p>
              </div>
              <div className="relative z-10 space-y-4 mt-12">
                <a href="tel:+359886787899" className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-brand-light/10 group-hover:bg-brand-primary transition-colors"><Phone size={20} /></div>
                  <span className="font-sans font-light break-all text-[14px] md:text-base">0886 787 899</span>
                </a>
                <a href="mailto:miglena.avramova.as@gmail.com" className="flex items-center gap-4 group break-all">
                  <div className="p-3 rounded-xl bg-brand-light/10 group-hover:bg-brand-primary transition-colors"><Mail size={20} /></div>
                  <span className="font-sans font-light break-all text-[14px] md:text-base">miglena.avramova.as@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
              {[
                { name: "Instagram", icon: <Instagram size={32} />, color: "text-brand-primary", href: "https://www.instagram.com/avramovamiglenaa/", desc: "Вдъхновение и практики" },
                { name: "Facebook", icon: <Facebook size={32} />, color: "text-brand-primary", href: "https://www.facebook.com/profile.php?id=61564479065889", desc: "Бъди част от общността" },
              ].map((social, i) => (
                <motion.a key={i} whileHover={{ scale: 1.02 }} href={social.href} target="_blank" className="bg-brand-light p-8 rounded-[2.5rem] shadow-sm border border-brand-light flex flex-col justify-between group will-change-transform">
                  <div className={social.color}>{social.icon}</div>
                  <div className="mt-12">
                    <h4 className="font-display text-2xl text-brand-dark">{social.name}</h4>
                    <p className="text-gray-400 text-sm mb-4">{social.desc}</p>
                    <ArrowRight size={18} strokeWidth={1.2} className="group-hover:translate-x-2 transition-transform text-brand-primary" />
                  </div>
                </motion.a>
              ))}
              <motion.a whileHover={{ scale: 1.02 }} href="https://www.tiktok.com/@avramovamiglenaa" target="_blank" className="md:col-span-2 bg-brand-light p-8 rounded-[2.5rem] shadow-sm border border-brand-light flex items-center justify-between group will-change-transform">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-brand-dark text-white rounded-2xl"><Video size={24} /></div>
                  <div className="text-left">
                    <h4 className="font-display text-2xl text-brand-dark">TikTok</h4>
                    <p className="text-gray-400 text-sm">Бързи съвети за уелнес</p>
                  </div>
                </div>
                <ArrowRight className="group-hover:translate-x-2 transition-transform text-brand-primary" size={28} />
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;