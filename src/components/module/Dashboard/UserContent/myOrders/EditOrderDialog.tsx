"use client";
import React from 'react';

import { useState, useTransition } from "react";
import { IOrder, IOrderUpdatePayload, updateMyOrder } from "./Myordersactions";

import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import Image from "next/image";
import { Building2, Calendar, Mail, MapPin, Package, Pencil, Phone, ShoppingBag, Trash2, X, Loader2, Save, User, Hash } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EditOrderDialog = ({ order, onClose }: { order: IOrder; onClose: () => void }) => {
   const router = useRouter();
   const [isPending, startTransition] = useTransition();
   const [name, setName] = useState(order.name);
   const [phone, setPhone] = useState(order.phone);
   const [address, setAddress] = useState(order.address);

   const hasChanges = name !== order.name || phone !== order.phone || address !== order.address;

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!hasChanges) {
         toast.info("No changes to save.");
         return;
      }

      const payload: IOrderUpdatePayload = { name, phone, address };
      const loadingToast = toast.loading("Updating order...");

      startTransition(async () => {
         const result = await updateMyOrder(order.id, payload);
         toast.dismiss(loadingToast);

         if (result.success) {
            toast.success("Order updated!", {
               description: "Your changes have been saved.",
            });
            router.refresh();
            onClose();
         } else {
            toast.error("Update failed", {
               description: result.message || "Please try again.",
            });
         }
      });
   };

   const inputClass =
      "w-full bg-gray-950/80 border border-gray-700/60 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 disabled:opacity-40";

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
         <div className="w-full max-w-md bg-[#0d0f14] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800/80">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                     <Pencil className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div>
                     <h2 className="text-sm font-semibold text-gray-100">Edit Order</h2>
                     <p className="text-[11px] text-gray-600 font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
               </div>
               <button onClick={onClose} className="p-1.5 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-gray-800 transition-colors">
                  <X className="w-4 h-4" />
               </button>
            </div>

            {/* Status notice for completed/cancelled */}
            {(order.status === "COMPLETED" || order.status === "CANCELLED") && (
               <div className="mx-6 mt-4 px-4 py-3 rounded-xl bg-rose-500/8 border border-rose-500/20 text-rose-400 text-xs">
                  This order is <strong>{order.status.toLowerCase()}</strong> and cannot be edited.
               </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
               {/* Name */}
               <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                     <User className="w-3 h-3" />
                     Full Name
                  </label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required disabled={isPending || order.status === "COMPLETED" || order.status === "CANCELLED"} className={inputClass} placeholder="Your full name" />
               </div>

               {/* Phone */}
               <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                     <Phone className="w-3 h-3" />
                     Phone Number
                  </label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={isPending || order.status === "COMPLETED" || order.status === "CANCELLED"} className={inputClass} placeholder="+1 (555) 000-0000" />
               </div>

               {/* Address */}
               <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                     <MapPin className="w-3 h-3" />
                     Delivery Address
                  </label>
                  <textarea
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     required
                     rows={2}
                     disabled={isPending || order.status === "COMPLETED" || order.status === "CANCELLED"}
                     className={cn(inputClass, "resize-none")}
                     placeholder="Your delivery address"
                  />
               </div>

               {/* Actions */}
               <div className="flex items-center gap-2 pt-2">
                  <button type="button" onClick={onClose} disabled={isPending} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 bg-gray-800/60 hover:bg-gray-800 hover:text-gray-200 transition-colors disabled:opacity-40">
                     Cancel
                  </button>
                  <button
                     type="submit"
                     disabled={isPending || !hasChanges || order.status === "COMPLETED" || order.status === "CANCELLED"}
                     className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                  >
                     {isPending ? (
                        <>
                           <Loader2 className="w-4 h-4 animate-spin" />
                           Saving…
                        </>
                     ) : (
                        <>
                           <Save className="w-4 h-4" />
                           Save Changes
                        </>
                     )}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditOrderDialog;