import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ChevronRight, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpands, setMobileExpands] = useState({});
  const [activeMenu, setActiveMenu] = useState(null); // За Hover на главното меню
  const [activeSubMenu, setActiveSubMenu] = useState(null); // За Клик на подменюто (Козметика/Напитки)

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const isTransparentHero = isHomePage && !scrolled;

  const topLevelTextStyle = `font-sans text-[11px] uppercase tracking-widest font-regular transition-colors duration-300 ${
    isTransparentHero
      ? "text-white"
      : "text-brand-dark hover:text-brand-primary"
  }`;

  const dropdownTextStyle =
    "font-sans text-[11px] uppercase tracking-widest font-regular text-brand-dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
    setActiveSubMenu(null);
  }, [location]);

  const toggleExpand = (key) => {
    setMobileExpands((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

  const menuItems = [
    { title: "За мен", href: "/" },
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
            : "h-20 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center group"
            onClick={() => {
              if (window.location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img
              src="/logo.svg"
              alt="Лого"
              className="h-14 md:h-14 w-auto object-contain transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, idx) => {
              const isMenuOpen = activeMenu === item.title;

              return (
                <div
                  key={idx}
                  className="relative px-0.5"
                  onMouseEnter={() => item.submenu && setActiveMenu(item.title)}
                  onMouseLeave={() => {
                    setActiveMenu(null);
                    setActiveSubMenu(null);
                  }}
                >
                  {item.href.startsWith("#") ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleScrollToSection(e, item.href)}
                      className={`${topLevelTextStyle} px-4 py-2 transition-all cursor-pointer block`}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className={`transition-all duration-300 flex items-center gap-1 ${topLevelTextStyle} ${
                        item.highlight
                          ? "btn-primary !px-8 !py-4 !text-white ml-4"
                          : "px-4 py-2"
                      }`}
                    >
                      {item.title}
                      {item.submenu && !item.highlight && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${
                            isMenuOpen ? "rotate-180" : ""
                          } ${
                            isTransparentHero ? "text-white/70" : "opacity-40"
                          }`}
                        />
                      )}
                    </Link>
                  )}

                  {/* Dropdown - Отваря се с Hover */}
                  <AnimatePresence>
                    {item.submenu && isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2 z-[110]"
                      >
                        <div className="absolute top-0 left-0 w-full h-2" />

                        <div className="bg-white border border-brand-light shadow-2xl rounded-2xl p-2 overflow-hidden">
                          {item.submenu.map((sub, sIdx) => {
                            const isSubOpen = activeSubMenu === sub.title;

                            return (
                              <div key={sIdx} className="flex flex-col">
                                {sub.subSubmenu ? (
                                  // АКО ИМА ПОД-ПОДМЕНЮ (Козметика, Напитки)
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setActiveSubMenu(
                                        isSubOpen ? null : sub.title,
                                      );
                                    }}
                                    className="flex justify-between items-center px-4 py-3 rounded-xl hover:bg-brand-light transition-colors cursor-pointer"
                                  >
                                    <span className={dropdownTextStyle}>
                                      {sub.title}
                                    </span>
                                    <ChevronDown
                                      size={14}
                                      className={`text-brand-primary/60 transition-transform duration-300 ${
                                        isSubOpen ? "rotate-180" : ""
                                      }`}
                                    />
                                  </div>
                                ) : (
                                  // АКО НЯМА ПОД-ПОДМЕНЮ (Контрол на теглото, Пакети) -> Директен Линк
                                  <Link
                                    to={sub.href}
                                    className={`flex items-center px-4 py-3 rounded-xl hover:bg-brand-light transition-colors ${dropdownTextStyle}`}
                                  >
                                    {sub.title}
                                  </Link>
                                )}

                                {/* Sub-Submenu Accordion */}
                                <AnimatePresence>
                                  {sub.subSubmenu && isSubOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden bg-brand-cream/30 rounded-xl mx-1 mb-1"
                                    >
                                      <div className="flex flex-col py-1">
                                        {sub.subSubmenu.map((ss, ssIdx) => (
                                          <Link
                                            key={ssIdx}
                                            to={ss.href}
                                            className={`block px-8 py-2.5 ${dropdownTextStyle} hover:text-brand-primary hover:bg-white/50 rounded-lg mx-1 transition-all`}
                                          >
                                            {ss.title}
                                          </Link>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2.5 text-brand-dark hover:text-brand-primary transition-colors"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
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
                className="absolute top-6 right-6 p-2 text-brand-dark"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col space-y-8">
                {menuItems.map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    <div
                      className="flex justify-between items-center"
                      onClick={() => item.submenu && toggleExpand(item.title)}
                    >
                      {item.href.startsWith("#") ? (
                        <a
                          href={item.href}
                          onClick={(e) => handleScrollToSection(e, item.href)}
                          className={`${dropdownTextStyle} text-[13px]`}
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className={`${dropdownTextStyle} text-[13px] ${
                            item.highlight ? "!text-brand-primary" : ""
                          }`}
                        >
                          {item.title}
                        </Link>
                      )}
                      {item.submenu && (
                        <ChevronDown
                          size={18}
                          className={`text-brand-dark/60 transition-transform ${
                            mobileExpands[item.title] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    {item.submenu && mobileExpands[item.title] && (
                      <div className="pl-4 space-y-6 border-l border-brand-primary/20 mt-4">
                        {item.submenu.map((sub, sIdx) => (
                          <div key={sIdx} className="space-y-6">
                            <div
                              className="flex justify-between items-center"
                              onClick={() =>
                                sub.subSubmenu
                                  ? toggleExpand(sub.title)
                                  : navigate(sub.href)
                              }
                            >
                              {sub.subSubmenu ? (
                                <span className={dropdownTextStyle}>
                                  {sub.title}
                                </span>
                              ) : (
                                <Link
                                  to={sub.href}
                                  className={dropdownTextStyle}
                                >
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
                              <div className="pl-4 flex flex-col space-y-6 border-l font-light border-brand-primary/10">
                                {sub.subSubmenu.map((ss, ssIdx) => (
                                  <Link
                                    key={ssIdx}
                                    to={ss.href}
                                    className={dropdownTextStyle}
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
