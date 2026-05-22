

"use client";

import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { FALLBACK, Product } from "./FallBackData";
import { ProductCard } from "./ProductCard";


interface OurProductsProps {
   products?: Product[];
}

const CARD_WIDTH = 320;
const CARD_GAP = 28;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const AUTO_DELAY = 3200;
const DRAG_BUFFER = 40;

export default function OurProducts({ products }: OurProductsProps) {
   const items = products?.length ? products : FALLBACK;
   // Triple the items for seamless infinite illusion
   const looped = [...items, ...items, ...items];
   const total = looped.length;

   const trackRef = useRef<HTMLDivElement>(null);
   const x = useMotionValue(0);
   const [activeIdx, setActiveIdx] = useState(items.length); // start in the middle copy
   const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
   const isUserDrag = useRef(false);

   const clampedTarget = useCallback((idx: number) => {
      return -(idx * CARD_STEP);
   }, []);

   const goTo = useCallback(
      (idx: number, instant = false) => {
         const target = clampedTarget(idx);
         if (instant) {
            x.set(target);
         } else {
            animate(x, target, { type: "spring", stiffness: 220, damping: 28, mass: 0.8 });
         }
         setActiveIdx(idx);
      },
      [x, clampedTarget],
   );

   useEffect(() => {
      const unsubscribe = x.on("animationComplete", () => {
         if (activeIdx < items.length) {
            goTo(activeIdx + items.length, true);
         } else if (activeIdx >= items.length * 2) {
            goTo(activeIdx - items.length, true);
         }
      });
      return unsubscribe;
   }, [x, activeIdx, items.length, goTo]);

   const scheduleAuto = useCallback(() => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
      autoTimer.current = setTimeout(() => {
         if (!isUserDrag.current) goTo(activeIdx + 1);
      }, AUTO_DELAY);
   }, [activeIdx, goTo]);

   useEffect(() => {
      scheduleAuto();
      return () => {
         if (autoTimer.current) clearTimeout(autoTimer.current);
      };
   }, [scheduleAuto]);

   const dragStart = useRef(0);
   const dragStartX = useRef(0);

   const onPointerDown = (e: React.PointerEvent) => {
      isUserDrag.current = true;
      dragStart.current = e.clientX;
      dragStartX.current = x.get();
      trackRef.current?.setPointerCapture(e.pointerId);
   };

   const onPointerMove = (e: React.PointerEvent) => {
      if (!isUserDrag.current) return;
      const delta = e.clientX - dragStart.current;
      x.set(dragStartX.current + delta);
   };

   const onPointerUp = (e: React.PointerEvent) => {
      if (!isUserDrag.current) return;
      isUserDrag.current = false;
      const delta = e.clientX - dragStart.current;
      if (Math.abs(delta) > DRAG_BUFFER) {
         goTo(delta < 0 ? activeIdx + 1 : activeIdx - 1);
      } else {
         goTo(activeIdx);
      }
   };

   const realIdx = ((activeIdx % items.length) + items.length) % items.length;
   const goToReal = (i: number) => goTo(i + items.length);

   return (
      <section className="relative w-full overflow-hidden bg-[#080808] py-20 md:py-28">
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
               backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
         />
         {/* Radial glow */}
         <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#bd9520]/6 blur-[120px] rounded-full" />

         {/* ── Header ── */}
         <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative text-center mb-14">
            <p className="text-[10px] font-['Montserrat',sans-serif] uppercase tracking-[0.28em] text-[#bd9520] mb-4">Curated Collection</p>
            <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-5xl md:text-6xl font-light text-white inline-block relative">
               Our Products
               <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 block h-px w-28 bg-gradient-to-r from-transparent via-[#bd9520] to-transparent origin-center"
               />
            </h2>
         </motion.div>

         <div className="relative">
            <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[#080808] to-transparent" />
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[#080808] to-transparent" />

            <div ref={trackRef} className="cursor-grab active:cursor-grabbing touch-none overflow-hidden px-8" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>
               <motion.div style={{ x }} className="flex" initial={false}>
                  {looped.map((product, i) => (
                     <div key={`${product.id}-${i}`} style={{ marginRight: CARD_GAP }}>
                        <ProductCard product={product} />
                     </div>
                  ))}
               </motion.div>
            </div>
         </div>

         <div className="mt-10 flex items-center justify-center gap-2.5">
            {items.map((_, i) => (
               <button key={i} onClick={() => goToReal(i)} aria-label={`Go to slide ${i + 1}`} className="group relative flex items-center justify-center">
                  <span className={`block rounded-full transition-all duration-400 ${i === realIdx ? "w-8 h-1.5 bg-[#bd9520]" : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40"}`} />
               </button>
            ))}
         </div>
         <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-12 flex justify-center">
            <Link href="/product">
               <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#bd9520]/40 px-10 py-3.5 font-['Montserrat',sans-serif] text-sm font-semibold uppercase tracking-[0.14em] text-[#bd9520] transition-all duration-300 hover:border-[#bd9520] hover:text-white">
                  <span className="absolute inset-0 -translate-x-full bg-[#bd9520] transition-transform duration-300 ease-out group-hover:translate-x-0" />
                  <span className="relative">Explore All Products</span>
                  <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
               </button>
            </Link>
         </motion.div>
      </section>
   );
}
