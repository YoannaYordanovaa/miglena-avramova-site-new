import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, SendHorizonal } from "lucide-react";
import { Link } from "react-router-dom";

const ContactForm = () => {
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [privacyError, setPrivacyError] = useState(false);

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
          
      <section
        id="join-form"
        className="section-container "
      >
        <div className="stack-space">
          {/* Заглавна част - центрирана на мобилни, ляво на десктоп */}

          <div className="mb-16 text-left mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h1 className="font-display font-medium text-brand-dark case leading-none mb-4">
                Свържи се <br />
                <span className="text-brand-primary font-light italic">
                  с мен!
                </span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-primary" />
                <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                  Нека обсъдим твоите цели и как можем да ги постигнем заедно!
                </p>
              </div>
            </motion.div>
          </div>

          {/* Основна карта на формата */}
          <div className="flex flex-col lg:flex-row bg-brand-light rounded-[2rem] md:rounded-[2.5rem] soft-shadow border border-brand-light/50 overflow-hidden">
            {/* Тъмен панел (Dark Panel) */}
            <div className="lg:w-[40%] bg-brand-dark p-8 md:p-20 text-white relative text-left overflow-hidden">
              <div className="relative z-10 space-y-8 md:space-y-10">
                <div className="space-y-4">
                  <h2 className="font-display text-3xl md:text-5xl text-white font-medium tracking-tighter leading-tight">
                    Готов ли си за <br />
                    <span className="text-brand-primary italic font-light">
                      стъпка напред?
                    </span>
                  </h2>
                </div>
                <p className="font-sans font-light text-white/60 leading-relaxed text-base md:text-lg">
                  Попълни формата и ще се свържа с теб за безплатна
                  опознавателна среща!
                </p>

                {/* Контактни методи */}
                <div className="space-y-4 md:space-y-6 pt-4 border-t border-white/10 text-sm md:text-base">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-light/10 flex items-center justify-center text-brand-primary">
                      <Mail size={18} />
                    </div>
                    <span className="font-sans font-light break-all text-[14px] md:text-base">
                      miglena.avramova.as@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-light/10 flex items-center justify-center text-brand-primary">
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
            <div className="flex-1 p-6 md:p-20 text-left bg-brand-light">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6 md:space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-left">
                  {/* Поле Име */}
                  <div className="space-y-2">
                    <label
                      className={`font-sans text-xs md:text-sm font-medium text-brand-dark block ${
                        errors.name ? "text-red-500" : ""
                      }`}
                    >
                      Твоето име
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Име Фамилия"
                      className={`w-full bg-gray-100 border-2 px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl outline-none transition-all font-sans text-sm text-brand-dark ${
                        errors.name
                          ? "border-red-500/50 animate-shake"
                          : "border-transparent focus:ring-2 focus:ring-brand-primary/20"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] uppercase tracking-widest font-bold text-red-500 pl-2"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Поле Телефон */}
                  <div className="space-y-2 text-left">
                    <label
                      className={`font-sans text-xs md:text-sm font-medium text-brand-dark block ${
                        errors.phone ? "text-red-500" : ""
                      }`}
                    >
                      Телефонен номер
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+359..."
                      className={`w-full bg-gray-100 border-2 px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl outline-none transition-all font-sans text-sm text-brand-dark ${
                        errors.phone
                          ? "border-red-500/50 animate-shake"
                          : "border-transparent focus:ring-2 focus:ring-brand-primary/20"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] uppercase tracking-widest font-bold text-red-500 pl-2"
                        >
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
                    className="w-full bg-gray-100 border-none px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-sans text-sm text-brand-dark resize-none"
                  ></textarea>
                </div>

                {/* Privacy Checkbox */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-left">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      className={`w-5 h-5 rounded border-2 transition-all cursor-pointer accent-brand-primary ${
                        privacyError
                          ? "border-red-500 animate-shake"
                          : "border-brand-primary/20 bg-brand-cream"
                      }`}
                    />
                    <label
                      htmlFor="privacy"
                      className={`text-[11px] md:text-sm font-sans leading-tight cursor-pointer transition-colors ${
                        privacyError ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      Съгласен съм с{" "}
                      <Link
                        to="/privacyPolicy"
                        className="text-brand-primary font-medium underline underline-offset-4 hover:text-brand-dark"
                      >
                        Политиката за поверителност
                      </Link>
                    </label>
                  </div>
                  <AnimatePresence>
                    {privacyError && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-[10px] uppercase tracking-widest font-bold text-red-500 pl-8"
                      >
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
                    {status === "sending"
                      ? "Изпращане..."
                      : "Изпрати запитване"}
                    <SendHorizonal size={16} />
                  </button>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {status === "success" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-brand-primary font-sans text-sm font-medium"
                      >
                        Успешно изпратено!
                      </motion.p>
                    )}
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-red-500 font-sans text-sm font-medium"
                      >
                        Грешка при изпращането.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> 
      );
};

export default ContactForm;