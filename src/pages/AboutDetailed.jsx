import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutGallery from "../components/AboutGallery";
import { HashLink } from "react-router-hash-link";
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
  ChevronDown,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const AboutDetailed = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);

  const entryTransition = { duration: 1.6, ease: [0.16, 1, 0.3, 1] };
  const floatingTransition = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  };

  const standardTransition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] };
  const fadeUpVariant = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* 1. STORY SECTION */}
      <section className="relative w-full flex flex-col lg:flex-row items-stretch overflow-hidden max-w-[1924px] mx-auto pt-20 md:pt-20">
        {/* ЛЯВА ЧАСТ */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center lg:h-[700px] xl:h-[800px] min-h-[450px] md:min-h-[600px] overflow-hidden">
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-full lg:max-w-[1920px] mx-auto overflow-hidden"
          >
            <img
              src="/Miglena/Miglena_aboutDetailed2.jpg"
              className="w-full h-full object-cover object-center"
              alt="Миглена"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 lg:hidden" />
          </motion.div>
        </div>

        {/* ДЯСНА ЧАСТ*/}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative">
          <span className="absolute top-10 right-10 text-[12rem] md:text-[18rem] font-display font-bold text-brand-light/15 leading-none select-none pointer-events-none">
            M
          </span>

          <div className="max-w-xl relative z-10 space-y-10 md:space-y-14">
            {/* Заглавие */}
            <div className=" text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <h1 className="font-display font-medium text-brand-dark case leading-none mb-4">
                  Здравей, аз съм <br />
                  <span className="text-brand-primary font-light italic">
                    Миглена!
                  </span>
                </h1>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-brand-primary" />
                  <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                    Моята лична история
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Съдържание */}
            <div className="space-y-8 font-sans text-gray-600 text-base md:text-lg font-light leading-relaxed">
              <div className="relative pl-6 md:pl-8 border-l-2 border-brand-primary/10">
                <p>
                  По професия съм{" "}
                  <strong className="text-brand-dark">ветеринарен лекар</strong>
                  . Имам две прекрасни дъщери и съпруг, който ме подкрепя в
                  начинанията ми. Винаги съм обичала животните, така научих и
                  дъщерите си и поради тази причина вкъщи живеем с няколко
                  наемателя, които често забравят за своите задължения -
                  котарака Кирчо, морското свинче Дарвин и един африкански
                  охлюв.
                </p>
              </div>

              {/* Бутон за скрол надолу */}
              <div className="pt-6 flex mx-auto justify-center">
                <button
                  onClick={() =>
                    document
                      .querySelector("#about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group relative flex flex-col items-center gap-3 transition-all"
                  aria-label="Скрол надолу към трансформацията"
                >
                  <span className="text-[9px] uppercase tracking-[0.3em] text-brand-dark/40 font-bold group-hover:text-brand-primary transition-colors">
                    Виж повече
                  </span>

                  <div className="w-16 h-16 md:w-16 md:h-16">
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex flex-col items-center -space-y-4 text-brand-primary group-hover:text-white transition-colors"
                    >
                      <ChevronDown size={28} strokeWidth={1.2} />
                      <ChevronDown
                        size={28}
                        strokeWidth={1.2}
                        className="opacity-40"
                      />
                    </motion.div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="bg-brand-light section-container overflow-hidden"
      >
        <div className="stack-space">
          {/* ЕТАП 1: ЗАГЛАВИЕ И ПЪРВОНАЧАЛЕН КОНТАКТ */}
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={standardTransition}
              >
                <h1 className="font-display font-medium text-brand-dark case leading-none mb-4">
                  Не е късно <br />
                  <span className="text-brand-primary font-light italic">
                    да започнеш отново...
                  </span>
                </h1>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-brand-primary" />
                  <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                    Всяка трудност е просто подготовка за нещо по-добро.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ЕТАП 2: ЛИЧНАТА ИСТОРИЯ */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Лява част */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Quote
                  className="text-brand-primary/10 absolute -top-10 -left-6"
                  size={100}
                />
                <p className="font-sans">
                  От над 10 години не практикувам професията си, тъй като
                  професионалният ми път ме отведе в друга посока – към собствен
                  бизнес, който фалира...
                  <br />
                  <br />
                  Започнах да си търся работа, както повечето хора през периода
                  на Covid-кризата. Отне ми време, но чакането си заслужаваше...
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-brand-primary/5 p-8 rounded-tr-[3rem] rounded-bl-[3rem] border-l-4 border-brand-primary"
              >
                <p className="font-sans leading-relaxed text-brand-dark/80 italic ">
                  Когато бях малка и ме питаха каква искам да стана като
                  порасна, не знаех и винаги се чудех как така другите деца са
                  толкова наясно. Мъжът ми казва, че просто тогава не съм знаела
                  за мрежовия маркетинг, иначе съм щяла да взема решение на
                  момента.
                </p>
              </motion.div>
            </div>

            {/* Дясна част */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="font-sans">
                  Години наред търсех призванието си, нещото, в което ще успея.
                  При всеки провал благодарях за знанията и опита, които съм
                  получила и вярвах, че един ден ще мога да приложа всичко
                  научено, че ще открия най-подходящата за мен работа. И така
                  една случайна (или не дотолкова случайна) среща отвори нова
                  врата пред мен...
                </p>

                <div className="border-y border-brand-light relative pb-6">
                  <Quote
                    className="absolute top-4 left-0 text-brand-primary opacity-20"
                    size={40}
                  />

                  <h3 className="font-display text-xl md:text-3xl text-brand-primary italic pl-10 leading-relaxed">
                    "Винаги съм вярвала, че няма нищо случайно на този свят и
                    моята среща с Форевър Ливинг не беше изключение..."
                  </h3>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-brand-primary/5"
              >
                <div className="flex-1">
                  <p className="font-sans leading-relaxed text-gray-600">
                    Днес имам честта да работя с прекрасен екип и вдъхновяващи
                    ментори, които ме подкрепят и насърчават във всичките ми
                    начинания. Успях не само да открия своето призвание, но и да
                    помогна на много други хора като мен!
                  </p>
                </div>
                <div className="shrink-0 w-px h-20 bg-brand-primary/20 hidden md:block" />
                <HashLink
                  smooth
                  to="/join#forever-section"
                  className="text-brand-primary font-display text-xl font-bold hover:text-brand-dark transition-colors text-center md:text-left"
                >
                  Кои са <br /> Форевър Ливинг?
                </HashLink>
              </motion.div>
            </div>
          </div>
          {/* ЕТАП 3: ФИНАЛНО ПОСЛАНИЕ */}
          <div className="relative">
            <motion.div
              variants={fadeUpVariant}
              initial="initial"
              whileInView="whileInView"
              viewport={fadeUpVariant.viewport}
              transition={standardTransition}
              className="max-w-5xl mx-auto text-center"
            >
              <div className="flex items-center justify-center w-full opacity-100 my-15 md:my-20">
                <div className="h-px grow bg-gradient-to-r from-transparent to-brand-primary" />
                <div className="mx-4 rotate-45 border border-brand-primary w-2 h-2" />
                <div className="h-px flex-grow bg-gradient-to-l from-transparent to-brand-primary" />
              </div>

              <h2 className="font-display text-4xl md:text-5xl mb-10">
                Вярвам, че всяка жена заслужава да се чувства финансово{" "}
                <span className="text-brand-primary italic font-light">
                  независима
                </span>{" "}
                и изпълнена с
                <span className="relative inline-block ml-3">
                  енергия
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-brand-primary/20"
                    viewBox="0 0 100 10"
                  >
                    <path
                      d="M0 5 Q 25 0, 50 5 T 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </h2>

              <div className="max-w-2xl mx-auto space-y-10">
                <p className="font-sans ">
                  Ако и ти усещаш, че е време да спреш да отлагаш мечтите си и
                  търсиш среда, която да те дърпа нагоре, аз съм тук, за да ти
                  подам ръка.
                  <span className="text-brand-dark font-medium">
                    {" "}
                    Нека извървим този път заедно!
                  </span>
                </p>

                <div className="flex justify-center">
                  <Link to="/join" className="btn-primary ">
                    <span className="relative z-10 flex items-center gap-3">
                      Започни своята промяна
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-2 transition-transform"
                      />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. TRANSFORMATION SECTION */}
      <section className="section-container">
        <div className="stack-space ">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left space-y-8">
              <div className="mb-12 text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  <h1 className="font-display font-medium text-brand-dark case leading-none mb-4">
                    Промяната, която <br />
                    <span className="text-brand-primary font-light italic">
                      преживях лично
                    </span>
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-[1px] bg-brand-primary" />
                    <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                      Резултатите, които върнаха баланса в тялото ми.
                    </p>
                  </div>
                </motion.div>
              </div>

              <p className="font-light">
                Когато ме питат кой е любимият ми продукт, отговарям без
                колебание:{" "}
                <Link
                  to="https://foreverliving.com/shop/bgr/bg-BG/products/475-C9-GEL-VANILLA?fboId=359100008314"
                  target="_blank"
                  className="inline-flex items-center gap-1 font-semibold group border-b border-brand-dark hover:text-brand-primary hover:border-brand-primary transition-all duration-300"
                >
                  Програмата C9!
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-2 transition-transform"
                  />
                </Link>
              </p>

              <div className="space-y-4">
                {[
                  {
                    label: "Общо 10 кг по-малко",
                    icon: <Sparkles size={16} />,
                  },
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
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="
        flex items-center gap-4 
        bg-white p-3 rounded-2xl 
        border border-brand-light/50 
        shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] 
        hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] 
        transition-all duration-300
        group relative overflow-hidden
      "
                  >
                    <div
                      className="
        w-10 h-10 rounded-xl 
        bg-brand-light flex items-center justify-center 
        text-brand-primary 
        group-hover:bg-brand-primary group-hover:text-white 
        transition-all duration-500 shadow-inner
      "
                    >
                      {point.icon}
                    </div>

                    <p className="text-brand-dark font-normal text-sm md:text-base tracking-tight">
                      {point.label}
                    </p>

                    <div className="absolute right-4 opacity-0 group-hover:opacity-10 transition-opacity">
                      {point.icon}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="p-10 md:p-16 bg-brand-light border border-white/10 rounded-[3rem] text-center space-y-8">
                <Leaf size={48} className="mx-auto text-brand-primary" />
                <h3 className="font-display text-2xl md:text-3xl italic font-light">
                  "Влюбих се в продуктите и в свободата, която ми дават."
                </h3>
                <button
                  onClick={() => navigate("/join")}
                  className="btn-primary "
                >
                  Разгледай продуктите!
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-2 transition-transform"
                  />
                </button>
              </div>
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
