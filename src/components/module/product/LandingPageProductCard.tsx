"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// Type Definitions

interface Product {
   id: string | number;
   name: string;
   price: number;
   picture: string;
   description?: string;
}

interface OurProductsProps {
   products?: Product[]; // optional external data, fallback to example products
   onExploreClick?: () => void; // optional custom handler for the button
}

// Product Card Component (with individual animations)

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
   return (
      <motion.div
         initial={{ opacity: 0, y: 40 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-50px" }}
         transition={{ duration: 0.5, delay: index * 0.1 }}
         whileHover={{ y: -8, transition: { type: "spring", stiffness: 400 } }}
         className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      >
         {/* Image container */}
         <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
            <Image src={product?.picture} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
         </div>

         {/* Card content */}
         <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
            {product.description && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>}
            <div className="mt-3 flex items-center justify-between">
               <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
               <button className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-700">Shop Now</button>
            </div>
         </div>
      </motion.div>
   );
};

// Main Component

export default function OurProducts({ products }: OurProductsProps) {
   // If more than 4 products are provided, we show only the first 4 as requested.
   const displayedProducts = products?.slice(0, 4) || [];

   // Header animation
   const headerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
   };

   return (
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={headerVariants} className="text-center mb-12 md:mb-16">
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Our Products</h2>
               <div className="mt-2 h-1 w-20 bg-gray-900 rounded mx-auto" />
               <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Crafted with passion, designed for your everyday life.</p>
            </motion.div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
               {displayedProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
               ))}
            </div>

            {/* Explore More Button */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="flex justify-center mt-12 md:mt-16">
               <Link href={"/product"}>
                  <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-900 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                     <span className="relative">Explore More</span>
                     <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                  </button>
               </Link>
            </motion.div>
         </div>
      </section>
   );
}
