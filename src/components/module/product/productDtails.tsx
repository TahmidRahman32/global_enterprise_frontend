"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CardItem } from "@/Types/product.interface";
import OrderSheetDialog from "../order/OrderFrom";
import { Button } from "@/components/ui/button";

// ============================================================================
// Helper Functions
// ============================================================================

const formatDate = (dateString: string): string => {
   return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
   });
};

const formatPrice = (price: number): string => {
   return new Intl.NumberFormat("BDT", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
   }).format(price);
};

// ============================================================================
// Main Component
// ============================================================================

export default function ProductDetails({ product }: { product: CardItem }) {
   const [imageError, setImageError] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

   // Derived values
   const isInStock = product.stock > 0;
   const isLowStock = product.stock > 0 && product.stock <= 5;
   const imageSrc = !imageError && product.picture ? product.picture : "/placeholder-product.svg";

   // Animation variants
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { type: "spring" as const, stiffness: 300, damping: 24 },
      },
   };

   const imageVariants = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
         opacity: 1,
         scale: 1,
         transition: { type: "spring" as const, stiffness: 400, damping: 30 },
      },
      hover: {
         scale: 1.02,
         transition: { type: "spring" as const, stiffness: 400, damping: 10 },
      },
   };

   return (
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full min-h-screen  bg-gradient-to-br from-gray-50 dark:from-gray-800 to-white px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
         <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-shadow duration-300 hover:shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-12">
               {/* Image Section - smaller on desktop, no badges overlay */}
               <motion.div variants={imageVariants} whileHover="hover" className="relative bg-gray-50 p-6 sm:p-8 flex items-center justify-center">
                  <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-xl bg-gray-100 shadow-md">
                     <Image src={imageSrc} alt={product.name} fill className="object-cover" sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 30vw" priority onError={() => setImageError(true)} />
                  </div>
               </motion.div>

               {/* Details Section */}
               <div className="flex flex-col p-6 sm:p-8 lg:p-10 lg:pr-8">
                  {/* Brand & Category Row */}
                  <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-4">
                     {product.brand && <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">{product.brand}</span>}
                     {product.category ? (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">{product.category}</span>
                     ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">Uncategorized</span>
                     )}
                  </motion.div>

                  {/* Product Name */}
                  <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                     {product.name}
                  </motion.h1>

                  {/* Price and Badges Row */}
                  <motion.div variants={itemVariants} className="mb-4">
                     <div className="flex flex-wrap items-baseline gap-3">
                        <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                        <span className="text-sm text-gray-500">BDT</span>
                     </div>

                     {/* Badges (Active & In Stock) placed below the price */}
                     <div className="flex flex-wrap gap-2 mt-3">
                        {product.isActive && <span className="inline-flex items-center rounded-full text-blue-100 px-3 py-1 text-xs font-semibold bg-blue-700">Active</span>}
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${isInStock ? "text-green-100 bg-green-700 " : "bg-red-100 text-red-700"}`}>{isInStock ? "In Stock" : "Out of Stock"}</span>
                     </div>
                  </motion.div>

                  {/* Stock Info (units available, low stock warning) */}
                  {isInStock && (
                     <motion.div variants={itemVariants} className="mb-6">
                        <div className="flex items-center gap-2 text-lg bg-">
                           <span className="font-medium text-gray-700">Availability:</span>
                           <span className="text-green-700 font-medium">{product.stock} units</span>
                           {isLowStock && <span className="text-amber-600 text-xs">(Low stock)</span>}
                        </div>
                     </motion.div>
                  )}

                  {/* Description Section */}
                  <motion.div variants={itemVariants} className="mb-6">
                     <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Description</h3>
                     <div className="prose prose-sm max-w-none text-gray-600">{product.description ? <p>{product.description}</p> : <p className="text-gray-400 italic">No description provided for this product.</p>}</div>
                  </motion.div>

                  {/* Note Section (if exists) */}
                  {product.note && (
                     <motion.div variants={itemVariants} className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Note</h3>
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                           <p className="text-sm text-amber-800">{product.note}</p>
                        </div>
                     </motion.div>
                  )}

                  {/* Product Specs Grid */}
                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100 my-4">
                     <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">SKU</dt>
                        <dd className="text-sm font-mono text-gray-900 mt-1">{product.sku}</dd>
                     </div>
                     <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Added</dt>
                        <dd className="text-sm text-gray-900 mt-1">{formatDate(product.createdAt)}</dd>
                     </div>
                     <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Updated</dt>
                        <dd className="text-sm text-gray-900 mt-1">{formatDate(product.updatedAt)}</dd>
                     </div>
                     <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Product ID</dt>
                        <dd className="text-sm font-mono text-gray-500 mt-1 truncate">{product.id.slice(0, 8)}...</dd>
                     </div>
                  </motion.div>

                  {/* Dynamic Fields (if any) */}
                  {product.dynamicFields && Object.keys(product.dynamicFields).length > 0 && (
                     <motion.div variants={itemVariants} className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Additional Information</h3>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                           {Object.entries(product.dynamicFields).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                 <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                                 <span className="text-gray-900 font-medium">{String(value)}</span>
                              </div>
                           ))}
                        </div>
                     </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div variants={itemVariants} className="mt-6 flex flex-col sm:flex-row gap-4">
                     <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(true)}
                        disabled={!isInStock}
                        className={`flex-1 py-3 px-6 rounded-xl text-xl font-bold text-black shadow-sm transition-all duration-200 font-primary-bebas ${
                           isInStock ? "bg-gradient-to-r from-[#bd9520] to-[#af870f] hover:from-[#9c802c] hover:to-[#e0b840] cursor-pointer" : "bg-gray-300 cursor-not-allowed"
                        }`}
                     >
                        {isInStock ? "Order Now" : "Out of Stock"}
                     </motion.button>

                     <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 px-6 rounded-xl  bg-gray-700 text-gray-50 hover:text-yellow-400   transition-colors duration-200 cursor-pointer border-2 border-gray-300 text-xl font-bold"
                     >
                        {/* <Button onClick={() => setIsOpen(true)}>Order now</Button> */}
                        add to cart
                        <OrderSheetDialog isOpen={isOpen} onClose={() => setIsOpen(false)} productName={product.name} productPrice={product.price} productId={product.id} />
                     </motion.button>
                  </motion.div>

                  {/* Shipping Hint */}
                  <motion.p variants={itemVariants} className="text-xs text-gray-400 text-center mt-6">
                     Free shipping on orders over $50 • 30-day return policy
                  </motion.p>
               </div>
            </div>
         </div>
      </motion.div>
   );
}
