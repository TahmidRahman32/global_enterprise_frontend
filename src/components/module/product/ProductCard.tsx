// // ProductCard.tsx (updated)
// import React from "react";
// import { Printer, Check, Star, Download, Settings } from "lucide-react";

// interface ProductCardProps {
//    title: string;
//    description: string;
//    price: number;
//    period?: "month" | "year";
//    features: string[];
//    badge?: "Popular" | "New" | "Best Value";
//    highlight?: boolean;
//    onTry?: () => void;
//    onCustomize?: () => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ title, description, price, period = "month", features, badge, highlight = false, onTry, onCustomize }) => {
//    return (
//       <div className={`relative group h-full ${highlight ? "col-span-1 md:col-span-2 lg:col-span-1" : ""}`}>
//          {badge && (
//             <div
//                className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg z-10 whitespace-nowrap ${
//                   badge === "Popular" ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white" : badge === "Best Value" ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white" : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
//                }`}
//             >
//                {badge}
//             </div>
//          )}

//          <div
//             className={`
//           h-full p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300
//           ${highlight ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl" : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"}
//           hover:-translate-y-1
//         `}
//          >
//             {/* Icon & Title */}
//             <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
//                <div className="flex items-center space-x-3">
//                   <div className={`p-2.5 sm:p-3 rounded-xl ${highlight ? "bg-blue-600" : "bg-gray-100"}`}>
//                      <Printer className={`w-5 h-5 sm:w-6 sm:h-6 ${highlight ? "text-white" : "text-gray-700"}`} />
//                   </div>
//                   <div>
//                      <h3 className={`text-lg sm:text-xl font-bold ${highlight ? "text-gray-900" : "text-gray-800"}`}>{title}</h3>
//                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{description}</p>
//                   </div>
//                </div>

//                {highlight && (
//                   <div className="flex items-center bg-yellow-50 px-2 py-1 rounded self-start sm:self-auto">
//                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
//                      <span className="ml-1 text-xs sm:text-sm font-medium text-yellow-700">4.8</span>
//                   </div>
//                )}
//             </div>

//             {/* Price */}
//             <div className="mb-4 sm:mb-6">
//                <div className="flex flex-wrap items-baseline gap-1">
//                   <span className="text-2xl sm:text-3xl font-bold text-gray-900">${price}</span>
//                   <span className="text-gray-500 text-sm sm:text-base">/{period}</span>
//                   {period === "year" && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">Save 30%</span>}
//                </div>
//                {period === "month" && <p className="text-xs text-gray-500 mt-1">${Math.round(price * 12 * 0.7)}/year with annual plan</p>}
//             </div>

//             {/* Features */}
//             <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
//                {features.map((feature, idx) => (
//                   <div key={idx} className="flex items-start">
//                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
//                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
//                   </div>
//                ))}
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-2 sm:space-y-3 mt-6 sm:mt-8">
//                <button
//                   onClick={onTry}
//                   className={`
//               w-full py-2.5 sm:py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center text-sm sm:text-base
//               ${highlight ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg" : "bg-gray-900 text-white hover:bg-gray-800"}
//             `}
//                >
//                   <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
//                   Try Free Demo
//                </button>

//                <button
//                   onClick={onCustomize}
//                   className={`
//               w-full py-2 sm:py-2.5 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center text-sm sm:text-base
//               ${highlight ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-50" : "border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600"}
//             `}
//                >
//                   <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
//                   Customize
//                </button>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default ProductCard;

"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import { CardItem } from "@/Types/product.interface";
import Link from "next/link";

// ─── Category Meta ─────────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { text: string; dot: string; accent: string }> = {
   Sticker: { text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-400", accent: "#f59e0b" },
   Clothing: { text: "text-indigo-600 dark:text-indigo-400", dot: "bg-indigo-400", accent: "#6366f1" },
   Ribbon: { text: "text-rose-600 dark:text-rose-400", dot: "bg-rose-400", accent: "#f43f5e" },
   Printer: { text: "text-violet-600 dark:text-violet-400", dot: "bg-violet-400", accent: "#8b5cf6" },
   Other: { text: "text-slate-500 dark:text-slate-400", dot: "bg-slate-400", accent: "#64748b" },
};
const defaultMeta = { text: "text-slate-500 dark:text-slate-400", dot: "bg-slate-400", accent: "#64748b" };

// ─── Tilt Wrapper ─────────────────────────────────────────────────────────────

function TiltCard({ children }: { children: React.ReactNode }) {
   const ref = useRef<HTMLDivElement>(null);
   const x = useMotionValue(0);
   const y = useMotionValue(0);
   const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
   const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });
   const [hovered, setHovered] = useState(false);
   const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
   const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

   const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      x.set((e.clientX - r.left) / r.width - 0.5);
      y.set((e.clientY - r.top) / r.height - 0.5);
   };

   return (
      <motion.div
         ref={ref}
         onMouseMove={handleMouseMove}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => {
            x.set(0);
            y.set(0);
            setHovered(false);
         }}
         style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
         className="relative h-full cursor-pointer"
      >
         {hovered && (
            <div
               className="absolute inset-0 z-10 rounded-2xl pointer-events-none"
               style={{
                  background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.10) 0%, transparent 65%)`,
               }}
            />
         )}
         {children}
      </motion.div>
   );
}

// ─── View Details Modal ───────────────────────────────────────────────────────

// function ViewModal({ card, onClose }: { card: CardItem; onClose: () => void }) {
//    const meta = CATEGORY_META[card.category] ?? defaultMeta;
//    const [imgErr, setImgErr] = useState(false);

//    return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
//          {/* Backdrop */}
//          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

//          {/* Panel */}
//          <motion.div
//             initial={{ opacity: 0, scale: 0.92, y: 24 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.92, y: 24 }}
//             transition={{ type: "spring", stiffness: 260, damping: 22 }}
//             className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-800"
//          >
//             {/* Image */}
//             <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
//                <img src={imgErr ? "https://placehold.co/600x300/e2e8f0/94a3b8?text=No+Image" : card.picture} alt={card.name} onError={() => setImgErr(true)} className="w-full h-full object-cover" />
//                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

//                {/* Close */}
//                <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition">
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                      <line x1="18" y1="6" x2="6" y2="18" />
//                      <line x1="6" y1="6" x2="18" y2="18" />
//                   </svg>
//                </button>

//                {/* Status */}
//                <div className="absolute bottom-3 right-3">
//                   <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${card.isActive ? "bg-emerald-500/90 text-white" : "bg-white/80 text-slate-500 border border-slate-200"}`}>
//                      <span className={`w-1.5 h-1.5 rounded-full ${card.isActive ? "bg-white animate-pulse" : "bg-slate-400"}`} />
//                      {card.isActive ? "Active" : "Inactive"}
//                   </span>
//                </div>
//             </div>

//             {/* Body */}
//             <div className="p-5 space-y-4">
//                {/* Name + category */}
//                <div className="flex items-start justify-between gap-2">
//                   <div>
//                      <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{card.name}</h3>
//                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wider font-medium">{card.brand}</p>
//                   </div>
//                   <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${meta.text} shrink-0`}>
//                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
//                      {card.category}
//                   </span>
//                </div>

//                {/* Description */}
//                {card.description && <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{card.description}</p>}

//                {/* Stats grid */}
//                <div className="grid grid-cols-2 gap-2.5">
//                   {[
//                      ["Price", `৳ ${card.price.toLocaleString()}`],
//                      ["Stock", card.stock === 0 ? "Out of Stock" : String(card.stock)],
//                      ["SKU", card.sku],
//                      ["Order ID", card.id.slice(0, 14) + "…"],
//                      ["Created", new Date(card.createdAt).toLocaleDateString()],
//                      ["Updated", new Date(card.updatedAt).toLocaleDateString()],
//                   ].map(([label, val]) => (
//                      <div key={label} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
//                         <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium mb-0.5">{label}</p>
//                         <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{val}</p>
//                      </div>
//                   ))}
//                </div>

//                {/* Close CTA */}
//                <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.97 }}
//                   onClick={onClose}
//                   className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
//                   style={{ background: `linear-gradient(135deg, ${meta.accent}dd, ${meta.accent})` }}
//                >
//                   Close
//                </motion.button>
//             </div>
//          </motion.div>
//       </motion.div>
//    );
// }

// ─── Product Card ─────────────────────────────────────────────────────────────

export function ProductCard({ card }: { card: CardItem }) {
   const meta = CATEGORY_META[card.category] ?? defaultMeta;
   const [imgErr, setImgErr] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [imgHovered, setImgHovered] = useState(false);

   return (
      <>
         <TiltCard>
            <div
               className="relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-shadow duration-300 hover:shadow-xl dark:hover:shadow-slate-900/60"
               style={{ boxShadow: "0 4px 24px 0 rgba(80,80,120,0.07), 0 1.5px 4px rgba(80,80,120,0.04)" }}
            >
               {/* ── Image ── */}
               <div className="relative overflow-hidden h-52 shrink-0 bg-slate-100 dark:bg-slate-800" onMouseEnter={() => setImgHovered(true)} onMouseLeave={() => setImgHovered(false)}>
                  <motion.img
                     src={imgErr ? "https://placehold.co/600x400/e8eaf0/94a3b8?text=No+Image" : card.picture}
                     alt={card.name}
                     onError={() => setImgErr(true)}
                     className="w-full h-full object-cover"
                     animate={{ scale: imgHovered ? 1.09 : 1 }}
                     transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />

                  {/* Gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  {/* Zoom hint overlay */}
                  <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: imgHovered ? 1 : 0 }} transition={{ duration: 0.2 }}>
                     <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                           <circle cx="11" cy="11" r="8" />
                           <line x1="21" y1="21" x2="16.65" y2="16.65" />
                           <line x1="11" y1="8" x2="11" y2="14" />
                           <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                     </div>
                  </motion.div>

                  {/* Status pill */}
                  <div className="absolute top-3 right-3">
                     <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${card.isActive ? "bg-emerald-500/90 text-white" : "bg-white/80 dark:bg-slate-800/80 text-slate-500 border border-slate-200 dark:border-slate-700"}`}
                     >
                        <span className={`w-1.5 h-1.5 rounded-full ${card.isActive ? "bg-white animate-pulse" : "bg-slate-400"}`} />
                        {card.isActive ? "Active" : "Inactive"}
                     </span>
                  </div>

                  {/* Category pill */}
                  <div className="absolute bottom-3 left-3">
                     <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md bg-white/90 dark:bg-slate-900/80 border border-white/60 dark:border-slate-700 ${meta.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                        {card.category}
                     </span>
                  </div>
               </div>

               {/* ── Content ── */}
               <div className="flex flex-col flex-1 p-5 gap-3">
                  {/* Name + Brand */}
                  <div>
                     <h3 className="font-bold text-slate-800 dark:text-white text-base leading-snug line-clamp-1 tracking-tight">{card.name}</h3>
                     <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium uppercase tracking-wider">{card.brand}</p>
                  </div>

                  {/* Description */}
                  {/* {card.description && <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{card.description}</p>} */}

                  {/* Divider */}
                  <div className="h-px bg-slate-100 dark:bg-slate-800" />

                  {/* Price + Stock */}
                  <div className="flex items-center justify-between gap-2">
                     <div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mb-0.5">Price</p>
                        <p className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">৳ {card.price.toLocaleString()}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mb-0.5">Stock</p>
                        <span
                           className={`inline-block text-sm font-bold px-2.5 py-0.5 rounded-lg ${
                              card.stock === 0
                                 ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                                 : card.stock <= 5
                                   ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                                   : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                           }`}
                        >
                           {card.stock === 0 ? "Out" : card.stock}
                        </span>
                     </div>
                  </div>

                  {/* SKU */}
                  <p className="text-[11px] font-mono text-slate-300 dark:text-slate-600 truncate">{card.sku}</p>

                  {/* CTA */}
                  <Link href={`/product/${card?.id}`}>
                     {" "}
                     <motion.button
                        whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${meta.accent}44` }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowModal(true)}
                        className="mt-auto w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                        style={{ background: `linear-gradient(135deg, ${meta.accent}dd, ${meta.accent})` }}
                     >
                        View Details
                     </motion.button>
                  </Link>
               </div>

               {/* Left accent bar */}
               <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full" style={{ background: `linear-gradient(to bottom, transparent, ${meta.accent}88, transparent)` }} />
            </div>
         </TiltCard>

         {/* Modal */}
         {/* {showModal && <ViewModal card={card} onClose={() => setShowModal(false)} />} */}
      </>
   );
}