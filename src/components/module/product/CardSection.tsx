// "use client"
// import { motion, Variants } from "framer-motion";
// import { SpotlightCard } from "./ProxyCard";
// import { CardItem } from "@/Types/product.interface";

// const CardSection = ({ products }: { products: CardItem[] }) => {
//    const containerVariants: Variants = {
//       hidden: { opacity: 0 },
//       visible: {
//          opacity: 1,
//          transition: { staggerChildren: 0.2, delayChildren: 0.3 },
//       },
//    };

//    const cardVariants: Variants = {
//       hidden: { opacity: 0, y: 50, scale: 0.9 },
//       visible: {
//          opacity: 1,
//          y: 0,
//          scale: 1,
//          transition: { type: "spring", stiffness: 100, damping: 12 },
//       },
//       hover: {
//          y: -10,
//          scale: 1.02,
//          boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
//          transition: { type: "spring", stiffness: 300, damping: 15 },
//       },
//    };

//    const titleVariants: Variants = {
//       hidden: { opacity: 0, y: -30 },
//       visible: {
//          opacity: 1,
//          y: 0,
//          transition: { type: "spring", stiffness: 100, damping: 12 },
//       },
//    };

//    return (
//       <section className="my-12 md:my-20 text-center relative overflow-hidden bg-white">
//          {/* Light mode background decorations (optional) */}
//          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white" />

//          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             {/* Section Title */}
//             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={titleVariants} className="relative">
//                <h2 className="font-primary-inter font-bold text-3xl sm:text-4xl md:text-5xl pb-12 md:pb-16 inline-block text-gray-900">
//                   Our Products
//                   <motion.div
//                      initial={{ scaleX: 0 }}
//                      whileInView={{ scaleX: 1 }}
//                      viewport={{ once: true }}
//                      transition={{ duration: 0.8, delay: 0.3 }}
//                      className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
//                   />
//                </h2>
//             </motion.div>

//             {/* Cards Grid */}
//             {!products || products.length === 0 ? (
//                <div className="text-gray-500 py-12">No products found</div>
//             ) : (
//                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 my-10">
//                   {products.map((card) => (
//                      <motion.div key={card.id} variants={cardVariants} whileHover="hover" className="h-full">
//                         <SpotlightCard card={card} />
//                      </motion.div>
//                   ))}
//                </motion.div>
//             )}
//          </div>
//       </section>
//    );
// };

// export default CardSection;

"use client";

import { motion, Variants } from "framer-motion";
import { CardItem } from "@/Types/product.interface";
import { ProductCard } from "./ProductCard";

// ─── Animation Variants ───────────────────────────────────────────────────────

const titleVariants: Variants = {
   hidden: { opacity: 0, y: 32 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const subtitleVariants: Variants = {
   hidden: { opacity: 0, y: 16 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] } },
};

const lineVariants: Variants = {
   hidden: { scaleX: 0, opacity: 0 },
   visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const containerVariants: Variants = {
   hidden: {},
   visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
   hidden: { opacity: 0, y: 40, scale: 0.96 },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
   },
};

// ─── Main Export ──────────────────────────────────────────────────────────────

const CardSection = ({ products }: { products: CardItem[] }) => {
   return (
      <section className="relative py-16 md:py-24 overflow-hidden bg-[#f7f8fc] dark:bg-slate-950">
         <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
            .card-section-root * { font-family: 'DM Sans', sans-serif; }
            .card-section-root h1,
            .card-section-root h2,
            .card-section-root h3 { font-family: 'Sora', sans-serif; }
         `}</style>

         {/* ── Background decoration ── */}
         <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[480px] h-[480px] rounded-full bg-indigo-100/60 dark:bg-indigo-900/20 blur-[96px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-100/50 dark:bg-amber-900/15 blur-[96px]" />
            <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-rose-100/40 dark:bg-rose-900/15 blur-[80px]" />
            <div
               className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
               style={{
                  backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
               }}
            />
         </div>

         <div className="card-section-root container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* ── Header ── */}
            <div className="text-center mb-12 md:mb-16">
               <motion.h2
                  variants={titleVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative inline-block text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight"
               >
                  Featured Products
                  <motion.span
                     variants={lineVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                     className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full origin-left"
                     style={{ background: "linear-gradient(90deg, #6366f1, #f59e0b, #f43f5e)" }}
                  />
               </motion.h2>

               <motion.p variants={subtitleVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-6 text-slate-500 dark:text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                  Explore our curated range of premium products, crafted for quality and style.
               </motion.p>
            </div>

            {/* ── Grid ── */}
            {!products || products.length === 0 ? (
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl">📦</div>
                  <p className="text-slate-400 dark:text-slate-500 font-medium">No products found</p>
               </motion.div>
            ) : (
               <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
                  {products.map((card) => (
                     <motion.div key={card.id} variants={cardVariants} className="h-full">
                        <ProductCard card={card} />
                     </motion.div>
                  ))}
               </motion.div>
            )}
         </div>
      </section>
   );
};

export default CardSection;