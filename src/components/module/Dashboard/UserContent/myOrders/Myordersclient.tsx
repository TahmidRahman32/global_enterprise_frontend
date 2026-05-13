"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";

import { Search, SlidersHorizontal, Package, MapPin, Phone, Mail, Building2, Calendar, ChevronLeft, ChevronRight, RefreshCw, ShoppingBag, Clock, Truck, CheckCircle2, XCircle, Loader2, X, Circle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
// import { IOrder, IOrderMeta } from "./myOrdersActions";
import { cn } from "@/lib/utils";
import { IOrder, IOrderMeta } from "./Myordersactions";
import { MyOrdersSkeleton } from "./MyOrdersSkeleton";
import { statusConfig } from "./statusConfig";
import { OrderCard } from "./OrderCard";
import { OrderStatus } from "./StatusBadge";

const statusFilters: { label: string; value: string }[] = [
   { label: "All Orders", value: "ALL" },
   { label: "Pending", value: "PENDING" },
   // { label: "Processing", value: "PROCESSING" },
   // { label: "Shipped", value: "SHIPPED" },
   { label: "Delivered", value: "COMPLETED" },
   { label: "Cancelled", value: "CANCELLED" },
];

// ============================================================================
// Empty state
// ============================================================================

const EmptyState = ({ hasFilters }: { hasFilters: boolean }) => (
   <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-800/80 border border-gray-700 flex items-center justify-center mb-4">
         <ShoppingBag className="w-7 h-7 text-gray-600" />
      </div>
      <h3 className="text-base font-semibold text-gray-300 mb-1">{hasFilters ? "No orders match your filters" : "No orders yet"}</h3>
      <p className="text-sm text-gray-600 max-w-xs">{hasFilters ? "Try adjusting your search or status filter." : "When you place an order, it will appear here."}</p>
   </div>
);


// Main Client Component


interface MyOrdersClientProps {
   initialOrders: IOrder[];
   initialMeta: IOrderMeta;
}

export default function MyOrdersClient({ initialOrders, initialMeta }: MyOrdersClientProps) {
   console.log(initialOrders, "initialOrder");
   const router = useRouter();
   const searchParams = useSearchParams();
   const [, startTransition] = useTransition();
   const [isLoading, setIsLoading] = useState(false);

   const [search, setSearch] = useState(searchParams.get("searchTerm") || "");
   const [status, setStatus] = useState(searchParams.get("status") || "ALL");
   const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
   const debouncedSearch = useDebounce(search, 400);

   // Push URL params → triggers server re-fetch via Suspense key
   const pushParams = (overrides: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(overrides).forEach(([k, v]) => {
         if (v === "" || v === "ALL") params.delete(k);
         else params.set(k, String(v));
      });
      setIsLoading(true);
      startTransition(() => {
         router.push(`?${params.toString()}`, { scroll: false } as any);
      });
   };

   // Debounced search → update URL
   useEffect(() => {
      pushParams({ searchTerm: debouncedSearch, page: 1 });
      setPage(1);
   }, [debouncedSearch]);

   // Status filter
   const handleStatusChange = (val: string) => {
      setStatus(val);
      setPage(1);
      pushParams({ status: val, page: 1 });
   };

   // Pagination
   const handlePageChange = (next: number) => {
      setPage(next);
      pushParams({ page: next });
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const totalPages = Math.ceil(initialMeta.total / initialMeta.limit);
   const hasFilters = !!debouncedSearch || status !== "ALL";

   // Clear isLoading when new data arrives
   useEffect(() => {
      setIsLoading(false);
   }, [initialOrders]);

   return (
      <div className="min-h-screen bg-[#0a0b0f] text-gray-100">
         {/* ── Background texture ── */}
         <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1f35_0%,_transparent_60%)] pointer-events-none" />
         <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiLz48L3N2Zz4=')] pointer-events-none opacity-40" />

         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* ── Page header ── */}
            <div className="mb-10">
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                     <ShoppingBag className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                     <h1 className="text-2xl font-bold text-gray-100 tracking-tight">My Orders</h1>
                     <p className="text-sm text-gray-500">
                        {initialMeta.total} order{initialMeta.total !== 1 ? "s" : ""} total
                     </p>
                  </div>
               </div>

               {/* Stats row */}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {(["PENDING", "COMPLETED"] as OrderStatus[]).map((s) => {
                     const count = initialOrders.filter((o) => o.status === s).length;
                     const cfg = statusConfig[s];
                     return (
                        <button
                           key={s}
                           onClick={() => handleStatusChange(status === s ? "ALL" : s)}
                           className={cn(
                              "flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 text-left",
                              status === s ? cn("border-current/40", cfg.bg, cfg.color) : "bg-gray-900/50 border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-300",
                           )}
                        >
                           <span className={cn("flex-shrink-0", status === s ? cfg.color : "text-gray-600")}>{cfg.icon}</span>
                           <div>
                              <p className="text-xs font-medium">{cfg.label}</p>
                              <p className="text-lg font-bold leading-none mt-0.5">{count}</p>
                           </div>
                        </button>
                     );
                  })}
               </div>
            </div>

            {/* ── Filters bar ── */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
               {/* Search */}
               <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder="Search by product name..."
                     className="w-full pl-9 pr-9 py-2.5 bg-gray-900/80 border border-gray-800 rounded-xl text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-gray-900 transition-colors"
                  />
                  {search && (
                     <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                        <X className="w-3.5 h-3.5" />
                     </button>
                  )}
               </div>

               {/* Status filter pills */}
               <div className="flex gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 flex-shrink-0">
                  {statusFilters.map((f) => (
                     <button
                        key={f.value}
                        onClick={() => handleStatusChange(f.value)}
                        className={cn(
                           "px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 border",
                           status === f.value ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300" : "bg-gray-900/50 border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700",
                        )}
                     >
                        {f.label}
                     </button>
                  ))}
               </div>

               {/* Refresh */}
               <button
                  onClick={() => {
                     setIsLoading(true);
                     startTransition(() => router.refresh());
                  }}
                  className="p-2.5 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700 transition-colors flex-shrink-0"
                  title="Refresh"
               >
                  <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
               </button>
            </div>

            {/* ── Order grid ── */}
            {isLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                     <MyOrdersSkeleton key={i} />
                  ))}
               </div>
            ) : initialOrders.length === 0 ? (
               <EmptyState hasFilters={hasFilters} />
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {initialOrders.map((order, i) => (
                     <OrderCard key={order.id} order={order} index={i} />
                  ))}
               </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
               <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800/60">
                  <p className="text-xs text-gray-600">
                     Page {page} of {totalPages} · {initialMeta.total} total orders
                  </p>
                  <div className="flex gap-1.5">
                     <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 1}
                        className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                     >
                        <ChevronLeft className="w-4 h-4" />
                     </button>
                     {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        const p = i + 1;
                        return (
                           <button
                              key={p}
                              onClick={() => handlePageChange(p)}
                              className={cn(
                                 "w-8 h-8 rounded-lg text-xs font-medium border transition-colors",
                                 page === p ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" : "bg-gray-900 border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700",
                              )}
                           >
                              {p}
                           </button>
                        );
                     })}
                     <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                        className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                     >
                        <ChevronRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
