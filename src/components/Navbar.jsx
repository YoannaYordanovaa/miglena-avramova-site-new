import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpands, setMobileExpands] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  // Уеднаквен стил за текстовете: 11px, Главни букви, Еднакъв цвят
  const menuTextStyle =
    "font-sans text-[11px] uppercase tracking-widest font-regular text-brand-dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleScrollToSection = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const elem = document.getElementById(targetId);
          if (elem) elem.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const elem = document.getElementById(targetId);
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    }
  };

  const toggleExpand = (key) => {
    setMobileExpands((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = [
    { title: "За мен", href: "#about" },
    {
      title: "е-Магазин",
      href: "/shop",
      submenu: [
        {
          title: "Напитки и добавки",
          subSubmenu: [
            { title: "Напитки", href: "/shop/drinks" },
            { title: "Добавки", href: "/shop/supplements" },
          ],
        },
        {
          title: "Козметика",
          subSubmenu: [
            { title: "Грижа за лицето", href: "/shop/face" },
            { title: "Грижа за тялото", href: "/shop/body" },
            { title: "Лична хигиена", href: "/shop/hygiene" },
          ],
        },
        { title: "Контрол на теглото", href: "/shop/weight-loss" },
        { title: "Пакети", href: "/shop/packages" },
      ],
    },
    { title: "Контакти", href: "#contact" },
    { title: "Ела в моя екип", href: "/join", highlight: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full transition-all duration-500 z-[100] ${
          scrolled
            ? "h-16 bg-white/95 backdrop-blur-md shadow-sm"
            : "h-20 bg-white lg:bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <img
              src="/logo.svg"
              alt="Лого"
              className="h-14 md:h-16 w-auto object-contain transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, idx) => (
              <div key={idx} className="relative group px-0.5">
                {item.href.startsWith("#") ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollToSection(e, item.href)}
                    className={`${menuTextStyle} px-4 py-2 hover:text-brand-primary transition-all cursor-pointer block`}
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className={`transition-all duration-300 ${menuTextStyle} ${
                      item.highlight
                        ? "btn-primary !px-8 !py-4 !text-white"
                        : "px-4 py-2 hover:text-brand-primary flex items-center gap-1"
                    }`}
                  >
                    {item.title}
                    {item.submenu && !item.highlight && (
                      <ChevronDown
                        size={14}
                        className="opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300"
                      />
                    )}
                  </Link>
                )}

                {item.submenu && (
                  <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white border border-brand-light shadow-2xl rounded-[1.2rem] p-2">
                      {item.submenu.map((sub, sIdx) => (
                        <div key={sIdx} className="relative group/sub">
                          <div className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-brand-light/50 transition-colors cursor-pointer">
                            {sub.subSubmenu ? (
                              <span className={menuTextStyle}>{sub.title}</span>
                            ) : (
                              <Link
                                to={sub.href}
                                className={`${menuTextStyle} w-full`}
                              >
                                {sub.title}
                              </Link>
                            )}
                            {sub.subSubmenu && (
                              <ChevronRight
                                size={14}
                                className="text-brand-primary/60"
                              />
                            )}
                          </div>

                          {sub.subSubmenu && (
                            <div className="absolute top-0 left-[calc(100%+0.5rem)] w-52 bg-white shadow-2xl border border-brand-light rounded-[1rem] p-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                              {sub.subSubmenu.map((ss, ssIdx) => (
                                <Link
                                  key={ssIdx}
                                  to={ss.href}
                                  className={`block px-4 py-3 ${menuTextStyle} hover:text-brand-primary hover:bg-brand-light/40 rounded-md transition-all`}
                                >
                                  {ss.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 text-brand-dark hover:text-brand-primary transition-colors"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-brand-dark/30 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-[85%] bg-brand-cream z-[120] shadow-2xl rounded-l-[2rem] p-8 pt-24 overflow-y-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col space-y-8">
                {menuItems.map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    <div
                      className="flex justify-between items-center group"
                      onClick={() => item.submenu && toggleExpand(item.title)}
                    >
                      {item.href.startsWith("#") ? (
                        <a
                          href={item.href}
                          onClick={(e) => handleScrollToSection(e, item.href)}
                          className={`${menuTextStyle} text-[13px]`}
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className={`${menuTextStyle} text-[13px] ${
                            item.highlight ? "!text-brand-primary" : ""
                          }`}
                        >
                          {item.title}
                        </Link>
                      )}
                      {item.submenu && (
                        <ChevronDown
                          size={18}
                          className={`text-brand-dark/60 transition-transform duration-300 ${
                            mobileExpands[item.title] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    {item.submenu && mobileExpands[item.title] && (
                      <div className="pl-4 space-y-6 border-l border-brand-primary/20 mt-4">
                        {item.submenu.map((sub, sIdx) => (
                          <div key={sIdx} className="space-y-4">
                            <div
                              className="flex justify-between items-center cursor-pointer"
                              onClick={() =>
                                sub.subSubmenu && toggleExpand(sub.title)
                              }
                            >
                              {sub.subSubmenu ? (
                                <span className={menuTextStyle}>
                                  {sub.title}
                                </span>
                              ) : (
                                <Link to={sub.href} className={menuTextStyle}>
                                  {sub.title}
                                </Link>
                              )}
                              {sub.subSubmenu && (
                                <ChevronDown
                                  size={16}
                                  className={`text-brand-primary/50 transition-transform ${
                                    mobileExpands[sub.title] ? "rotate-180" : ""
                                  }`}
                                />
                              )}
                            </div>

                            {sub.subSubmenu && mobileExpands[sub.title] && (
                              <div className="pl-4 flex flex-col space-y-4 border-l border-brand-primary/10">
                                {sub.subSubmenu.map((ss, ssIdx) => (
                                  <Link
                                    key={ssIdx}
                                    to={ss.href}
                                    className={menuTextStyle}
                                  >
                                    {ss.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
