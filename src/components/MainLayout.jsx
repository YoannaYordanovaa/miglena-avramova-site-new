import React from "react";
import { motion } from "framer-motion";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-brand-cream overflow-x-hidden">
      {/* --- ГЛОБАЛЕН ФИГУРАЛЕН ФОН (ВИДИМ НАВСЯКЪДЕ) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Фигурален патерн (Решетка от точки) */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, #1a2e2a 1px, transparent 0)`,
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* SVG Фигури в цветовете на логото */}
        <svg className="absolute w-full h-full opacity-[0.05]" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          {/* Горна фигура (Brand Primary) */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            d="M800,0 Q950,300 1000,200 L1000,0 Z"
            fill="#1f4d42"
          />
          
          {/* Долна фигура (Brand Dark) */}
          <motion.circle 
            cx="50" cy="950" r="300" 
            fill="#1a2e2a"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Абстрактна вълнообразна линия */}
          <path 
            d="M-100,300 C200,250 500,600 1100,450" 
            stroke="#1f4d42" 
            strokeWidth="0.5" 
            fill="none" 
            className="opacity-40"
          />
        </svg>

        {/* Цветни сияния за дълбочина */}
        <div className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[400px] h-[400px] bg-brand-dark/5 rounded-full blur-[100px]" />
      </div>

      {/* Тук ще се зарежда съдържанието на всяка страница */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;