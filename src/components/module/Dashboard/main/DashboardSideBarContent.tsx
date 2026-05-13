"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavItem } from "./DashboardContent";
import { UserInfo } from "@/Types/user.interfece";
import { NavSections } from "@/Types/dashboard.interface";
import { IconsComponent } from "@/lib/icon-mapper";
// Animation variants
const sidebarVariants = {
   open: { width: "16rem" },
   closed: { width: "5rem" },
};

interface DashboardSideBarContentProps {
   userinfo: UserInfo;
   navItems: NavSections[];
   dashboardHome: string;
}

const DashboardSideBarContent = ({ userinfo, navItems, dashboardHome }: DashboardSideBarContentProps) => {
   const [sidebarOpen, setSidebarOpen] = useState(true);
   const sidebarTitle = userinfo?.role === "ADMIN" ? "Admin Dashboard" : "My Dashboard";
   const sidebarInitials = userinfo?.role === "ADMIN" ? "AD" : "MD";
   return (
      <div className="flex h-screen bg-blue-600 dark:bg-gray-900">
         <motion.aside
            initial={sidebarOpen ? "open" : "closed"}
            animate={sidebarOpen ? "open" : "closed"}
            variants={sidebarVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-  dark:bg-gray-800 shadow-lg flex flex-col h-full overflow-hidden border-r border-gray-200 dark:border-gray-700"
         >
            {/* Logo area */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 ">
               <Link href={dashboardHome} className="flex items-center space-x-2">
                  <AnimatePresence mode="wait">
                     {sidebarOpen ? (
                        <motion.span key="logo-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                           {sidebarTitle}
                        </motion.span>
                     ) : (
                        <motion.span key="logo-short" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mx-auto">
                           {sidebarInitials}
                        </motion.span>
                     )}
                  </AnimatePresence>
               </Link>
               <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
               </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
               {navItems?.flatMap((section) =>
                  (section.items || []).map((item) => {
                     // Skip rendering if href is missing
                     if (!item.href) return null;

                     const IconComponent = IconsComponent(item.icon);
                     return <NavItem key={item.label} icon={IconComponent ? <IconComponent /> : null} label={item.label} sidebarOpen={sidebarOpen} href={item.href} />;
                  }),
               )}
            </nav>

            {/* User info */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
               <div className="flex items-center space-x-3">
                  <Avatar>
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  {sidebarOpen && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{userinfo?.name || "Admin User"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{userinfo?.email || "gaziur.tahmid@gmail.com"}</p>
                     </motion.div>
                  )}
               </div>
            </div>
         </motion.aside>
      </div>
   );
};

export default DashboardSideBarContent;
