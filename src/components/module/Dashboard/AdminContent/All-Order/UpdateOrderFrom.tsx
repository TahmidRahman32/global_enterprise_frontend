"use client";

import { useState, ReactElement, cloneElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";

interface UserStatusFormProps {
   trigger: ReactElement; // element that opens the dialog (e.g., <Button>)
   currentStatus?: OrderStatus;
   onConfirm: (newStatus: OrderStatus) => void | Promise<void>;
   title?: string;
   description?: string;
}

export default function UpdateOrderStatusFrom({ trigger, currentStatus = "PENDING", onConfirm, title = "Change User Status", description = "Select the new status for this user." }: UserStatusFormProps) {
   const [open, setOpen] = useState(false);
   const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(currentStatus);
   const [isLoading, setIsLoading] = useState(false);

   const handleConfirm = async () => {
      setIsLoading(true);
      try {
         await onConfirm(selectedStatus);
         setOpen(false);
      } catch (error) {
         console.error("Failed to update status:", error);
      } finally {
         setIsLoading(false);
      }
   };

   // Clone the trigger element to add onClick handler
   const triggerWithHandler = cloneElement(trigger, {
      // onClick: () => setOpen(true),
   });

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>{triggerWithHandler}</DialogTrigger>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="py-4">
               <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
               <Select value={selectedStatus} onValueChange={(val) => setSelectedStatus(val as OrderStatus)}>
                  <SelectTrigger className="w-full">
                     <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="PENDING">PENDING</SelectItem>
                     <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                     <SelectItem value="CANCELED">CANCELED</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <DialogFooter>
               <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
               </Button>
               <Button onClick={handleConfirm} disabled={isLoading}>
                  {isLoading ? "Updating..." : "Confirm"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
