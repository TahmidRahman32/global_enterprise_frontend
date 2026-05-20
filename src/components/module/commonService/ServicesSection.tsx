"use client";
import React from "react";
import { motion } from "framer-motion";
import { Barcode, Printer, Package, Zap, Hash, Layers, Settings, Star } from "lucide-react";

interface Service {
   icon: IconName;
   title: string;
   description: string;
}


export const ICON_MAP = {
   Zap,
   Printer,
   Package,
   Settings,
   Star,
   Barcode,
   Hash,
   Layers,
} as const;
export type IconName = keyof typeof ICON_MAP;

// Animation variants
const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.15,
         delayChildren: 0.3,
      },
   },
};

const itemVariants = {
   hidden: { y: 30, opacity: 0 },
   visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
   },
};

const ServicesSection= ({ services }: { services: Service[] }) => {
   
   return (
      <section className="bg-gradient-to-b dark:from-black to-blue-950 py-16 md:py-24 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header with animation */}
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-12">
               <h2 className="text-3xl  md:text-5xl lg:text-6xl font-bold text-foreground  z-10 mb-4">
                  Barcode Label <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 ">Printing Services</span>
               </h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">From design to delivery – we provide end‑to‑end barcode label solutions for businesses of all sizes.</p>
            </motion.div>

            {/* Service Grid with staggered animations */}
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {/* {services.map((service, index) => (
                  
                  <motion.div
                     key={index}
                     variants={itemVariants}
                     whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.15)" }}
                     className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100/80 hover:border-blue-200/50"
                  >
                     
                     <div className="flex items-center justify-center w-16 h-16 bg-blue-50 group-hover:bg-blue-100 rounded-full mb-5 transition-colors duration-200">{}</div>
                     <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                     <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </motion.div>
               ))} */}
               {services.map((service, index) => {
                  const Icon = ICON_MAP[service?.icon];

                  return (
                     <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.15)" }}
                        className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100/80 hover:border-blue-200/50"
                     >
                        <div className="flex items-center justify-center w-16 h-16 bg-blue-50 group-hover:bg-blue-100 rounded-full mb-5 transition-colors duration-200">
                           {Icon ? <Icon className="w-6 h-6 text-blue-600" /> : <Package className="w-6 h-6 text-gray-400" />}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>

                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                     </motion.div>
                  );
               })}
            </motion.div>

            {/* Optional CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.5 }} className="text-center mt-12">
               <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
               >
                  Get a Quote
               </a>
            </motion.div>
         </div>
      </section>
   );
};

export default ServicesSection;
