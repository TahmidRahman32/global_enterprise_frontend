"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Menu, X, Printer, FileText, Settings, Users, Package, Bell, Search, ChevronDown, TrendingUp, CheckCircle, Clock, PlusCircle, ChevronLeft, ChevronRight, Home, LogOut } from "lucide-react";

// shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FaProductHunt } from "react-icons/fa";

// Assume you have this — or define here
const navItems = [
   { label: "Home", href: "/", icon: Home },
   { label: "Profile", href: "/my-profile", icon: FileText },
   { label: "Product", href: "/products", icon: FaProductHunt },
   { label: "Users", href: "/users", icon: Users },
   { label: "Settings", href: "/settings", icon: Settings },
   { label: "Logout", href: "/", icon: LogOut },
];

const pieData = [
   { name: "Zebra ZT410", value: 420, color: "#4f46e5" },
   { name: "Zebra GK420", value: 380, color: "#10b981" },
   { name: "Brother QL-800", value: 250, color: "#f59e0b" },
   { name: "Other", value: 180, color: "#ef4444" },
];

const sliderItems = [
   {
      id: 1,
      title: "New Firmware Update",
      subtitle: "Zebra ZT410 v2.1 – Improved speed & reliability",
      bg: "from-indigo-600 to-purple-600",
   },
   {
      id: 2,
      title: "Bulk Label Printing",
      subtitle: "Save 30% time with batch processing",
      bg: "from-emerald-600 to-teal-600",
   },
   {
      id: 3,
      title: "Low Ink Alert",
      subtitle: "3 printers need attention this week",
      bg: "from-amber-600 to-orange-600",
   },
];

const containerVariants = {
   hidden: { opacity: 0 },
   visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0 },
};

const UserDashboard: React.FC = () => {
   const [sidebarOpen, setSidebarOpen] = useState(true);
   const [currentSlide, setCurrentSlide] = useState(0);

   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);

   return (
      <div className="flex h-screen  dark:bg-gray-950">
       

         {/* Main Area */}
         <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
         

            {/* Content */}
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50/50 dark:bg-gray-950/50">
               <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                  {/* Slider + Pie Chart */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     {/* Content Slider */}
                     <motion.div variants={itemVariants}>
                        <Card className="overflow-hidden h-80 md:h-[500px] relative">
                           <AnimatePresence mode="wait">
                              <motion.div
                                 key={currentSlide}
                                 initial={{ opacity: 0, x: 60 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 exit={{ opacity: 0, x: -60 }}
                                 transition={{ duration: 0.5 }}
                                 className={`absolute inset-0 bg-gradient-to-br ${sliderItems[currentSlide].bg} flex items-center justify-center text-white px-8`}
                              >
                                 <div className="text-center max-w-md">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-3">{sliderItems[currentSlide].title}</h2>
                                    <p className="text-lg opacity-90">{sliderItems[currentSlide].subtitle}</p>
                                 </div>
                              </motion.div>
                           </AnimatePresence>

                           <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10 transition">
                              <ChevronLeft size={24} />
                           </button>
                           <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10 transition">
                              <ChevronRight size={24} />
                           </button>

                           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                              {sliderItems.map((_, i) => (
                                 <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? "bg-white scale-125" : "bg-white/50"}`} />
                              ))}
                           </div>
                        </Card>
                     </motion.div>

                     {/* Pie Chart - Printer Usage */}
                     <motion.div variants={itemVariants}>
                        <Card className="h-80 md:h-[500px]">
                           <CardHeader>
                              <CardTitle>Printer Usage Distribution</CardTitle>
                           </CardHeader>
                           <CardContent className="h-[calc(100%-8.5rem)]  ">
                              <ResponsiveContainer width="100%" height="100%">
                                 <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={100} paddingAngle={0} dataKey="value">
                                       {pieData.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                       ))}
                                    </Pie>
                                    <Tooltip
                                       contentStyle={{
                                          backgroundColor: "rgba(30,41,59,0.95)",
                                          border: "none",
                                          borderRadius: "8px",
                                          color: "white",
                                       }}
                                    />
                                 </PieChart>
                              </ResponsiveContainer>

                              <div className="flex flex-wrap justify-center gap-4 mt-20 text-sm">
                                 {pieData.map((item) => (
                                    <div key={item.name} className="flex items-center gap-2 ">
                                       <div className="w-10 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                       {item.name}
                                    </div>
                                 ))}
                              </div>
                           </CardContent>
                        </Card>
                     </motion.div>
                  </div>

                  {/* Quick Action */}
                  {/* Stats Cards */}
                  <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     <StatCard title="Labels Today" value="12,430" change="+8.2%" icon={<Printer size={24} />} />
                     <StatCard title="Active Printers" value="8/12" change="+2" icon={<CheckCircle size={24} />} />
                     <StatCard title="Pending Jobs" value="23" change="+5" icon={<Clock size={24} />} />
                     <StatCard title="Success Rate" value="98.5%" change="+1.2%" icon={<TrendingUp size={24} />} />
                  </motion.div>
               </motion.div>
            </main>
         </div>
      </div>
   );
};

// StatCard remains the same (you can keep your original)
const StatCard = ({ title, value, change, icon }: { title: string; value: string; change?: string; icon: React.ReactNode }) => (
   <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
         <CardContent className="p-6">
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                  <p className="text-2xl font-bold mt-1 dark:text-gray-100">{value}</p>
                  {change && <p className={`text-sm mt-1 ${change.startsWith("+") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{change} vs yesterday</p>}
               </div>
               <div className="p-3 bg-indigo-100 dark:bg-indigo-950 rounded-full">{icon}</div>
            </div>
         </CardContent>
      </Card>
   </motion.div>
);

export default UserDashboard;
