"use client"

import type { Metadata } from "next";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Church, Shield, BarChart3, Landmark, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
   title: "Wealth Management | Multi-Generational Financial Stewardship",
   description:
      "Tailored financial solutions for preserving and growing your wealth across generations. Our wealth management experts deliver bespoke portfolio strategies, estate planning, and tax-optimised structures for high-net-worth individuals and families.",
   keywords: ["wealth management", "high net worth", "family office", "estate planning", "portfolio management", "generational wealth", "private banking", "financial planning", "tax optimisation", "asset preservation"],
   openGraph: {
      title: "Wealth Management | Multi-Generational Financial Stewardship",
      description: "Tailored financial solutions for preserving and growing your wealth across generations.",
      type: "website",
      url: "https://yourdomain.com/expertise/wealth-management",
      images: [
         {
            url: "https://yourdomain.com/og/wealth-management.jpg",
            width: 1200,
            height: 630,
            alt: "Wealth Management Expertise",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Wealth Management | Multi-Generational Financial Stewardship",
      description: "Tailored financial solutions for preserving and growing your wealth across generations.",
      images: ["https://yourdomain.com/og/wealth-management.jpg"],
   },
   alternates: {
      canonical: "https://yourdomain.com/expertise/wealth-management",
   },
};

const services = [
   {
      icon: BarChart3,
      title: "Portfolio Architecture",
      body: "Bespoke multi-asset portfolios constructed around your return objectives, risk tolerance, liquidity needs, and investment horizon. No off-the-shelf allocations — every portfolio is purpose-built.",
   },
   {
      icon: Landmark,
      title: "Estate & Legacy Planning",
      body: "Sophisticated structures — trusts, foundations, family offices — designed to transfer wealth across generations with maximum tax efficiency and minimum family friction.",
   },
   {
      icon: Shield,
      title: "Asset Protection",
      body: "Robust legal and financial architectures that insulate your wealth from litigation, political risk, and market volatility, without sacrificing growth potential.",
   },
];

const outcomes = [
   "Average portfolio outperformance of 1.8% vs. benchmark over a 5-year period",
   "Estate transfer strategies covering $2B+ in client assets annually",
   "Tax-optimised structures across 45+ jurisdictions",
   "Family governance frameworks for ultra-high-net-worth dynasties",
   "Dedicated relationship manager with 24/7 senior access",
   "Quarterly portfolio reviews and annual strategic planning sessions",
];

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

export default function WealthManagement() {
   return (
      <main className="min-h-screen bg-[#faf9f7] text-[#1a1a1a] font-['Cormorant_Garamond',Georgia,serif]">
         {/* ── Hero ───────────────────────────────────────────────── */}
         <section className="relative isolate overflow-hidden bg-[#0d0d0d] text-white">
            <div
               aria-hidden
               className="pointer-events-none absolute inset-0 opacity-[0.04]"
               style={{
                  backgroundImage:
                     "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
               }}
            />
            <div aria-hidden className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#bd9520]/60 to-transparent" />
            <div aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#bd9520]/30 to-transparent" />

            {/* Subtle radial glow */}
            <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#bd9520]/5 blur-[120px] rounded-full" />

            <div className="mx-auto max-w-6xl px-6 py-32 md:py-44">
               <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={0}
                  className="inline-flex items-center gap-2 rounded-full border border-[#bd9520]/30 bg-[#bd9520]/10 px-4 py-1.5 text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.2em] text-[#bd9520] mb-8"
               >
                  <Church size={12} />
                  Area of Expertise
               </motion.div>

               <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-light leading-[1.08] tracking-tight max-w-3xl">
                  Wealth <em className="italic text-[#bd9520] not-italic font-semibold">Management</em>
               </motion.h1>

               <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mt-8 max-w-2xl text-lg md:text-xl text-white/65 font-['Montserrat',sans-serif] font-light leading-relaxed">
                  Tailored financial solutions for preserving and growing your wealth across generations. We treat your capital with the care of a trusted custodian and the acuity of a world-class investor.
               </motion.p>

               <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="mt-12 flex flex-wrap gap-4">
                  <Link
                     href="/contact"
                     className="inline-flex items-center gap-2 rounded-full bg-[#bd9520] px-8 py-3.5 text-sm font-['Montserrat',sans-serif] font-semibold text-white shadow-lg shadow-[#bd9520]/20 transition-all duration-300 hover:bg-[#a8841a] hover:gap-3"
                  >
                     Request a Consultation <ArrowRight size={16} />
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

         {/* ── Philosophy ─────────────────────────────────────────── */}
         <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="grid md:grid-cols-2 gap-16 items-start">
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}>
                  <p className="text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.22em] text-[#bd9520] mb-6">Our Philosophy</p>
                  <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                     Wealth is not just <span className="italic text-[#bd9520]">accumulated</span> — it is stewarded
                  </h2>
                  <div className="w-16 h-px bg-[#bd9520]" />
               </motion.div>

               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={1} className="space-y-5 text-[#3a3a3a] font-['Montserrat',sans-serif] font-light leading-relaxed text-[15px]">
                  <p>
                     We believe that true wealth management transcends portfolio optimisation. It is about understanding the values, ambitions, and anxieties of the families and individuals who have built something extraordinary — and designing
                     financial architectures that honour and extend that legacy.
                  </p>
                  <p>
                     Our approach is fiduciary in spirit and forensic in execution. We begin every client relationship with an exhaustive discovery process: understanding not just your assets, but your obligations, your timeline, your family
                     dynamics, and the vision you hold for the generations that follow you.
                  </p>
                  <p>
                     From that foundation, we construct a comprehensive wealth strategy — covering investment management, tax efficiency, estate planning, philanthropy, and governance — that evolves with your life. We do not set and forget. We are
                     active, attentive, and always aligned with your interests.
                  </p>
               </motion.div>
            </div>
         </section>

         {/* ── Services ───────────────────────────────────────────── */}
         <section className="bg-[#0d0d0d] text-white py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
               <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.22em] text-[#bd9520] mb-4 text-center">
                  Core Services
               </motion.p>
               <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-center mb-16">
                  A complete wealth ecosystem
               </motion.h2>

               <div className="grid md:grid-cols-3 gap-8">
                  {services.map((s, i) => (
                     <motion.div
                        key={s.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={fadeUp}
                        custom={i * 0.5}
                        className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-8 transition-all duration-500 hover:border-[#bd9520]/30 hover:bg-white/[0.06]"
                     >
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#bd9520]/10 transition-colors duration-300 group-hover:bg-[#bd9520]/20">
                           <s.icon size={24} color="#bd9520" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold tracking-tight">{s.title}</h3>
                        <p className="text-sm font-['Montserrat',sans-serif] font-light leading-relaxed text-white/60">{s.body}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── Outcomes ───────────────────────────────────────────── */}
         <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                  <p className="text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.22em] text-[#bd9520] mb-6">Track Record</p>
                  <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
                     Measured in <span className="italic text-[#bd9520]">generations</span>
                  </h2>
                  <p className="text-[#3a3a3a] font-['Montserrat',sans-serif] font-light leading-relaxed text-[15px]">
                     Our success is not measured in quarterly returns alone. It is measured in the enduring legacies we help our clients build — and the peace of mind that comes from knowing your wealth is in expert, trustworthy hands.
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
               <h2 className="text-4xl md:text-5xl font-light mb-6">Your legacy deserves a plan.</h2>
               <p className="mb-10 font-['Montserrat',sans-serif] font-light text-white/80 leading-relaxed">Speak confidentially with a senior wealth advisor about your financial future and the legacy you wish to leave.</p>
               <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-['Montserrat',sans-serif] font-semibold text-[#bd9520] shadow-xl transition-all duration-300 hover:gap-3 hover:shadow-2xl">
                  Begin the Conversation <ArrowRight size={16} />
               </Link>
            </motion.div>
         </section>
      </main>
   );
}
