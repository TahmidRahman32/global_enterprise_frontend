"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import UpdateOrderStatusFrom from "./UpdateOrderFrom";
import { Button } from "@/components/ui/button";
import { UpdateStatusByOrder } from "@/components/module/order/OrderAcrion";
import OrderTableHeader from "./OrderTableHeader";

type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export interface IOrder {
   id: string;
   productImage: string;
   productName: string;
   customerName: string;
   email: string;
   phone: string;
   address: string;
   company: string | null;
   status: OrderStatus;
}

export interface ApiOrder {
   id: string;
   name: string;
   email: string;
   phone: string;
   address?: string;
   company?: string | null;
   status: OrderStatus;
   product: Array<{
      id: string;
      name: string;
      picture: string;
      description?: string;
      price?: number;
   }>;
   createdAt?: string;
   updatedAt?: string;
}

const StatusBadge = ({ status }: { status: OrderStatus }) => {
   const config = {
      PENDING: { label: "Pending", className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
      COMPLETED: { label: "Completed", className: "bg-green-500/20 text-green-300 border-green-500/30" },
      CANCELLED: { label: "Cancelled", className: "bg-red-500/20 text-red-300 border-red-500/30" },
   };
   const { label, className } = config[status];
   return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>{label}</span>;
};

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
   },
};

const itemVariants = {
   hidden: { y: 30, opacity: 0 },
   visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
   },
};

const modalOverlayVariants = {
   hidden: { opacity: 0 },
   visible: { opacity: 1, transition: { duration: 0.2 } },
   exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalContentVariants = {
   hidden: { scale: 0.9, opacity: 0, y: 20 },
   visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 400, damping: 30 },
   },
   exit: {
      scale: 0.9,
      opacity: 0,
      y: 20,
      transition: { duration: 0.2, ease: easeOut },
   },
};

export default function OrderTable({ orders: apiOrders }: { orders: ApiOrder[] }) {
   const transformedOrders = useMemo<IOrder[]>(() => {
      if (!Array.isArray(apiOrders)) return [];
      return apiOrders.map((order) => ({
         id: order.id,
         productImage: order.product?.[0]?.picture || "/placeholder-product.svg",
         productName: order.product?.[0]?.name || "Unknown Product",
         customerName: order.name || "Anonymous",
         email: order.email || "",
         phone: order.phone || "",
         address: order.address || "No address provided",
         company: order.company ?? null,
         status: order.status,
      }));
   }, [apiOrders]);

   const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [orders, setOrders] = useState<IOrder[]>(transformedOrders);

   useEffect(() => {
      setOrders(transformedOrders);
   }, [transformedOrders]);

   useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
         if (event.key === "Escape" && isModalOpen) closeModal();
      };
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
   }, [isModalOpen]);

   useEffect(() => {
      document.body.style.overflow = isModalOpen ? "hidden" : "unset";
      return () => {
         document.body.style.overflow = "unset";
      };
   }, [isModalOpen]);

   const openModal = (order: IOrder) => {
      setSelectedOrder(order);
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedOrder(null);
   };

   const handleView = (order: IOrder) => openModal(order);
   const handleEdit = (id: string, newStatus: OrderStatus) => {
      UpdateStatusByOrder(id, newStatus);
      // console.log("Edit order:", order, newStatus);
      // alert(`Edit order #${order.id} – implement your edit logic`);
   };
   const handleDelete = (order: IOrder) => {
      if (window.confirm(`Delete order for ${order.customerName}?`)) {
         setOrders((prev) => prev.filter((o) => o.id !== order.id));
      }
   };

   if (orders.length === 0) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
            <div className="text-center text-gray-400">No orders found.</div>
         </div>
      );
   }

   return (
         <div className="">
            <div className="max-w-7xl mx-auto">
               <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders.map((order) => (
                     <motion.div
                        key={order.id}
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="group bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700"
                     >
                        <div className="p-5">
                           <div className="flex items-center justify-between mb-4">
                              <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-gray-800 shadow-md">
                                 <Image src={order.productImage} alt={order.productName} fill className="object-cover" sizes="56px" />
                              </div>
                              <div className="px-2.5 py-1 bg-gray-800 rounded-full text-xs font-mono text-gray-400">#{order.id.slice(0, 8)}</div>
                           </div>

                           <div className="mb-3">
                              <h3 className="text-lg font-bold text-gray-100 group-hover:text-indigo-400 transition-colors">{order.productName}</h3>
                              <p className="text-sm text-gray-400 mt-0.5">{order.customerName}</p>
                           </div>

                           <div className="space-y-2 text-sm">
                              <div className="flex items-center text-gray-400">
                                 <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                 </svg>
                                 <span className="truncate">{order.email}</span>
                              </div>
                              <div className="flex items-center text-gray-400">
                                 <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                 </svg>
                                 <span>{order.phone}</span>
                              </div>
                              <div className="flex items-start text-gray-400">
                                 <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                 </svg>
                                 <span className="truncate">{order.address}</span>
                              </div>
                              {order.company && (
                                 <div className="flex items-center text-gray-400">
                                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>{order.company}</span>
                                 </div>
                              )}
                           </div>

                           <div className="mt-5 flex items-center justify-between">
                              <StatusBadge status={order.status} />
                              <div className="flex gap-1">
                                 <button onClick={() => handleView(order)} className="p-2 rounded-lg text-gray-400 hover:text-indigo-400 hover:bg-gray-800 transition-colors" title="View order">
                                    <Eye className="w-4 h-4" />
                                 </button>
                                 <button className="p-2 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-gray-800 transition-colors" title="Edit order">
                                    <UpdateOrderStatusFrom
                                       trigger={
                                          <Button variant="outline" size="sm">
                                             <Pencil className="h-4 w-4" />
                                          </Button>
                                       }
                                       currentStatus={order.status}
                                       onConfirm={(newStatus) => handleEdit(order.id, newStatus)}
                                    />
                                 </button>
                                 <button onClick={() => handleDelete(order)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors" title="Delete order">
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </motion.div>
            </div>

            <AnimatePresence mode="wait">
               {isModalOpen && selectedOrder && (
                  <motion.div variants={modalOverlayVariants} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={closeModal}>
                     <motion.div variants={modalContentVariants} initial="hidden" animate="visible" exit="exit" onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-700">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                           <div className="flex items-center justify-between">
                              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                 <Eye className="w-5 h-5" />
                                 Order Details
                              </h3>
                              <button onClick={closeModal} className="text-white/80 hover:text-white transition-colors">
                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                 </svg>
                              </button>
                           </div>
                        </div>

                        <div className="p-6 space-y-4">
                           <div className="flex items-center gap-4 pb-3 border-b border-gray-700">
                              <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-gray-800 shadow-md">
                                 <Image src={selectedOrder.productImage} alt={selectedOrder.productName} fill className="object-cover" />
                              </div>
                              <div>
                                 <p className="text-xs text-gray-400">Product</p>
                                 <p className="font-semibold text-white text-lg">{selectedOrder.productName}</p>
                              </div>
                           </div>

                           <div className="space-y-3">
                              <div>
                                 <p className="text-sm text-gray-400 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Customer
                                 </p>
                                 <p className="text-gray-200">{selectedOrder.customerName}</p>
                              </div>
                              <div>
                                 <p className="text-sm text-gray-400 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email
                                 </p>
                                 <p className="text-gray-200 break-all">{selectedOrder.email}</p>
                              </div>
                              <div>
                                 <p className="text-sm text-gray-400 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                       />
                                    </svg>
                                    Phone
                                 </p>
                                 <p className="text-gray-200">{selectedOrder.phone}</p>
                              </div>
                              <div>
                                 <p className="text-sm text-gray-400 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Address
                                 </p>
                                 <p className="text-gray-200">{selectedOrder.address}</p>
                              </div>
                              {selectedOrder.company && (
                                 <div>
                                    <p className="text-sm text-gray-400 flex items-center gap-1">
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                       </svg>
                                       Company
                                    </p>
                                    <p className="text-gray-200">{selectedOrder.company}</p>
                                 </div>
                              )}
                              <div className="pt-2 flex justify-between items-center">
                                 <div>
                                    <p className="text-sm text-gray-400">Order ID</p>
                                    <p className="text-gray-200 font-mono text-sm">#{selectedOrder.id}</p>
                                 </div>
                                 <StatusBadge status={selectedOrder.status} />
                              </div>
                           </div>
                        </div>

                        <div className="bg-gray-800/50 px-6 py-4 flex justify-end">
                           <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={closeModal} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-sm">
                              Close
                           </motion.button>
                        </div>
                     </motion.div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
   );
}
