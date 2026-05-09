// components/NotificationMenu.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailIcon, Bell, X, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
   id: string;
   title: string;
   message: string;
   time: string;
   read: boolean;
   type: "info" | "success" | "warning" | "primary";
}

// Sample notification data – replace with real data from your backend
const sampleNotifications: Notification[] = [
   {
      id: "1",
      title: "New message",
      message: "You have a new message from Sarah.",
      time: "2 min ago",
      read: false,
      type: "primary",
   },
   {
      id: "2",
      title: "Project update",
      message: "Your project 'Dashboard UI' has been approved.",
      time: "1 hour ago",
      read: false,
      type: "success",
   },
   {
      id: "3",
      title: "Payment received",
      message: "$499.00 credited to your account.",
      time: "3 hours ago",
      read: true,
      type: "info",
   },
   {
      id: "4",
      title: "System maintenance",
      message: "Scheduled downtime on March 25th, 02:00 AM.",
      time: "Yesterday",
      read: true,
      type: "warning",
   },
];

export const NotificationMenu = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
   const containerRef = useRef<HTMLDivElement>(null);

   // Close popover when clicking outside
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };
      if (isOpen) {
         document.addEventListener("mousedown", handleClickOutside);
      }
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [isOpen]);

   const unreadCount = notifications.filter((n) => !n.read).length;

   const markAsRead = (id: string) => {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
   };

   const markAllAsRead = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
   };

   const getTypeColor = (type: Notification["type"]) => {
      switch (type) {
         case "primary":
            return "border-l-[#bb931c]"; // your golden brand color
         case "success":
            return "border-l-green-500";
         case "warning":
            return "border-l-yellow-500";
         default:
            return "border-l-blue-500";
      }
   };

   return (
      <div className="relative" ref={containerRef}>
         {/* Animated bell button */}
         <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <Button
               size="icon"
               variant="ghost"
               className="relative size-8 rounded-full text-muted-foreground shadow-none
                     bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-800/60
                     backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
               aria-label="Open notifications"
               onClick={() => setIsOpen(!isOpen)}
            >
               <Bell size={16} aria-hidden="true" />
               {unreadCount > 0 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute -top-0.5 -right-0.5 size-3.5 rounded-full bg-[#bb931c] flex items-center justify-center">
                     <span className="text-[8px] font-bold text-white">{unreadCount}</span>
                  </motion.div>
               )}
            </Button>
         </motion.div>

         {/* Dropdown menu */}
         <AnimatePresence>
            {isOpen && (
               <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 z-50 origin-top-right"
               >
                  <div className="rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden">
                     {/* Header */}
                     <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/20 dark:border-gray-700/30">
                        <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                        {unreadCount > 0 && (
                           <button onClick={markAllAsRead} className="text-xs text-[#bb931c] hover:text-[#a07f18] transition-colors flex items-center gap-1">
                              <CheckCheck size={12} />
                              Mark all read
                           </button>
                        )}
                     </div>

                     {/* Notification list */}
                     <div className="max-h-96 overflow-y-auto divide-y divide-gray-200/20 dark:divide-gray-700/30">
                        {notifications.length === 0 ? (
                           <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No notifications yet</p>
                           </div>
                        ) : (
                           notifications.map((notification) => (
                              <motion.div
                                 key={notification.id}
                                 initial={{ opacity: 0, y: -5 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ duration: 0.15 }}
                                 whileHover={{ backgroundColor: "rgba(187,147,28,0.05)" }}
                                 className={`relative cursor-pointer border-l-4 ${getTypeColor(notification.type)} ${!notification.read ? "bg-[#bb931c]/5" : ""}`}
                                 onClick={() => markAsRead(notification.id)}
                              >
                                 <div className="p-3 pr-8">
                                    <div className="flex items-start justify-between gap-2">
                                       <div>
                                          <p className="text-sm font-medium text-gray-800 dark:text-white">{notification.title}</p>
                                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notification.message}</p>
                                          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                                       </div>
                                       {!notification.read && <div className="size-2 rounded-full bg-[#bb931c] flex-shrink-0 mt-1" />}
                                    </div>
                                 </div>
                              </motion.div>
                           ))
                        )}
                     </div>

                     {/* Footer */}
                     <div className="border-t border-gray-200/20 dark:border-gray-700/30 p-2 text-center">
                        <button className="text-xs text-gray-500 hover:text-[#bb931c] transition-colors">View all notifications</button>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};
