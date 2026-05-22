import { motion, Variants } from "framer-motion";
import React from "react";
import Link from "next/link";
import { Quote, Search, FileCheck, AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";
import { Metadata } from "next";

const capabilities = [
   {
      icon: Search,
      title: "Enterprise Risk Assessment",
      body: "A systematic, board-level view of all risks facing your organisation — operational, financial, strategic, reputational, and cyber. We quantify the unquantified so leadership can act with confidence.",
   },
   {
      icon: FileCheck,
      title: "Regulatory Compliance",
      body: "Navigating an increasingly complex global regulatory environment demands specialist knowledge. We map your obligations, identify gaps, and implement compliance frameworks that become a competitive advantage.",
   },
   {
      icon: AlertTriangle,
      title: "Crisis Preparedness",
      body: "The best crisis management begins long before a crisis occurs. We design and stress-test response protocols, communication strategies, and recovery playbooks tailored to your specific risk profile.",
   },
];

const outcomes = [
   "Risk frameworks deployed for 200+ organisations across 30 industries",
   "Average regulatory penalty reduction of 65% post-engagement",
   "Crisis simulations conducted for boards of FTSE 100 and Fortune 500 companies",
   "ISO 31000-aligned risk management systems",
   "24-hour rapid response capability for emerging risk events",
   "Independent assurance reporting for audit committees and regulators",
];

export const metadata: Metadata = {
   title: "Risk Assurance | Comprehensive Business Risk Management",
   description: "Comprehensive risk assessment and mitigation strategies to protect your business interests. Our risk assurance practice covers operational, financial, reputational, and regulatory risk across all sectors and geographies.",
   keywords: ["risk assurance", "risk management", "business risk", "risk assessment", "compliance", "regulatory risk", "operational risk", "enterprise risk management", "risk mitigation", "due diligence"],
   openGraph: {
      title: "Risk Assurance | Comprehensive Business Risk Management",
      description: "Comprehensive risk assessment and mitigation strategies to protect your business interests.",
      type: "website",
      url: "https://yourdomain.com/expertise/risk-assurance",
      images: [
         {
            url: "https://yourdomain.com/og/risk-assurance.jpg",
            width: 1200,
            height: 630,
            alt: "Risk Assurance Expertise",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Risk Assurance | Comprehensive Business Risk Management",
      description: "Comprehensive risk assessment and mitigation strategies to protect your business interests.",
      images: ["https://yourdomain.com/og/risk-assurance.jpg"],
   },
   alternates: {
      canonical: "https://yourdomain.com/expertise/risk-assurance",
   },
};

const riskTypes = [
   { label: "Operational", pct: 92 },
   { label: "Financial", pct: 88 },
   { label: "Regulatory", pct: 95 },
   { label: "Reputational", pct: 85 },
   { label: "Cyber & Technology", pct: 78 },
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
const RiskAssurance = () => {
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
            <div aria-hidden className="absolute -top-40 right-1/4 w-[500px] h-[400px] bg-[#bd9520]/4 blur-[120px] rounded-full" />

            <div className="mx-auto max-w-6xl px-6 py-32 md:py-44">
               <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={0}
                  className="inline-flex items-center gap-2 rounded-full border border-[#bd9520]/30 bg-[#bd9520]/10 px-4 py-1.5 text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.2em] text-[#bd9520] mb-8"
               >
                  <Quote size={12} />
                  Area of Expertise
               </motion.div>

               <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-light leading-[1.08] tracking-tight max-w-3xl">
                  Risk <em className="italic text-[#bd9520] not-italic font-semibold">Assurance</em>
               </motion.h1>

               <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mt-8 max-w-2xl text-lg md:text-xl text-white/65 font-['Montserrat',sans-serif] font-light leading-relaxed">
                  Comprehensive risk assessment and mitigation strategies to protect your business interests. In an uncertain world, certainty of preparation is the ultimate competitive advantage.
               </motion.p>

               <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="mt-12 flex flex-wrap gap-4">
                  <Link
                     href="/contact"
                     className="inline-flex items-center gap-2 rounded-full bg-[#bd9520] px-8 py-3.5 text-sm font-['Montserrat',sans-serif] font-semibold text-white shadow-lg shadow-[#bd9520]/20 transition-all duration-300 hover:bg-[#a8841a] hover:gap-3"
                  >
                     Assess Your Risk Exposure <ArrowRight size={16} />
                  </Link>
                  <Link
                     href="/expertise"
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
                  <p className="text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.22em] text-[#bd9520] mb-6">Why Risk Assurance</p>
                  <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                     Confidence comes from <span className="italic text-[#bd9520]">knowing your exposure</span>
                  </h2>
                  <div className="w-16 h-px bg-[#bd9520]" />
               </motion.div>

               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={1} className="space-y-5 text-[#3a3a3a] font-['Montserrat',sans-serif] font-light leading-relaxed text-[15px]">
                  <p>
                     Every organisation operates in a landscape of risk. The question is never whether risk exists, but whether it has been identified, measured, and managed to an acceptable level. Our risk assurance practice exists to give boards,
                     executives, and shareholders that assurance — with rigour, independence, and depth.
                  </p>
                  <p>
                     We combine quantitative modelling with qualitative insight to produce a complete picture of risk across your enterprise. Our assessments draw on proprietary risk databases, regulatory intelligence feeds, and a team of specialists
                     spanning finance, law, cyber security, geopolitics, and operational management.
                  </p>
                  <p>
                     Risk is not a problem to be eliminated — it is a dynamic to be managed. We help you build organisations that are genuinely resilient: capable of absorbing shocks, adapting to change, and emerging from disruption stronger than
                     before.
                  </p>
               </motion.div>
            </div>
         </section>

         {/* ── Risk Coverage Visual ───────────────────────────────── */}
         <section className="bg-[#f4f1eb] py-20">
            <div className="mx-auto max-w-4xl px-6">
               <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.22em] text-[#bd9520] mb-4 text-center">
                  Coverage Depth
               </motion.p>
               <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-light text-center mb-14">
                  Risk domains we cover
               </motion.h2>
               <div className="space-y-6">
                  {riskTypes.map((r, i) => (
                     <motion.div key={r.label} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="flex items-center gap-6">
                        <span className="w-36 shrink-0 text-sm font-['Montserrat',sans-serif] font-medium text-[#1a1a1a]">{r.label}</span>
                        <div className="flex-1 h-2 bg-[#e5dfc8] rounded-full overflow-hidden">
                           <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${r.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                              className="h-full bg-gradient-to-r from-[#bd9520] to-[#e0b92a] rounded-full"
                           />
                        </div>
                        <span className="w-10 shrink-0 text-right text-sm font-['Montserrat',sans-serif] text-[#bd9520] font-semibold">{r.pct}%</span>
                     </motion.div>
                  ))}
               </div>
               <p className="mt-6 text-center text-xs font-['Montserrat',sans-serif] text-[#888] italic">Percentage represents assessed coverage completeness per domain</p>
            </div>
         </section>

         {/* ── Capabilities ───────────────────────────────────────── */}
         <section className="bg-[#0d0d0d] text-white py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
               <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.22em] text-[#bd9520] mb-4 text-center">
                  Core Capabilities
               </motion.p>
               <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-light text-center mb-16">
                  Built for resilience at every level
               </motion.h2>

               <div className="grid md:grid-cols-3 gap-8">
                  {capabilities.map((c, i) => (
                     <motion.div
                        key={c.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={fadeUp}
                        custom={i * 0.5}
                        className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-8 transition-all duration-500 hover:border-[#bd9520]/30 hover:bg-white/[0.06]"
                     >
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#bd9520]/10 transition-colors duration-300 group-hover:bg-[#bd9520]/20">
                           <c.icon size={24} color="#bd9520" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold tracking-tight">{c.title}</h3>
                        <p className="text-sm font-['Montserrat',sans-serif] font-light leading-relaxed text-white/60">{c.body}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── Outcomes ───────────────────────────────────────────── */}
         <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                  <p className="text-xs font-['Montserrat',sans-serif] uppercase tracking-[0.22em] text-[#bd9520] mb-6">Our Impact</p>
                  <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
                     Protecting what <span className="italic text-[#bd9520]">matters most</span>
                  </h2>
                  <p className="text-[#3a3a3a] font-['Montserrat',sans-serif] font-light leading-relaxed text-[15px]">
                     Our risk assurance engagements have shielded clients from billions in potential losses, regulatory sanctions, and reputational damage. Here is what that looks like in practice.
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
               <h2 className="text-4xl md:text-5xl font-light mb-6">Know your risk. Own your future.</h2>
               <p className="mb-10 font-['Montserrat',sans-serif] font-light text-white/80 leading-relaxed">Commission a confidential enterprise risk assessment from our senior advisory team. Clarity is one conversation away.</p>
               <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-['Montserrat',sans-serif] font-semibold text-[#bd9520] shadow-xl transition-all duration-300 hover:gap-3 hover:shadow-2xl">
                  Begin the Conversation <ArrowRight size={16} />
               </Link>
            </motion.div>
         </section>
      </main>
   );
};

export default RiskAssurance;
