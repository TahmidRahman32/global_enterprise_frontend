"use client";

import { useState, ReactElement, cloneElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // import Sonner toast

export type UserStatus = "ACTIVE" | "INACTIVE" | "DELETE";

interface UserStatusFormProps {
   trigger: ReactElement;
   currentStatus?: UserStatus;
   onConfirm: (newStatus: UserStatus) => void | Promise<void>;
   title?: string;
   description?: string;
   handleUiRefreshSuccess: () => void;
   
}

export default function UserStatusForm({ trigger, currentStatus = "ACTIVE", onConfirm, title = "Change User Status", description = "Select the new status for this user.", handleUiRefreshSuccess, }: UserStatusFormProps) {
   const [open, setOpen] = useState(false);
   const [selectedStatus, setSelectedStatus] = useState<UserStatus>(currentStatus);
   const [isLoading, setIsLoading] = useState(false);

   const handleConfirm = async () => {
      setIsLoading(true);
      try {
         await onConfirm(selectedStatus);

         // Show success toast
         toast.success(`Status updated to ${selectedStatus.toLowerCase()}`);

         // Refresh UI and close dialog
         handleUiRefreshSuccess();
        
         setOpen(false);
      } catch (error) {
         console.error("Failed to update status:", error);
         toast.error("Failed to update status. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   // Reset selected status when dialog opens (optional but good UX)
   const handleOpenChange = (newOpen: boolean) => {
      if (newOpen) {
         setSelectedStatus(currentStatus);
      }
      setOpen(newOpen);
   };

 
return (
   <>
      {/* Trigger sits outside Dialog entirely */}
      <span onClick={() => setOpen(true)} style={{ display: "contents" }}>
         {trigger}
      </span>

      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="py-4">
               <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
               <Select value={selectedStatus} onValueChange={(val) => setSelectedStatus(val as UserStatus)}>
                  <SelectTrigger className="w-full">
                     <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                     <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                     <SelectItem value="DELETE">DELETE</SelectItem>
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
   </>
);
}

// import React, { useActionState, useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
// import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { UpdateStatusByUserId } from "@/components/services/users/usersFetching";
// export type UserStatus = "ACTIVE" | "INACTIVE" | "DELETE";
// interface UserStatusFormProps {
//    open: boolean;
//    onClose: () => void;
//    onSuccess: () => void;
//    currentStatus?: UserStatus;
// }

// const UserStatusFrom = ({ open, onClose, onSuccess, currentStatus = "ACTIVE" }: UserStatusFormProps) => {
//    const [selectedStatus, setSelectedStatus] = useState<UserStatus>(currentStatus);
//    return (
//       <div>
//          <Dialog open={open} onOpenChange={onClose}>
//             {/* <DialogTrigger>{triggerWithHandler}</DialogTrigger> */}
//             <DialogContent className="sm:max-w-md">
//                <DialogHeader>
//                   <DialogTitle>Update User Status</DialogTitle>
//                   {/* <DialogDescription>{description}</DialogDescription> */}
//                </DialogHeader>

//                <div className="py-4">
//                   <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
//                   <Select value={selectedStatus} onValueChange={(val) => setSelectedStatus(val as UserStatus)}>
//                      <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select status" />
//                      </SelectTrigger>
//                      <SelectContent>
//                         <SelectItem value="ACTIVE">ACTIVE</SelectItem>
//                         <SelectItem value="INACTIVE">INACTIVE</SelectItem>
//                         <SelectItem value="DELETE">DELETE</SelectItem>
//                      </SelectContent>
//                   </Select>
//                </div>
//                {/* <form action={formAction}>
//                   <Field>
//                      <FieldLabel htmlFor="name">Full name</FieldLabel>
//                      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
//                      <FieldDescription>This appears on invoices and emails.</FieldDescription>
//                   </Field>
//                   <DialogFooter>
//                      <Button variant="outline" onClick={() => setOpen(false)}>
//                         Cancel
//                      </Button>
//                      <Button onClick={handleConfirm} disabled={isLoading}>
//                         {isLoading ? "Updating..." : "Confirm"}
//                      </Button>{" "}
//                   </DialogFooter>
//                </form> */}
//             </DialogContent>
//          </Dialog>
//       </div>
//    );
// };

// export default UserStatusFrom;
