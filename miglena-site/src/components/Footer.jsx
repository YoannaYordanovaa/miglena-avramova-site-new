import React from 'react';
import { motion } from 'framer-motion';
import { HashLink as Link } from 'react-router-hash-link';
import { Facebook, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const menuItems = [
    { name: 'Начало', path: '/#home' },
    { name: 'За мен', path: '/about' },
    { name: 'Галерия', path: '/join#gallery' },
    { name: 'Видео', path: '/join#video' },
    { name: 'Включи се', path: '/join' },
  ];

  return (
    <footer className="bg-white px-6 relative overflow-hidden">
      
      {/* 1. НАЙ-ГОРЕН ФИН РАЗДЕЛИТЕЛ */}
      <div className="max-w-7xl mx-auto border-t border-gray-200" />

      <div className="max-w-7xl mx-auto py-12 md:py-10 md:pt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
          
          {/* Бранд Секция - Центрирана за мобилни */}
          <div className="md:col-span-2 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center group w-fit">
              <img 
                src="/logo.svg" 
                alt="Миглена Аврамова Лого" 
                className="h-12 md:h-16 w-auto object-contain transition-all duration-500 group-hover:scale-105" 
              />
            </Link>
            <p className="text-gray-500 font-sans text-sm leading-relaxed max-w-sm">
              Вашият ментор по пътя към успеха. Изграждаме бъдещето на лидерството заедно.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Linkedin, href: "#" }
              ].map(({ Icon, href }, idx) => (
                <a 
                  key={idx} 
                  href={href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Навигация - Подредена в 2 колони на мобилни за по-добро използване на пространството */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-6 md:mb-8">
              Навигация
            </h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-8 gap-y-4 w-full md:w-auto">
              {menuItems.map((item) => (
                <li key={item.name} className="flex justify-center md:justify-start">
                  <Link 
                    smooth 
                    to={item.path}
                    className="group flex items-center gap-2 text-brand-dark/60 hover:text-brand-primary transition-colors font-sans text-sm font-medium"
                  >
                    {item.name}
                    <ArrowUpRight size={12} className="opacity-0 md:group-hover:opacity-100 transition-all -translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакти - Центрирани за мобилни */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-6 md:mb-8">
              Контакти
            </h4>
            <div className="space-y-4 md:space-y-6 text-brand-dark/70">
                <p className="font-sans text-sm hover:text-brand-primary transition-colors cursor-pointer font-medium break-all">
                  office@miglenaavramova.com
                </p>
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
            <Link smooth to="/#home" className="hover:text-brand-primary transition-colors underline decoration-gray-200">Privacy Policy</Link>
            <Link smooth to="/#home" className="hover:text-brand-primary transition-colors underline decoration-gray-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;