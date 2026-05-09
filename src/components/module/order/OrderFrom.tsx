"use client";

import { useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/lightswind/dialog";
import { submitOrder } from "./OrderAcrion";

interface OrderSheetDialogProps {
   isOpen: boolean;
   onClose: () => void;
   productName?: string;
   productPrice?: number;
   productId: string;
}

export type OrderActionState = {
   success?: boolean;
   message?: string;
   errors?: { field: PropertyKey; message: string }[];
   data?: {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      address?: string;
   } | null;
};

export default function OrderSheetDialog({ isOpen, onClose, productName = "Selected Product", productPrice = 0, productId }: OrderSheetDialogProps) {
   const [state, formAction, isPending] = useActionState<OrderActionState, FormData>(submitOrder, {
      success: false,
      errors: [],
      data: undefined,
   });
   console.log(state);

   const [showConfirmation, setShowConfirmation] = useState(false);

   useEffect(() => {
      // Only show confirmation if the action succeeded AND we have actual order data
      if (state.success && state.data && "name" in state.data && "email" in state.data && "phone" in state.data && "address" in state.data) {
         setShowConfirmation(true);
      }
   }, [state.success, state.data]);

   const resetAndClose = () => {
      setShowConfirmation(false);
      onClose();
   };

   const handleOpenChange = (open: boolean) => {
      if (!open) resetAndClose();
   };

   // ----- Confirmation view (only when order is truly successful) -----
   if (showConfirmation && state.data && "name" in state.data) {
      return (
         <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-6xl">
               <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                  <DialogHeader>
                     <DialogTitle className="text-center">✓ Order Confirmed</DialogTitle>
                     <DialogDescription className="text-center">Thank you for your purchase!</DialogDescription>
                  </DialogHeader>

                  <div className="mt-6 space-y-4">
                     <div className="rounded-lg bg-green-50 p-4 text-sm">
                        <p className="font-medium text-green-900">Order summary</p>
                        <div className="mt-2 flex justify-between text-green-800">
                           <span>{productName}</span>
                           <span>৳{productPrice.toFixed(2)}</span>
                        </div>
                     </div>

                     <div className="rounded-lg bg-gray-50 p-4 text-sm">
                        <p className="font-medium text-gray-900">Shipping to</p>
                        <div className="mt-2 space-y-0.5 text-gray-700">
                           <p>{state.data.name}</p>
                           <p>{state.data.email}</p>
                           <p>{state.data.phone}</p>
                           {state.data.company && <p>{state.data.company}</p>}
                           <p className="whitespace-pre-wrap">{state.data.address}</p>
                        </div>
                     </div>

                     <Button onClick={resetAndClose} className="w-full">
                        Close
                     </Button>
                  </div>
               </motion.div>
            </DialogContent>
         </Dialog>
      );
   }

   // ----- Form view -----
   return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
         <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="text-2xl font-bold font-primary-bebas">Order details</DialogTitle>
               <DialogDescription>Fill in your information to complete the order.</DialogDescription>
            </DialogHeader>

            <form action={formAction} className="mt-4 space-y-5">
               {/* Hidden product ID */}
               {productId && <input type="hidden" name="productId" value={productId} />}

               {/* Full name */}
               <div className="space-y-2">
                  <Label htmlFor="name">Full name *</Label>
                  <Input id="name" name="name" placeholder="John Doe" />
                  {state.errors?.find((e) => e.field === "name")?.message && <p className="text-sm text-red-500">{state.errors?.find((e) => e.field === "name")?.message}</p>}
               </div>

               {/* Email */}
               <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="hello@example.com" />
                  {state.errors?.find((e) => e.field === "email")?.message && <p className="text-sm text-red-500">{state.errors?.find((e) => e.field === "email")?.message}</p>}
               </div>

               {/* Phone */}
               <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" placeholder="+1 234 567 8900" />
                  {state.errors?.find((e) => e.field === "phone")?.message && <p className="text-sm text-red-500">{state.errors?.find((e) => e.field === "phone")?.message}</p>}
               </div>

               {/* Company (optional) */}
               <div className="space-y-2">
                  <Label htmlFor="company">Company (optional)</Label>
                  <Input id="company" name="company" placeholder="Acme Inc." />
               </div>

               {/* Address */}
               <div className="space-y-2">
                  <Label htmlFor="address">Shipping address *</Label>
                  <Textarea id="address" name="address" rows={3} placeholder="Street, city, postal code, country" />
                  {state.errors?.find((e) => e.field === "address")?.message && <p className="text-sm text-red-500">{state.errors?.find((e) => e.field === "address")?.message}</p>}
               </div>

               {/* Generic error message (e.g., server error) */}
               {state.success === false && state.message && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.message}</div>}

               {/* Buttons */}
               <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={resetAndClose} className="flex-1">
                     Cancel
                  </Button>
                  <Button type="submit" disabled={isPending} className="flex-1">
                     {isPending ? "Placing order..." : "Place order"}
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}
