"use client";
import { motion } from "framer-motion";
// import { buttonVariants, itemVariants } from "@/Types/Login";
import Link from "next/link";
import { buttonVariants, itemVariants } from "@/Types/loginTypes";

const LoginButton = () => {
   return (
      <div className="flex items-center gap-2">
         {/* Messages */}
        
         {/* Notification menu */}

      
         <Link href="/login">
            {/* Login Button */}
            <motion.div variants={itemVariants}>
               <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#c4840d] to-[text-black py-1 font-primary-bebas rounded-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed px-5 transform-gpu hover:scale-[1.04] active:scale-[0.98]  duration-500 text-xl"
               >
                  Login
               </motion.button>
            </motion.div>
         </Link>
      </div>
   );
};

export default LoginButton;
