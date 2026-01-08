import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Tag,
  Percent,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchProducts, getOrderUrl } from "../api";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

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

  const getDiscountedPrice = (price) => {
    return (parseFloat(price) * 0.85).toFixed(2);
  };

  const getPaginationGroup = (currentPage, totalPages) => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
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
    }
    return pages;
  };

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, sortBy]);

  const handleOrder = async (id) => {
    const url = await getOrderUrl(id);
    if (url !== "#") {
      window.open(url, "_blank");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price_asc")
      return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === "price_desc")
      return parseFloat(b.price) - parseFloat(a.price);
    if (sortBy === "name_asc") return a.h1.localeCompare(b.h1);
    if (sortBy === "name_desc") return b.h1.localeCompare(a.h1);
    return 0;
  });

  const filteredProducts = sortedProducts.filter(
    (p) =>
      p.h2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.h1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id?.toString().includes(searchTerm)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="py-20 md:py-32 px-6 min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="inline-block"
                    >
                      <h2 className="text-4xl md:text-6xl font-display font-medium text-brand-dark case tracking-tighter leading-none mb-6">
                        Разгледай <br />
                        <span className="text-brand-primary font-light italic">
                          {categoryNames[category] || "Нашите Продукти"}
                        </span>
                      </h2>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-brand-primary" />
                        <p className="font-sans text-gray-400 text-xs case tracking-[0.3em] font-medium">
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
              className="w-full pl-14 pr-6 py-4 rounded-full bg-gray-50 border-none shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none font-sans text-sm text-brand-dark transition-all placeholder:text-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative min-w-[220px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none font-light bg-gray-50 border-none px-6 py-4 rounded-full font-sans text-xs tracking-widest text-brand-dark focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer shadow-sm pr-12"
            >
              <option value="default">Сортирай по</option>
              <option value="price_asc">Цена: Възходяща</option>
              <option value="price_desc">Цена: Низходяща</option>
              <option value="name_asc">Име: А-Я</option>
              <option value="name_desc">Име: Я-А</option>
            </select>
            <ChevronDown
              className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-primary pointer-events-none"
              size={16}
            />
          </div>
        </div>

        {/* Брояч и Инфо */}
        {/* Брояч и Инфо - Центриран бутон */}
        <div className="mb-12 px-2 flex flex-col items-center justify-center text-center">
          {/* Бутонът - вече е в центъра */}
          <button
            onClick={() =>
              window.open("ТУК_СЛОЖИ_ЛИНКА_ЗА_РЕГИСТРАЦИЯ", "_blank")
            }
            className="btn-primary mb-6"
          >
            <span>
              Ела в моя екип и пазарувай с <strong>-30%</strong> отстъпка или повече!
            </span>{" "}
            <ArrowRight
              size={18}
              strokeWidth={1.2}
              className="ml-2 group-hover:translate-x-2 transition-transform"
            />
          </button>

          {/* Броячът - под бутона, за по-чиста линия */}
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
            Резултати:{" "}
            <span className="text-brand-primary">
              {filteredProducts.length}
            </span>
          </p>
        </div>

        {/* Grid */}
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
            >
              <AnimatePresence mode="popLayout">
                {currentItems.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={product.id}
                    className="bg-white flex flex-col group overflow-hidden rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-square bg-white p-5 overflow-hidden flex items-center justify-center">
                      <img
                        src={product.image3}
                        alt={product.h2}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-dark text-[9px] font-bold px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        Код: {product.id}
                      </div>

                      {/* УВЕЛИЧЕН БАДЖ ЗА ОТСТЪПКА С ВАШАТА СЯНКА */}
                      <div
                        className="absolute top-4 right-4 bg-brand-primary text-white 
             w-18 h-18 md:w-20 md:h-20 
             rounded-full z-10 
             flex flex-col items-center justify-center 
             transition-all duration-300
             border-2 border-white/20
             hover:scale-105"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                        }}
                      >
                        <span className="text-[16px] md:text-[20px] font-black leading-none tracking-tighter">
                          -15%
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-7 flex flex-col flex-1 bg-white">
                      <h3 className="font-sans font-bold text-brand-dark text-base mb-1 line-clamp-1">
                        {product.h1}
                      </h3>
                      <p className="font-sans text-gray-400 text-[11px] line-clamp-2 leading-relaxed h-[34px]">
                        {product.h2}
                      </p>

                      <div className="mt-auto border-t border-gray-50 flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest mb-1">
                            Специална цена
                          </span>
                          <span className="text-[16px] text-gray-400 line-through font-sans mb-0.5">
                            {parseFloat(product.price).toFixed(2)} лв.
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-sans font-bold text-brand-dark">
                              {getDiscountedPrice(product.price)}
                            </span>
                            <span className="text-[10px] font-bold text-brand-dark">
                              ЛВ
                            </span>
                          </div>
                        </div>

                        {/* БУТОН С НАДПИС КУПИ */}
                        <button
                          onClick={() => handleOrder(product.id)}
                          className="bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2 group/btn"
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-20">
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
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
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={`w-12 h-12 rounded-full font-sans text-xs font-bold transition-all ${
                          currentPage === item
                            ? "bg-brand-primary text-white shadow-lg"
                            : "bg-gray-50 text-brand-dark hover:bg-gray-100"
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
                    window.scrollTo({ top: 0, behavior: "smooth" });
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

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <Search className="mx-auto text-gray-200 mb-6" size={64} />
            <h3 className="font-display text-2xl text-brand-dark mb-2">
              Няма открити продукти
            </h3>
            <p className="font-sans text-sm text-gray-400">
              Пробвайте с друго име или код.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
