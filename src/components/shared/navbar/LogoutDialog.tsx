"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { buttonVariants, itemVariants } from "@/Types/loginTypes";
import { logoutUser } from "@/components/services/auth/logoutUser";
import { Button } from "@/components/ui/button";
const LogoutDialog = () => {
   const handleLogout =async () => {
      // Implement your logout logic here, such as clearing tokens, redirecting, etc.
      await logoutUser();

      console.log("User logged out");
   };
   return (
      <div>
         <AlertDialog>
            <AlertDialogTrigger>
               <motion.div variants={itemVariants}>
                  <motion.span
                     variants={buttonVariants}
                     initial="initial"
                     className="w-full bg-gradient-to-r from-[#c4840d] to-[text-black py-1 font-primary-bebas rounded-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed px-5 transform-gpu hover:scale-[1.04] active:scale-[0.98]  duration-500 text-xl"
                  >
                     Logout
                  </motion.span>
               </motion.div>
            </AlertDialogTrigger>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-bold text-center flex  justify-center">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                     <span className="text-red-500  font-bold font-primary-BB">Want to log out of this account? </span>
                     <br /> This action cannot be undone. This will permanently delete your account from our servers.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white">
                     <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleLogout}>Continue</Button>
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </div>
   );
};

export default LogoutDialog;
