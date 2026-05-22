"use client";
import type { Metadata } from "next";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Aperture, Globe, TrendingUp, Users, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
   title: "Global Strategy | Expert International Market Navigation",
   description:
      "Navigate complex international markets with precision and foresight. Our global strategy experts build bridges across continents, delivering tailored solutions for cross-border growth, market entry, and sustainable international expansion.",
   keywords: ["global strategy", "international markets", "cross-border business", "market entry strategy", "international expansion", "global consulting", "multinational strategy", "foreign market analysis"],
   openGraph: {
      title: "Global Strategy | Expert International Market Navigation",
      description: "Navigate complex international markets with precision and foresight. We build bridges across continents for sustainable international growth.",
      type: "website",
      url: "https://yourdomain.com/expertise/global-strategy",
      images: [
         {
            url: "https://yourdomain.com/og/global-strategy.jpg",
            width: 1200,
            height: 630,
            alt: "Global Strategy Expertise",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Global Strategy | Expert International Market Navigation",
      description: "Navigate complex international markets with precision and foresight.",
      images: ["https://yourdomain.com/og/global-strategy.jpg"],
   },
   alternates: {
      canonical: "https://yourdomain.com/expertise/global-strategy",
   },
};

const pillars = [
   {
      icon: Globe,
      title: "Market Intelligence",
      body: "Deep-dive research into geopolitical landscapes, regulatory environments, and consumer dynamics across 60+ countries. We translate complexity into actionable clarity.",
   },
   {
      icon: TrendingUp,
      title: "Entry & Expansion",
      body: "From greenfield ventures to strategic acquisitions, we architect your international footprint — selecting optimal structures, partners, and timelines for maximum impact.",
   },
   {
      icon: Users,
      title: "Cross-Cultural Leadership",
      body: "Success across borders demands cultural fluency. We equip your leadership teams with the frameworks and mindsets to operate effectively in diverse markets.",
   },
];

const outcomes = [
   "Reduced time-to-market in new geographies by up to 40%",
   "Regulatory navigation across 60+ jurisdictions",
   "Access to a curated network of 1,200+ regional partners",
   "Bespoke market entry roadmaps with milestone accountability",
   "Ongoing geopolitical risk monitoring and scenario planning",
   "C-suite advisory retainers for sustained strategic alignment",
];

// const fadeUp = {
//    hidden: { opacity: 0, y: 32 },
//    visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
//    }),
// };
const fadeUp: Variants = {
   hidden: { opacity: 0, y: 32 },
   visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.6,
         delay: i * 0.12,
         ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
   }),
};

export default function GlobalStrategy() {
   return (
      <main className="min-h-screen bg-[#faf9f7] text-[#1a1a1a] font-['Cormorant_Garamond',Georgia,serif]">
         {/* ── Hero ───────────────────────────────────────────────── */}
         <section className="relative isolate overflow-hidden bg-[#0d0d0d] text-white">
            {/* Grain overlay */}
            <div
               aria-hidden
               className="pointer-events-none absolute inset-0 opacity-[0.04]"
               style={{
                  backgroundImage:
                     "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
               }}
            />
            {/* Gold accent lines */}
            <div aria-hidden className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#bd9520]/60 to-transparent" />
            <div aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#bd9520]/30 to-transparent" />

            <div className="mx-auto max-w-6xl px-6 py-32 md:py-44">
               <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={0}
                  className="inline-flex items-center gap-2 rounded-full border border-[#bd9520]/30 bg-[#bd9520]/10 px-4 py-1.5 text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.2em] text-[#bd9520] mb-8"
               >
                  <Aperture size={12} />
                  Area of Expertise
               </motion.div>

               <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-light leading-[1.08] tracking-tight max-w-3xl">
                  Global <em className="italic text-[#bd9520] not-italic font-semibold">Strategy</em>
               </motion.h1>

               <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mt-8 max-w-2xl text-lg md:text-xl text-white/65 font-['Montserrat',sans-serif] font-light leading-relaxed">
                  Navigating complex international markets with precision and foresight. We build bridges across continents — connecting ambition with execution at the highest level of global commerce.
               </motion.p>

               <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="mt-12 flex flex-wrap gap-4">
                  <Link
                     href="/contact"
                     className="inline-flex items-center gap-2 rounded-full bg-[#bd9520] px-8 py-3.5 text-sm font-['Montserrat',sans-serif] font-semibold text-white shadow-lg shadow-[#bd9520]/20 transition-all duration-300 hover:bg-[#a8841a] hover:gap-3"
                  >
                     Engage Our Team <ArrowRight size={16} />
                  </Link>
                  <Link
                     href="/"
                     className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-['Montserrat',sans-serif] font-medium text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
                  >
                     <ArrowRight size={16} className="rotate-180" /> Back to Home
                  </Link>
               </motion.div>
            </div>
         </section>

         {/* ── Overview ───────────────────────────────────────────── */}
         <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="grid md:grid-cols-2 gap-16 items-start">
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}>
                  <p className="text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.22em] text-[#bd9520] mb-6">Our Approach</p>
                  <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                     Strategy without borders, <span className="italic text-[#bd9520]">results without limits</span>
                  </h2>
                  <div className="w-16 h-px bg-[#bd9520]" />
               </motion.div>

               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={1} className="space-y-5 text-[#3a3a3a] font-['Montserrat',sans-serif] font-light leading-relaxed text-[15px]">
                  <p>
                     In an era of accelerating globalisation and mounting geopolitical complexity, the difference between market leaders and laggards often comes down to one thing: the quality of their global strategy. We have spent two decades
                     refining a methodology that blends rigorous data analysis with on-the-ground intelligence, giving our clients a decisive edge in every market they enter.
                  </p>
                  <p>
                     Our global strategy practice serves sovereign wealth funds, Fortune 500 multinationals, and ambitious mid-market enterprises alike. Whether you are exploring your first international expansion or optimising a mature global
                     portfolio, we bring the same level of intellectual rigour and senior attention to every engagement.
                  </p>
                  <p>
                     We do not deal in generic frameworks. Every recommendation is built from first principles, calibrated to your specific industry dynamics, risk appetite, and long-term vision — then tested against the realities of local markets by
                     advisors who live and operate within them.
                  </p>
               </motion.div>
            </div>
         </section>

         {/* ── Three Pillars ──────────────────────────────────────── */}
         <section className="bg-[#0d0d0d] text-white py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
               <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.22em] text-[#bd9520] mb-4 text-center">
                  Core Capabilities
               </motion.p>
               <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-center mb-16">
                  Three pillars of global mastery
               </motion.h2>

               <div className="grid md:grid-cols-3 gap-8">
                  {pillars.map((p, i) => (
                     <motion.div
                        key={p.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={fadeUp}
                        custom={i * 0.5}
                        className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-8 transition-all duration-500 hover:border-[#bd9520]/30 hover:bg-white/[0.06]"
                     >
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#bd9520]/10 transition-colors duration-300 group-hover:bg-[#bd9520]/20">
                           <p.icon size={24} color="#bd9520" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold tracking-tight">{p.title}</h3>
                        <p className="text-sm font-['Montserrat',sans-serif] font-light leading-relaxed text-white/60">{p.body}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── Outcomes ───────────────────────────────────────────── */}
         <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                  <p className="text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.22em] text-[#bd9520] mb-6">Client Outcomes</p>
                  <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
                     What our clients <span className="italic text-[#bd9520]">achieve</span>
                  </h2>
                  <p className="text-[#3a3a3a] font-['Montserrat',sans-serif] font-light leading-relaxed text-[15px]">
                     Every engagement is measured against tangible outcomes. We hold ourselves accountable not just for the quality of our thinking, but for the results our clients realise in the field.
                  </p>
               </motion.div>

               <motion.ul initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="space-y-4">
                  {outcomes.map((item, i) => (
                     <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        className="flex items-start gap-3 text-[#3a3a3a] font-['Montserrat',sans-serif] font-light text-sm leading-relaxed"
                     >
                        <CheckCircle size={17} className="mt-0.5 shrink-0 text-[#bd9520]" />
                        {item}
                     </motion.li>
                  ))}
               </motion.ul>
            </div>
         </section>

         {/* ── CTA ────────────────────────────────────────────────── */}
         <section className="bg-gradient-to-br from-[#bd9520] to-[#a8841a] py-20 text-white text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mx-auto max-w-2xl px-6">
               <h2 className="text-4xl md:text-5xl font-light mb-6">Ready to go global?</h2>
               <p className="mb-10 font-['Montserrat',sans-serif] font-light text-white/80 leading-relaxed">Schedule a confidential strategy consultation with one of our senior international advisors.</p>
               <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-['Montserrat',sans-serif] font-semibold text-[#bd9520] shadow-xl transition-all duration-300 hover:gap-3 hover:shadow-2xl">
                  Begin the Conversation <ArrowRight size={16} />
               </Link>
            </motion.div>
         </section>
      </main>
   );
}
