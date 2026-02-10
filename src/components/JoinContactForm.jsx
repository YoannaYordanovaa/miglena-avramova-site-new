import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, SendHorizonal } from "lucide-react";
import { Link } from "react-router-dom";

const ContactForm = () => {
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [privacyError, setPrivacyError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    honeypot: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const phoneRegex = /^\+?[0-9\s]{7,15}$/;

    // Валидация на име
    if (!formData.name.trim()) {
      newErrors.name = "Моля, въведете име";
    }

    // Валидация на телефон
    if (!formData.phone.trim()) {
      newErrors.phone = "Моля, въведете телефон";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Невалиден формат (напр. +359 88...)";
    }

    // Валидация на съгласие
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

    try {
      const response = await fetch("http://localhost:3010/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", message: "", honeypot: "" });
        e.target.reset();
      } else {
        console.error(result.message);
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="join-form" className="section-container">
      <div className="stack-space">
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

        <div className="flex flex-col lg:flex-row bg-brand-light rounded-[2rem] md:rounded-[2.5rem] soft-shadow border border-brand-light/50 overflow-hidden">
          {/* Тъмен панел */}
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
                Попълни формата и ще се свържа с теб за безплатна опознавателна
                среща!
              </p>

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
            <div className="absolute -bottom-10 -left-10 w-40 h-40 md:w-80 md:h-80 bg-brand-primary/10 rounded-full blur-[60px] md:blur-[100px] opacity-50" />
          </div>

          {/* Форма */}
          <div className="flex-1 p-6 md:p-20 text-left bg-brand-light">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 md:space-y-8"
            >
              {/* 3. HONEYPOT */}
              <div style={{ display: "none" }} aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label
                    className={`font-sans text-xs md:text-sm font-medium text-brand-dark block ${errors.name ? "text-red-500" : ""}`}
                  >
                    Твоето име
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Име Фамилия"
                    className={`w-full bg-gray-100 border-2 px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl outline-none transition-all font-sans text-sm text-brand-dark ${errors.name ? "border-red-500/50" : "border-transparent focus:ring-2 focus:ring-brand-primary/20"}`}
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

                <div className="space-y-2">
                  <label
                    className={`font-sans text-xs md:text-sm font-medium text-brand-dark block ${errors.phone ? "text-red-500" : ""}`}
                  >
                    Телефонен номер
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+359..."
                    className={`w-full bg-gray-100 border-2 px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl outline-none transition-all font-sans text-sm text-brand-dark ${errors.phone ? "border-red-500/50" : "border-transparent focus:ring-2 focus:ring-brand-primary/20"}`}
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

              <div className="space-y-2">
                <label className="font-sans text-xs md:text-sm font-medium text-brand-dark block">
                  Какво те мотивира?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Разкажи ми..."
                  className="w-full bg-gray-100 border-none px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-sans text-sm text-brand-dark resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    className={`w-5 h-5 rounded border-2 transition-all cursor-pointer accent-brand-primary ${privacyError ? "border-red-500" : "border-brand-primary/20 bg-brand-cream"}`}
                  />
                  <label
                    htmlFor="privacy"
                    className={`text-[11px] md:text-sm font-sans leading-tight cursor-pointer transition-colors ${privacyError ? "text-red-500" : "text-gray-400"}`}
                  >
                    Съгласен съм с{" "}
                    <Link
                      to="/privacyPolicy"
                      className={`text-[11px] md:text-sm font-sans leading-tight cursor-pointer transition-colors ${privacyError ? "text-red-500" : "text-brand-primary underline-offset-4"}`}
                    >
                      Политиката за поверителност
                    </Link>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary"
                >
                  {status === "sending" ? "Изпращане..." : "Изпрати запитване"}
                  <SendHorizonal size={16} />
                </button>

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
                      Грешка при изпращането или твърде много опити.
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
