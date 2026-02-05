import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ListFilter,
  ArrowRight,
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProducts, getOrderUrl } from "../api";
import NewsBannerSlider from "../components/NewsBannerSlider";

const API_URL = "http://localhost:3010";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const productsPerPage = 12;
  const [news, setNews] = useState([]);

  const categoryNames = {
    drinks: "Напитки от Алое",
    supplements: "Хранителни добавки",
    face: "Грижа за лицето",
    body: "Грижа за тялото",
    hygiene: "Лична хигиена",
    "weight-loss": "Контрол на теглото",
    packages: "Пакети",
    cosmetics: "Козметика",
    "drinks-and-supplements": "Напитки и добавки",
    shop: "Всички продукти",
  };

  // 2. Добавяме useEffect за зареждане на новините от бекенда
  useEffect(() => {
    const loadNews = async () => {
      try {
        // Добавяме timestamp (?t=...), за да избегнем кеширането от браузъра
        const response = await fetch(
          `${API_URL}/getNews?t=${new Date().getTime()}`,
        );
        const data = await response.json();
        setNews(data);

        // По избор: изчистваме стария кеш, за да не обърква системата
        localStorage.removeItem("miglena_news");
      } catch (error) {
        console.error("Грешка при зареждане на новините в магазина:", error);
      }
    };

    loadNews();
  }, []); // Изпълнява се веднъж при зареждане на компонента

  const sortOptions = [
    { value: "default", label: "Сортирай по" },
    { value: "price_asc", label: "Цена: Възходяща" },
    { value: "price_desc", label: "Цена: Низходяща" },
    { value: "name_asc", label: "Име: А-Я" },
    { value: "name_desc", label: "Име: Я-А" },
  ];

  const currentSortLabel = sortOptions.find(
    (opt) => opt.value === sortBy,
  )?.label;

  const categoriesList = [
    { id: "shop", label: "Всички", icon: "FL-Icon-Growth.svg" },
    {
      id: "drinks",
      label: "Напитки",
      icon: "FL-Icon-AloeVeraTetraPak.svg",
    },
    {
      id: "supplements",
      label: "Добавки",
      icon: "FL-Icon-ProprietaryBlend.svg",
    },
    { id: "face", label: "Лице", icon: "FL-Icon-HairSkinandNails.svg" },
    { id: "body", label: "Тяло", icon: "FL-Icon-Harvesting.svg" },
    { id: "hygiene", label: "Хигиена", icon: "FL-Icon-VarietyofProducts.svg" },
    { id: "weight-loss", label: "Тегло", icon: "FL-Icon-Weight.svg" },
    { id: "packages", label: "Пакети", icon: "FL-Icon-GreatForGifts.svg" },
  ];

  const navigate = useNavigate();

  const categoryHierarchy = {
    face: { parent: "cosmetics", label: "Козметика" },
    body: { parent: "cosmetics", label: "Козметика" },
    hygiene: { parent: "cosmetics", label: "Козметика" },
    drinks: { parent: "drinks-and-supplements", label: "Напитки и добавки" },
    supplements: {
      parent: "drinks-and-supplements",
      label: "Напитки и добавки",
    },
  };

  const parsePrice = (price) => {
    if (!price) return 0;
    let clean = price
      .toString()
      .replace(/,/g, "")
      .replace(/[^\d.-]/g, "");
    return parseFloat(clean) || 0;
  };

  const getDiscountedPrice = (price) => {
    const original = parsePrice(price);
    return (original * 0.85).toFixed(2);
  };

  const euroRate = 1.95583;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(category || "shop");
        setProducts(data);
      } catch (error) {
        console.error("Грешка при зареждане:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [category]);

  // В Products.jsx добавете това:
  useEffect(() => {
    // Скролва до горе само веднъж при първото влизане в магазина
    window.scrollTo(0, 0);
  }, []); // Празен масив означава "само при първо зареждане"

  const handleCategoryClick = (catId) => {
    // 1. Сменяме адреса
    navigate(`/shop/${catId === "shop" ? "" : catId}`);
  };

  const filteredAndSortedProducts = useMemo(() => {
    if (!products || loading) return []; // Добавете || loading
    let result = products.filter((p) => {
      const search = searchTerm.toLowerCase();
      return (
        p.h1?.toLowerCase().includes(search) ||
        p.h2?.toLowerCase().includes(search) ||
        p.id?.toString().includes(search)
      );
    });
    const sorted = [...result];
    switch (sortBy) {
      case "price_asc":
        return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case "price_desc":
        return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      case "name_asc":
        return sorted.sort((a, b) => (a.h1 || "").localeCompare(b.h1 || ""));
      case "name_desc":
        return sorted.sort((a, b) => (b.h1 || "").localeCompare(a.h1 || ""));
      default:
        return sorted;
    }
  }, [products, searchTerm, sortBy]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentItems = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, sortBy]);

  const handleOrder = async (id) => {
    const url = await getOrderUrl(id);
    if (url !== "#") window.open(url, "_blank");
  };

  const getPaginationGroup = (currentPage, totalPages) => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) pages = [1, 2, 3, 4, "...", totalPages];
      else if (currentPage >= totalPages - 2)
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      else
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
    }
    return pages;
  };

  return (
    <section className="min-h-screen ">
      <NewsBannerSlider news={news} />
      <div className="stack-space pt-10">
        <div className="mb-12 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <nav className="flex items-center flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6 font-medium">
              <Link
                to="/shop"
                className="hover:text-brand-primary transition-colors"
              >
                Магазин
              </Link>
              {category && category !== "shop" && (
                <>
                  {categoryHierarchy[category] &&
                    categoryHierarchy[category].parent !== category && (
                      <>
                        <ChevronRight size={10} />
                        <Link
                          to={`/shop/${categoryHierarchy[category].parent}`}
                          className="hover:text-brand-primary transition-colors cursor-pointer font-medium"
                        >
                          {categoryHierarchy[category].label}
                        </Link>
                      </>
                    )}
                  <ChevronRight size={10} />
                  <span className="text-brand-primary font-bold">
                    {categoryNames[category] || "Продукти"}
                  </span>
                </>
              )}
            </nav>
            <h1 className="font-display font-medium text-brand-dark case leading-none mb-4">
              Разгледай <br />
              <span className="text-brand-primary font-light italic">
                {categoryNames[category] || "Нашите Продукти"}
              </span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brand-primary" />
              <p className="font-sans text-gray-400 text-xs case tracking-[0.2em] font-regular">
                От растението, до продукта, до теб!
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mb-12 flex flex-col items-start justify-center text-center">
          <button
            onClick={() =>
              window.open("https://thealoeveraco.shop/20rQ6mPC", "_blank")
            }
            className="btn-primary mb-6"
          >
            <span>
              Ела в моя екип и пазарувай с{" "}
              <span className="font-bold">-30%</span> отстъпка!
            </span>
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>

        <div id="categories" className="relative mb-10 ">
          <div className="flex overflow-x-auto gap-4 pt-4 pb-6 scroll-smooth custom-scrollbar px-2">
            {categoriesList.map((cat) => {
              const isActive = (category || "shop") === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex flex-col items-center gap-3 min-w-[100px] group transition-all pt-2"
                >
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                      isActive
                        ? "bg-brand-primary border-brand-primary shadow-xl scale-110 -translate-y-1"
                        : "bg-white border-gray-50 group-hover:border-brand-primary/30"
                    }`}
                  >
                    <img
                      src={`/Category_Icons/${cat.icon}`} // Пътят до вашата папка в public
                      alt={cat.label}
                      className={`w-18 h-18 transition-all duration-500 ${
                        isActive ? "brightness-0 invert" : ""
                      }`}
                      /* brightness-0 invert прави черна икона бяла, когато е активна */
                    />
                  </div>
                  <span
                    className={`font-sans text-[10px] uppercase tracking-[0.15em] transition-colors whitespace-nowrap ${isActive ? "text-brand-primary font-bold" : "text-gray-400 group-hover:text-brand-dark"}`}
                  >
                    {cat.label}
                  </span>
                  <div className="h-1">
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="activeDot"
                          className="w-1.5 h-1.5 rounded-full bg-brand-primary mx-auto"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-brand-light via-brand-light/50 to-transparent pointer-events-none lg:hidden" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-primary transition-colors"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              placeholder="Търсене по име или код..."
              className="w-full pl-14 pr-6 py-4 rounded-full bg-gray-50 border border-transparent shadow-sm hover:shadow-md focus:bg-white focus:ring-2 focus:ring-brand-primary/20 outline-none text-sm text-brand-dark transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative min-w-[260px] z-40">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`w-full flex items-center justify-between pl-6 pr-6 py-4 rounded-full border shadow-sm transition-all duration-300 outline-none font-sans text-[11px] tracking-widest uppercase ${
                isSortOpen
                  ? "bg-white border-brand-primary/20 ring-2 ring-brand-primary/20 shadow-md text-brand-primary"
                  : "bg-gray-50 border-transparent text-brand-dark hover:bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <ListFilter size={16} className="text-brand-primary" />
                <span className="font-normal">{currentSortLabel}</span>
              </div>
              <motion.div
                animate={{ rotate: isSortOpen ? 180 : 0 }}
                className="flex items-center"
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 8 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl border border-brand-primary/10 rounded-[2rem] shadow-2xl overflow-hidden z-20 p-2"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3.5 rounded-2xl font-sans text-[10px] uppercase tracking-widest transition-all ${
                          sortBy === option.value
                            ? "bg-brand-primary text-white font-bold"
                            : "text-brand-dark hover:bg-brand-primary/10 hover:text-brand-primary"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mb-6 flex flex-col items-center justify-center text-center ">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mx-auto">
            Резултати:{" "}
            <span className="text-brand-primary">
              {filteredAndSortedProducts.length}
            </span>
          </p>
        </div>

        <div id="products-grid" className="scroll-mt-32 px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, n) => (
                <div
                  key={n}
                  className=" rounded-[2.5rem] p-8 h-[520px] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <motion.div
                layout
                key={`${category}-${sortBy}-${searchTerm}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 mb-10 md:mb-20"
              >
                <AnimatePresence mode="popLayout">
                  {currentItems.map((product) => (
                    <motion.div
                      layout
                      key={`${product.id}-${category}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-brand-light flex flex-col group overflow-hidden rounded-[2rem] border border-gray-100 hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="relative aspect-square bg-white p-5 overflow-hidden flex items-center justify-center">
                        <img
                          src={product.image3}
                          alt={product.h1}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-brand-light/90 backdrop-blur-sm text-brand-dark text-[9px] font-bold px-3 py-1 rounded-full shadow-sm">
                          Код: {product.id}
                        </div>
                        <div className="absolute top-4 right-4 bg-brand-primary text-white w-16 h-16 rounded-full flex items-center justify-center font-black text-sm shadow-lg ">
                          -15%
                        </div>
                      </div>
                      <div className="p-7 flex flex-col flex-1 bg-white">
                        <h3 className="font-sans font-bold text-brand-dark text-base mb-1 line-clamp-1">
                          {product.h1}
                        </h3>
                        <p className="font-sans text-gray-400 text-[12px] line-clamp-2 leading-relaxed h-[34px]">
                          {product.h2}
                        </p>
                        <div className="mt-auto border-t border-gray-50 pt-4 flex flex-col gap-2">
                          <div className="flex items-center gap-1">
                            <span className="bg-brand-primary/10 text-brand-primary text-[12px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                              Спестяваш: €
                              {(
                                (parsePrice(product.price) -
                                  parsePrice(
                                    getDiscountedPrice(product.price),
                                  )) /
                                euroRate
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div className="text-gray-900 line-through font-sans text-[14px] opacity-60 whitespace-nowrap w-full">
                            <span>
                              €
                              {(parsePrice(product.price) / euroRate).toFixed(
                                2,
                              )}
                            </span>
                            <span className="no-underline opacity-20 px-1.5">
                              {" "}
                              /{" "}
                            </span>
                            <span>
                              {parsePrice(product.price).toFixed(2)} лв.
                            </span>
                          </div>
                          <div className="flex justify-between items-end gap-2 mt-1">
                            <div className="flex flex-col gap-0">
                              <div className="flex items-baseline gap-1">
                                <span className="text-xl font-black text-brand-dark uppercase">
                                  €
                                </span>
                                <span className="text-2xl font-sans font-black text-brand-dark tracking-tighter leading-none">
                                  {(
                                    parsePrice(
                                      getDiscountedPrice(product.price),
                                    ) / euroRate
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <div className="flex items-baseline gap-1 opacity-50">
                                <span className="font-sans font-bold text-brand-dark">
                                  {getDiscountedPrice(product.price)}
                                </span>
                                <span className="text-[10px] font-bold text-brand-dark uppercase">
                                  лв
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleOrder(product.id)}
                              className="bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-brand-dark transition-all flex items-center gap-2 group/btn shrink-0"
                            >
                              <span className="text-[11px] font-bold uppercase tracking-wider">
                                Купи
                              </span>
                              <ExternalLink
                                size={14}
                                className="group-hover/btn:translate-x-0.5 transition-transform"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
                  <div className="flex items-center gap-1 sm:gap-3 bg-white/50 p-1.5 rounded-full shadow-sm border border-gray-100">
                    {/* Предишна страница */}
                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        document
                          .getElementById("products-grid")
                          .scrollIntoView({ behavior: "smooth" });
                      }}
                      disabled={currentPage === 1}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-50 text-brand-dark hover:bg-brand-primary hover:text-white disabled:opacity-20 transition-all"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {/* Номера на страници - добавяме flex-wrap за мобилни или overflow-x-auto */}
                    <div className="flex items-center gap-1 sm:gap-2">
                      {getPaginationGroup(currentPage, totalPages).map(
                        (item, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (item !== "...") {
                                setCurrentPage(item);
                                document
                                  .getElementById("products-grid")
                                  .scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                            className={`min-w-[40px] h-10 sm:min-w-[48px] sm:h-12 px-2 rounded-full font-bold text-[11px] sm:text-xs transition-all ${
                              currentPage === item
                                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105"
                                : item === "..."
                                  ? "bg-transparent cursor-default text-gray-400"
                                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-50"
                            }`}
                          >
                            {item}
                          </button>
                        ),
                      )}
                    </div>

                    {/* Следваща страница */}
                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        document
                          .getElementById("products-grid")
                          .scrollIntoView({ behavior: "smooth" });
                      }}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-50 text-brand-dark hover:bg-brand-primary hover:text-white disabled:opacity-20 transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Индикатор за мобилни: Страница X от Y */}
                  <p className="sm:hidden font-sans text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                    Страница{" "}
                    <span className="text-brand-primary">{currentPage}</span> от{" "}
                    {totalPages}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
