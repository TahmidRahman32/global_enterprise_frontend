"use client";

import { useState, useTransition, useCallback } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, RefreshCw, LayoutGrid, Plus, Search, Zap, Printer, Package, Settings, Star, LucideIcon } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DeleteModal, EditModal } from "./Servicemodals";
import { ServiceInterface } from "@/Types/service";
import { ICON_COLORS } from "@/zod/service.validation";

export const ICON_MAP: Record<string, LucideIcon> = {
   Zap,
   Printer,
   Package,
   Settings,
   Star,
};

interface ServiceListProps {
   services?: ServiceInterface[];
   onAddNew?: () => void;
}

const STATUS_CONFIG = {
   ACTIVE: { label: "Active", cls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20" },
   INACTIVE: { label: "Inactive", cls: "bg-slate-500/15   text-slate-600   dark:text-slate-400   border-slate-500/25   hover:bg-slate-500/20" },
   DELETE: { label: "Deleted", cls: "bg-red-500/15     text-red-600     dark:text-red-400     border-red-500/25     hover:bg-red-500/20" },
} as const;

function StatusBadge({ status }: { status: ServiceInterface["status"] }) {
   const { label, cls } = STATUS_CONFIG[status];
   return (
      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors", cls)}>
         <span
            className={cn("w-1.5 h-1.5 rounded-full", {
               "bg-emerald-500": status === "ACTIVE",
               "bg-slate-400": status === "INACTIVE",
               "bg-red-500": status === "DELETE",
            })}
         />
         {label}
      </span>
   );
}

const formatDate = (d: string) => {
   try {
      return format(new Date(d), "MMM dd, yyyy");
   } catch {
      return "—";
   }
};

export default function ServiceList({ services = [], onAddNew }: ServiceListProps) {
   const router = useRouter();
   const [isPending, startTransition] = useTransition();
   const [isRefreshing, setIsRefreshing] = useState(false);

   const [localServices, setLocalServices] = useState<ServiceInterface[]>(services);
   const [search, setSearch] = useState("");

   // Modals
   const [deleteTarget, setDeleteTarget] = useState<ServiceInterface | null>(null);
   const [editTarget, setEditTarget] = useState<ServiceInterface | null>(null);

   const filtered = localServices.filter((s) => s.status !== "DELETE" && (s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())));

   const stats = {
      total: localServices.filter((s) => s.status !== "DELETE").length,
      active: localServices.filter((s) => s.status === "ACTIVE").length,
      inactive: localServices.filter((s) => s.status === "INACTIVE").length,
   };

   const handleRefresh = useCallback(() => {
      setIsRefreshing(true);
      startTransition(() => {
         router.refresh();
         setTimeout(() => setIsRefreshing(false), 800);
      });
   }, [router]);

   const handleDeleted = (id: string) => {
      console.log(id, "row");
      setLocalServices((prev) => prev.filter((s) => s.id !== id));
   };

   const handleUpdated = (updated: ServiceInterface) => {
      setLocalServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
   };

   return (
      <TooltipProvider>
         <div className="w-full space-y-5 md:p-4">
            {/* ── Page Header ── */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
               <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                     <LayoutGrid className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                     <h1 className="text-xl font-bold text-foreground tracking-tight leading-tight">Service Management</h1>
                     <p className="text-sm text-muted-foreground mt-0.5">Manage and configure your service offerings</p>
                  </div>
               </div>

               <div className="flex items-center gap-2 shrink-0">
                  <Tooltip>
                     <TooltipTrigger className="h-9 gap-2 border-border/60 text-muted-foreground hover:text-foreground" onClick={handleRefresh} disabled={isRefreshing || isPending}>
                        <RefreshCw className={cn("h-3.5 w-3.5", (isRefreshing || isPending) && "animate-spin")} />
                        <span className="hidden sm:inline">Refresh</span>
                     </TooltipTrigger>
                     <TooltipContent>Refresh service list</TooltipContent>
                  </Tooltip>

                  {onAddNew && (
                     <Button size="sm" className="h-9 gap-2 font-semibold shadow-sm" onClick={onAddNew}>
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Service</span>
                     </Button>
                  )}
               </div>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-3 gap-3">
               {[
                  { label: "Total", value: stats.total, color: "text-foreground", dot: "bg-primary" },
                  { label: "Active", value: stats.active, color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
                  { label: "Inactive", value: stats.inactive, color: "text-slate-500", dot: "bg-slate-400" },
               ].map(({ label, value, color, dot }) => (
                  <div key={label} className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/40 dark:bg-muted/20 border border-border/40 gap-1">
                     <div className="flex items-center gap-1.5">
                        <span className={cn("w-2 h-2 rounded-full shrink-0", dot)} />
                        <span className="text-xs text-muted-foreground font-medium">{label}</span>
                     </div>
                     <span className={cn("text-2xl font-extrabold tracking-tight", color)}>{value}</span>
                  </div>
               ))}
            </div>

            <Separator className="opacity-50" />

            {/* ── Search ── */}
            <div className="relative max-w-sm">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search services…"
                  className="pl-9 h-9 bg-muted/40 dark:bg-muted/20 border-border/60 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary"
               />
            </div>

            {/* ── Table ── */}
            <div className="rounded-xl border border-border/50 overflow-hidden bg-card shadow-sm">
               <div className="overflow-x-auto">
                  <Table className="min-w-[600px]">
                     <TableHeader>
                        <TableRow className="bg-muted/30 dark:bg-muted/20 hover:bg-muted/30 border-b border-border/50">
                           {["Icon", "Service", "Status", "Created", "Actions"].map((h) => (
                              <TableHead key={h} className={cn("text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3", h === "Actions" && "text-right", h === "Created" && "hidden md:table-cell")}>
                                 {h}
                              </TableHead>
                           ))}
                        </TableRow>
                     </TableHeader>

                     <TableBody>
                        {filtered.length === 0 ? (
                           <TableRow>
                              <TableCell colSpan={5} className="h-40 text-center">
                                 <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                    <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl">⚙️</div>
                                    <p className="text-sm font-medium">{search ? "No services match your search." : "No services found."}</p>
                                 </div>
                              </TableCell>
                           </TableRow>
                        ) : (
                           filtered.map((service, idx) => {
                              const Icon = ICON_MAP[service.icon];
                              const iconCls = ICON_COLORS[service.icon] ?? ICON_COLORS.Settings;

                              return (
                                 <TableRow key={service.id} className={cn("border-b border-border/30 transition-colors", "hover:bg-muted/20 dark:hover:bg-muted/10", idx % 2 === 0 ? "" : "bg-muted/5 dark:bg-muted/5")}>
                                    {/* Icon */}
                                    <TableCell className="py-3.5 pl-4">
                                       <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", iconCls)}>{Icon ? <Icon className="w-4 h-4" /> : null}</div>
                                    </TableCell>
                                    {/* Service info */}
                                    <TableCell className="py-3.5">
                                       <div>
                                          <p className="font-semibold text-sm text-foreground leading-tight">{service.title}</p>
                                          <p className="text-xs text-muted-foreground mt-0.5 max-w-xs truncate">{service.description}</p>
                                       </div>
                                    </TableCell>
                                    {/* Status */}
                                    <TableCell className="py-3.5">
                                       <StatusBadge status={service.status} />
                                    </TableCell>

                                    {/* Created */}
                                    <TableCell className="hidden md:table-cell py-3.5 text-xs text-muted-foreground">{formatDate(service.createdAt)}</TableCell>

                                    {/* Actions */}
                                    <TableCell className="py-3.5 pr-4">
                                       <div className="flex items-center justify-end gap-1">
                                          {/* Edit */}
                                          <Tooltip>
                                             <TooltipTrigger>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted" onClick={() => setEditTarget(service)}>
                                                   <Pencil className="h-4 w-4 text-amber-500" />
                                                </Button>
                                             </TooltipTrigger>
                                             <TooltipContent>Edit service</TooltipContent>
                                          </Tooltip>

                                          {/* Delete */}
                                          <Tooltip>
                                             <TooltipTrigger>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted" onClick={() => setDeleteTarget(service)}>
                                                   <Trash2 className="h-4 w-4 text-rose-500" />
                                                </Button>
                                             </TooltipTrigger>
                                             <TooltipContent>Delete service</TooltipContent>
                                          </Tooltip>
                                       </div>
                                    </TableCell>
                                 </TableRow>
                              );
                           })
                        )}
                     </TableBody>
                  </Table>
               </div>

               {/* Table footer */}
               {filtered.length > 0 && (
                  <div className="px-4 py-2.5 border-t border-border/30 bg-muted/20 flex items-center justify-between">
                     <p className="text-xs text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of <span className="font-semibold text-foreground">{stats.total}</span> services
                     </p>
                     {search && (
                        <Badge variant="secondary" className="text-[11px] px-2 h-5">
                           Filtered
                        </Badge>
                     )}
                  </div>
               )}
            </div>
         </div>

         {/* ── Modals ── */}
         <DeleteModal service={deleteTarget} open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onDeleted={handleDeleted} />

         <EditModal service={editTarget} open={!!editTarget} onClose={() => setEditTarget(null)} onUpdated={handleUpdated} />
      </TooltipProvider>
   );
}
