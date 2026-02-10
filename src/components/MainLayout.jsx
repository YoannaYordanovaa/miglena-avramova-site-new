import React from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-brand-cream overflow-x-hidden">
      {/* --- ГЛОБАЛЕН ФОН --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* 1. ЕЛЕМЕНТИ */}
        <motion.img
          src="/Aloe_Vera_Plant.webp"
          className="absolute -top-10 -right-20 w-[350px] md:w-[550px] h-auto object-contain opacity-20"
          animate={{
            rotate: [15, 22, 15],
            y: [0, 30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.img
          src="/Aloe_Vera_Plant.webp"
          className="absolute -bottom-20 -left-10 w-[300px] md:w-[500px] h-auto object-contain opacity-15"
          animate={{
            rotate: [-10, -18, -10],
            scale: [1, 1.08, 1],
            y: [0, -25, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* 2. ИКОНИ */}
        <motion.div
          className="absolute top-1/4 left-[15%] text-brand-primary opacity-20"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Leaf size={45} strokeWidth={1} />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-[10%] text-brand-primary opacity-15"
          animate={{
            y: [0, 35, 0],
            rotate: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Leaf size={35} strokeWidth={1} />
        </motion.div>

        {/* Смарагдов акцент в горния десен ъгъл */}
        <div className="absolute top-[10%] right-[0%] w-[600px] h-[600px] bg-brand-primary/15 rounded-full blur-[130px]" />

        {/* Нежен златист/крем акцент долу вляво (за светлина и топлина) */}
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#f3e5ab]/20 rounded-full blur-[110px]" />

        {/* 4. "КАПКИ" */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-brand-primary/25 rounded-full"
            style={{
              left: `${15 + i * 18}%`,
              top: `${25 + i * 12}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.2, 0.5, 0.2],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ОСНОВНО СЪДЪРЖАНИЕ */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default MainLayout;
