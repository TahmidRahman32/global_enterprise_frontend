"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ShoppingCart, Package, Users, MessageSquare, Star, Wrench, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BarChartPoint {
   month: string; // ISO date string
   count: number;
}

interface TotalInvest {
   _sum: { amount?: number | null; price?: number | null };
}

export interface DashboardMeta {
   barChartData: BarChartPoint[];
   messageCount: number;
   orderCount: number;
   pieChartData: unknown[];
   productCount: number;
   reviewCount: number;
   serviceCount: number;
   totalInvest: TotalInvest;
   userCount: number;
}

interface Props {
   data: DashboardMeta;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(1)}K` : String(n));

const currency = (n: number) => `৳ ${n.toLocaleString("en-BD")}`;

// ─── Animation variants ────────────────────────────────────────────────────────

import { Variants } from "framer-motion";

const fade: Variants = {
   hidden: {
      opacity: 0,
      y: 18,
   },
   show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
         delay: i * 0.07,
         duration: 0.5,
         ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
   }),
};

const barColors = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe", "#f5f3ff"];

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
   if (!active || !payload?.length) return null;
   return (
      <div className="bg-popover border border-border/60 rounded-xl shadow-lg px-4 py-3 text-sm">
         <p className="font-semibold text-foreground mb-0.5">{label}</p>
         <p className="text-primary font-bold text-base">{payload[0].value} orders</p>
      </div>
   );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
   title: string;
   value: string | number;
   subtitle?: string;
   icon: React.ReactNode;
   trend?: "up" | "down" | "neutral";
   trendLabel?: string;
   accent: string; // tailwind bg class for icon bg
   iconColor: string; // tailwind text class
   index: number;
}

function StatCard({ title, value, subtitle, icon, trend, trendLabel, accent, iconColor, index }: StatCardProps) {
   return (
      <motion.div custom={index} variants={fade} initial="hidden" animate="show">
         <Card className="relative overflow-hidden border-border/50 bg-card hover:shadow-md transition-shadow duration-300 group">
            {/* Subtle top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] ${accent.replace("bg-", "bg-")}`} />

            <CardContent className="p-5">
               <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                     <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{title}</p>
                     <p className="text-3xl font-extrabold text-foreground tracking-tight leading-none">{value}</p>
                     {subtitle && <p className="text-xs text-muted-foreground mt-1.5 truncate">{subtitle}</p>}
                     {trendLabel && (
                        <div
                           className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                              trend === "up"
                                 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                 : trend === "down"
                                   ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                   : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                           }`}
                        >
                           {trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : trend === "down" ? <ArrowDownRight className="w-3 h-3" /> : null}
                           {trendLabel}
                        </div>
                     )}
                  </div>

                  <div className={`w-12 h-12 rounded-2xl ${accent} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                     <span className={iconColor}>{icon}</span>
                  </div>
               </div>
            </CardContent>
         </Card>
      </motion.div>
   );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard({ data }: Props) {
   // Derive invest amount

   const investAmount = data.totalInvest?._sum?.amount ?? data.totalInvest?._sum?.price ?? 0;

   // Normalise bar chart — convert ISO month → "Apr", "May" etc.
   const chartData = useMemo(
      () =>
         (data.barChartData ?? []).map((d) => ({
            month: format(new Date(d.month), "MMM yy"),
            orders: d.count,
         })),
      [data.barChartData],
   );

   // Stat cards config
   const stats: StatCardProps[] = [
      {
         title: "Total Orders",
         value: fmt(data.orderCount),
         subtitle: "All time orders placed",
         icon: <ShoppingCart className="w-5 h-5" />,
         trend: "up",
         trendLabel: "Active",
         accent: "bg-indigo-100 dark:bg-indigo-900/40",
         iconColor: "text-indigo-600 dark:text-indigo-400",
         index: 0,
      },
      {
         title: "Products",
         value: fmt(data.productCount),
         subtitle: "Listed in catalogue",
         icon: <Package className="w-5 h-5" />,
         trend: "neutral",
         trendLabel: "In stock",
         accent: "bg-violet-100 dark:bg-violet-900/40",
         iconColor: "text-violet-600 dark:text-violet-400",
         index: 1,
      },
      {
         title: "Users",
         value: fmt(data.userCount),
         subtitle: "Registered accounts",
         icon: <Users className="w-5 h-5" />,
         trend: "up",
         trendLabel: "Growing",
         accent: "bg-sky-100 dark:bg-sky-900/40",
         iconColor: "text-sky-600 dark:text-sky-400",
         index: 2,
      },
      {
         title: "Services",
         value: fmt(data.serviceCount),
         subtitle: "Active offerings",
         icon: <Wrench className="w-5 h-5" />,
         trend: "neutral",
         trendLabel: "Configured",
         accent: "bg-amber-100 dark:bg-amber-900/40",
         iconColor: "text-amber-600 dark:text-amber-400",
         index: 3,
      },
      {
         title: "Messages",
         value: fmt(data.messageCount),
         subtitle: "Inbox messages",
         icon: <MessageSquare className="w-5 h-5" />,
         trend: data.messageCount > 5 ? "up" : "neutral",
         trendLabel: data.messageCount > 5 ? "Needs attention" : "Up to date",
         accent: "bg-rose-100 dark:bg-rose-900/40",
         iconColor: "text-rose-600 dark:text-rose-400",
         index: 4,
      },
      {
         title: "Reviews",
         value: fmt(data.reviewCount),
         subtitle: "Customer feedback",
         icon: <Star className="w-5 h-5" />,
         trend: data.reviewCount === 0 ? "down" : "up",
         trendLabel: data.reviewCount === 0 ? "None yet" : "Received",
         accent: "bg-emerald-100 dark:bg-emerald-900/40",
         iconColor: "text-emerald-600 dark:text-emerald-400",
         index: 5,
      },
      {
         title: "Total Investment",
         value: investAmount > 0 ? currency(investAmount) : "৳ 0",
         subtitle: "Cumulative spend",
         icon: <DollarSign className="w-5 h-5" />,
         trend: investAmount > 0 ? "up" : "neutral",
         trendLabel: investAmount > 0 ? "Recorded" : "No data",
         accent: "bg-teal-100 dark:bg-teal-900/40",
         iconColor: "text-teal-600 dark:text-teal-400",
         index: 6,
      },
      {
         title: "System Health",
         value: "Online",
         subtitle: "All services running",
         icon: <Activity className="w-5 h-5" />,
         trend: "up",
         trendLabel: "Operational",
         accent: "bg-green-100 dark:bg-green-900/40",
         iconColor: "text-green-600 dark:text-green-400",
         index: 7,
      },
   ];

   return (
      <div className="min-h-screen bg-background text-foreground">
         <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
            .dash-root { font-family: 'DM Sans', sans-serif; }
            .dash-root h1, .dash-root h2, .dash-root h3 { font-family: 'Sora', sans-serif; }
         `}</style>

         <div className="dash-root w-full  mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* ── Page Header ── */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <div className="w-2 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500" />
                     <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Dashboard</h1>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">Global Enterprise — Overview & Analytics</p>
               </div>

               <div className="flex items-center gap-2 ml-4 sm:ml-0">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-xs px-2.5 py-1 font-semibold">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse inline-block" />
                     Live
                  </Badge>
                  <span className="text-xs text-muted-foreground">{format(new Date(), "EEE, MMM d yyyy")}</span>
               </div>
            </motion.div>

            <Separator className="opacity-40" />

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {stats.map((s) => (
                  <StatCard key={s.title} {...s} />
               ))}
            </div>

            {/* ── Chart + Summary ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
               {/* Bar Chart */}
               <motion.div custom={8} variants={fade} initial="hidden" animate="show" className="lg:col-span-2">
                  <Card className="border-border/50 h-full">
                     <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                           <div>
                              <CardTitle className="text-base font-bold tracking-tight">Order Volume</CardTitle>
                              <p className="text-xs text-muted-foreground mt-0.5">Monthly breakdown</p>
                           </div>
                           <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">
                              <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                              {chartData.length} months
                           </div>
                        </div>
                     </CardHeader>
                     <CardContent>
                        {chartData.length === 0 ? (
                           <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">No chart data available</div>
                        ) : (
                           <ResponsiveContainer width="100%" height={280}>
                              <BarChart data={chartData} barSize={36}>
                                 <defs>
                                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                                       <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/40" vertical={false} />
                                 <XAxis dataKey="month" tick={{ fontSize: 12, fill: "currentColor" }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                                 <YAxis tick={{ fontSize: 12, fill: "currentColor" }} className="text-muted-foreground" axisLine={false} tickLine={false} allowDecimals={false} />
                                 <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)", radius: 6 }} />
                                 <Bar dataKey="orders" fill="url(#barGrad)" radius={[6, 6, 0, 0]}>
                                    {chartData.map((_, i) => (
                                       <Cell key={i} fill={`url(#barGrad)`} opacity={0.85 + i * 0.025} />
                                    ))}
                                 </Bar>
                              </BarChart>
                           </ResponsiveContainer>
                        )}
                     </CardContent>
                  </Card>
               </motion.div>

               {/* Quick Summary Panel */}
               <motion.div custom={9} variants={fade} initial="hidden" animate="show">
                  <Card className="border-border/50 h-full">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-base font-bold tracking-tight">Quick Summary</CardTitle>
                        <p className="text-xs text-muted-foreground">All-time totals</p>
                     </CardHeader>
                     <CardContent className="space-y-1">
                        {[
                           { label: "Orders", value: data.orderCount, color: "bg-indigo-500" },
                           { label: "Products", value: data.productCount, color: "bg-violet-500" },
                           { label: "Users", value: data.userCount, color: "bg-sky-500" },
                           { label: "Services", value: data.serviceCount, color: "bg-amber-500" },
                           { label: "Messages", value: data.messageCount, color: "bg-rose-500" },
                           { label: "Reviews", value: data.reviewCount, color: "bg-emerald-500" },
                        ].map(({ label, value, color }) => {
                           const max = Math.max(data.orderCount, data.productCount, data.userCount, data.serviceCount, data.messageCount, data.reviewCount, 1);
                           const pct = Math.round((value / max) * 100);

                           return (
                              <div key={label} className="py-2">
                                 <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-medium text-muted-foreground">{label}</span>
                                    <span className="text-sm font-bold text-foreground">{value}</span>
                                 </div>
                                 <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.5 + Math.random() * 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={`h-full rounded-full ${color}`} />
                                 </div>
                              </div>
                           );
                        })}

                        <Separator className="opacity-40 my-3" />

                        {/* Investment total */}
                        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/50">
                           <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider mb-1">Total Investment</p>
                           <p className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">{investAmount > 0 ? currency(investAmount) : "৳ 0"}</p>
                           {investAmount === 0 && <p className="text-xs text-muted-foreground mt-1">No investment data recorded</p>}
                        </div>
                     </CardContent>
                  </Card>
               </motion.div>
            </div>

            {/* ── Bottom: Recent Months Breakdown ── */}
            {chartData.length > 0 && (
               <motion.div custom={10} variants={fade} initial="hidden" animate="show">
                  <Card className="border-border/50">
                     <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                           <CardTitle className="text-base font-bold tracking-tight">Monthly Breakdown</CardTitle>
                           <Badge variant="outline" className="text-[11px] border-border/60">
                              {chartData.length} month{chartData.length !== 1 ? "s" : ""}
                           </Badge>
                        </div>
                     </CardHeader>
                     <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                           {chartData.map((d, i) => (
                              <motion.div
                                 key={d.month}
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
                                 className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/40 dark:bg-muted/20 border border-border/40 gap-1 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                              >
                                 <p className="text-xs text-muted-foreground font-medium">{d.month}</p>
                                 <p className="text-xl font-extrabold text-foreground">{d.orders}</p>
                                 <p className="text-[10px] text-muted-foreground">orders</p>
                              </motion.div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </motion.div>
            )}
         </div>
      </div>
   );
}
