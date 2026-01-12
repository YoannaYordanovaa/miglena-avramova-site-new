import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchProducts, getOrderUrl } from "../api";
import NewsBannerSlider from "../components/NewsBannerSlider";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const productsPerPage = 12;

  const categoryNames = {
    drinks: "Напитки от Алое",
    supplements: "Хранителни добавки",
    face: "Грижа за лицето",
    body: "Грижа за тялото",
    hygiene: "Лична хигиена",
    "weight-loss": "Контрол на теглото",
    packages: "Пакети",
    shop: "Всички продукти",
  };

   const [news, setNews] = useState(() => {
      const saved = localStorage.getItem("miglena_news");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              title: "Ново начало",
              text: "Програмата C9 вече е с обновени рецепти!",
              date: "28.12.2025",
            },
            {
              id: 2,
              title: "Екипно събитие",
              text: "Очакваме ви на следващия уелнес семинар в София.",
              date: "15.01.2026",
            },
          ];
    });

  const sortOptions = [
    { value: "default", label: "Сортирай по" },
    { value: "price_asc", label: "Цена: Възходяща" },
    { value: "price_desc", label: "Цена: Низходяща" },
    { value: "name_asc", label: "Име: А-Я" },
    { value: "name_desc", label: "Име: Я-А" },
  ];

  const currentSortLabel = sortOptions.find(
    (opt) => opt.value === sortBy
  )?.label;

  // Функция за правилно парсване на цени с разделители за хиляди (напр. 1,158.53лв)
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

  // ЗАРЕЖДАНЕ НА ДАННИ
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  // ФИЛТРИРАНЕ И СОРТИРАНЕ
  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

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
        // ВМЕСТО просто return sorted, ги подредете по ID за стабилност
        return sorted.sort((a, b) => parsePrice(a.id) - parsePrice(b.id));
    }
  }, [products, searchTerm, sortBy]);

  // ПАГИНАЦИЯ
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentItems = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage
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
    <div className="py-20 md:py-20 min-h-screen bg-white pb-20">
      {/* 1. ПОСТАВИ ГО НАЙ-ОТГОРЕ */}
      <NewsBannerSlider news={news} />
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
        {/* Header */}
        <div className="mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display font-medium text-brand-dark tracking-tighter leading-none mb-6">
              Разгледай <br />
              <span className="text-brand-primary font-light italic">
                {categoryNames[category] || "Нашите Продукти"}
              </span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brand-primary" />
              <p className="font-sans text-gray-400 text-xs tracking-[0.3em] font-medium uppercase">
                Един проект, една визия, едно семейство
              </p>
            </div>
          </motion.div>
        </div>

        {/* Инструменти */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-primary/40"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              placeholder="Търсене по име или код..."
              className="w-full pl-14 pr-6 py-4 rounded-full bg-gray-50 border-none shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none text-sm text-brand-dark transition-all placeholder:text-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative min-w-[240px] z-40">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full flex items-center justify-between bg-gray-50/50 backdrop-blur-sm border border-gray-100 px-6 py-4 rounded-full font-sans text-[11px] tracking-widest text-brand-dark uppercase hover:bg-white hover:shadow-md transition-all duration-300 outline-none"
            >
              <span className="font-medium">{currentSortLabel}</span>
              <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }}>
                <ChevronDown size={16} className="text-brand-primary" />
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
                    animate={{ opacity: 1, y: 5 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-2xl overflow-hidden z-20 p-2"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3.5 rounded-2xl font-sans text-[11px] uppercase tracking-wider transition-all ${
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

        {/* Брояч и Инфо */}
        <div className="mb-12 flex flex-col items-center justify-center text-center">
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
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
            Резултати:{" "}
            <span className="text-brand-primary">
              {filteredAndSortedProducts.length}
            </span>
          </p>
        </div>

        {/* Продуктова мрежа */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, n) => (
              <div
                key={n}
                className="bg-gray-50 rounded-[2.5rem] p-8 h-[520px] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <motion.div
              layout
              key={`${category}-${sortBy}-${searchTerm}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
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
                    className="bg-white flex flex-col group overflow-hidden rounded-[2rem] border border-gray-100 hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative aspect-square bg-white p-5 overflow-hidden flex items-center justify-center">
                      <img
                        src={product.image3}
                        alt={product.h1}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-dark text-[9px] font-bold px-3 py-1 rounded-full shadow-sm">
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

                      {/* Цена и Бутон */}
                      <div className="mt-auto border-t border-gray-50 pt-4 flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                          <span className="bg-brand-primary/10 text-brand-primary text-[12px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                            Спестяваш: €
                            {(
                              (parsePrice(product.price) -
                                parsePrice(getDiscountedPrice(product.price))) /
                              euroRate
                            ).toFixed(2)}
                          </span>
                        </div>

                        <div className="text-gray-900 line-through font-sans text-[14px] opacity-60 whitespace-nowrap w-full">
                          <span>
                            €{(parsePrice(product.price) / euroRate).toFixed(2)}
                          </span>
                          <span className="no-underline opacity-20 px-1.5">
                            /
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
                                    getDiscountedPrice(product.price)
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-20">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-brand-dark hover:bg-brand-primary hover:text-white disabled:opacity-20 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {getPaginationGroup(currentPage, totalPages).map(
                    (item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (item !== "...") {
                            setCurrentPage(item);
                            // Добавяме скрол нагоре
                            window.scrollTo({ top: 250, behavior: "smooth" });
                          }
                        }}
                        className={`w-12 h-12 rounded-full font-bold text-xs ${
                          currentPage === item
                            ? "bg-brand-primary text-white shadow-lg"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-brand-dark hover:bg-brand-primary hover:text-white disabled:opacity-20 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
