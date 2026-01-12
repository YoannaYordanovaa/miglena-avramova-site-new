import React from "react";
import { motion } from "framer-motion";
import { HashLink as Link } from "react-router-hash-link";
import {
  Facebook,
  Instagram,
  Youtube,
  Video, // Използваме Video за TikTok, тъй като е стандартна икона
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const menuItems = [
    { name: "Начало", path: "/" },
    { name: "За мен", path: "/about" },
    { name: "Разгледай продукти", path: "/shop" },
    { name: "Включи се", path: "/join" },
    { name: "Галерия", path: "/joingallery" },
    { name: "Видео", path: "/joinvideo" },
  ];

  // Масив със социални мрежи
  const socialLinks = [
    {
      Icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61564479065889",
      label: "Facebook",
    },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/avramovamiglenaa/",
      label: "Instagram",
    },
    {
      Icon: Video, // TikTok
      href: "https://www.tiktok.com/@avramovamiglenaa",
      label: "TikTok",
    },
    {
      Icon: Youtube,
      href: "https://www.youtube.com/@miglenaavramova1848", // Сложи твоя актуален линк тук
      label: "YouTube",
    },
  ];

  return (
    <footer className="bg-brand-light px-6 relative overflow-hidden">
      {/* 1. НАЙ-ГОРЕН ФИН РАЗДЕЛИТЕЛ */}
      <div className="max-w-7xl mx-auto border-t border-gray-200" />

      <div className="max-w-7xl mx-auto py-12 md:py-10 md:pt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
          {/* Бранд Секция */}
          <div className="md:col-span-2 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center group w-fit">
              <img
                src="/logo.svg"
                alt="Миглена Аврамова Лого"
                className="h-12 md:h-16 w-auto object-contain transition-all duration-500 group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-500 font-sans text-sm leading-relaxed max-w-sm">
              Вашият ментор по пътя към успеха. Изграждаме бъдещето на
              лидерството заедно.
            </p>

            {/* СОЦИАЛНИ МРЕЖИ - ОБНОВЕНИ */}
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-6 md:mb-8">
              Навигация
            </h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-8 gap-y-4 w-full md:w-auto">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-center md:justify-start"
                >
                  <Link
                    smooth
                    to={item.path}
                    className="group flex items-center gap-2 text-brand-dark/60 hover:text-brand-primary transition-colors font-sans text-sm font-medium"
                  >
                    {item.name}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 md:group-hover:opacity-100 transition-all -translate-y-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакти */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-6 md:mb-8">
              Контакти
            </h4>
            <div className="space-y-4 md:space-y-6 text-brand-dark/70">
              <a
                href="mailto:miglena.avramova.as@gmail.com"
                className="font-sans text-sm hover:text-brand-primary transition-colors cursor-pointer font-medium break-all block"
              >
                miglena.avramova.as@gmail.com
              </a>
              <p className="font-sans text-[10px] opacity-50 uppercase tracking-[0.2em] font-bold text-gray-400">
                BASED IN BULGARIA • OPERATES WORLDWIDE
              </p>
            </div>
          </div>
        </div>

        {/* 2. ДОЛЕН ФИН РАЗДЕЛИТЕЛ И ПРАВНА ЛЕНТА */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <p className="font-sans text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold order-2 md:order-1">
            © {currentYear} Miglena Avramova • Forever Business Owner
          </p>
          <div className="flex gap-6 md:gap-8 font-sans text-[10px] text-gray-400 uppercase tracking-[0.1em] font-bold order-1 md:order-2">
            <Link
              smooth
              to="/privacyPolicy"
              className="hover:text-brand-primary transition-colors underline decoration-gray-200"
            >
              Политика за поверителност
            </Link>
            <Link
              smooth
              to="/termsofservice"
              className="hover:text-brand-primary transition-colors underline decoration-gray-200"
            >
              Общи условия
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
