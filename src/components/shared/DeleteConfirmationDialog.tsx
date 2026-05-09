"use client"
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
interface DeleteConfirmationProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onConfirm: () => void;
   title?: string;
   description?: string;
   itemName?: string;
   isDeleting?: boolean;
}

const DeleteConfirmationDialog = ({ open, onOpenChange, onConfirm, title, description, isDeleting, itemName }: DeleteConfirmationProps) => {
   return (
      <div>
         <AlertDialog open={open} onOpenChange={onOpenChange}>
            {/* <AlertDialogTrigger>
              
                  <button
                  
                     type="submit"
                     className="w-full bg-gradient-to-r from-[#c4840d] to-[text-black py-1 font-primary-bebas rounded-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed px-5 transform-gpu hover:scale-[1.04] active:scale-[0.98]  duration-500 text-xl"
                  >
                     Logout
                  </button>
               
            </AlertDialogTrigger> */}
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-bold text-center flex  justify-center">{title}</AlertDialogTitle>
                  <AlertDialogDescription>
                     {description || (
                        <>
                           This will delete <strong>{itemName}</strong>.This action cannot be undone.
                        </>
                     )}
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={onConfirm} disabled={isDeleting}>
                     {isDeleting ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Deleting...
                        </>
                     ) : (
                        "Delete"
                     )}
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </div>
   );
};

export default DeleteConfirmationDialog;
