import { useState } from "react";
import { IOrder } from "./Myordersactions";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import Image from "next/image";
import { Building2, Calendar, Hash, Mail, MapPin, Package, Pencil, Phone, ShoppingBag, Trash2 } from "lucide-react";
import { format } from "date-fns";
import EditOrderDialog from "./EditOrderDialog";
export const OrderCard = ({ order, index }: { order: IOrder; index: number }) => {
   const [expanded, setExpanded] = useState(false);
   const [editOpen, setEditOpen] = useState(false);

   const canEdit = order.status !== "COMPLETED" && order.status !== "CANCELLED";

   return (
      <>
         <div
            className="group relative bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-700/80 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5"
            style={{ animationDelay: `${index * 60}ms` }}
         >
            {/* Top status accent */}
            <div className={cn("absolute top-0 left-0 right-0 h-0.5", order.status === "COMPLETED" && "bg-emerald-500/70", order.status === "PENDING" && "bg-amber-500/70", order.status === "CANCELLED" && "bg-rose-500/70")} />

            <div className="p-5">
               {/* ── Card Header ── */}
               <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                     {/* Order ID + status */}
                     <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-500 bg-gray-800/80 border border-gray-700/50 px-2 py-0.5 rounded-md">
                           <Hash className="w-2.5 h-2.5" />
                           {order.id.slice(0, 8).toUpperCase()}
                        </span>
                        <StatusBadge status={order.status} />
                     </div>
                     <h3 className="text-sm font-semibold text-gray-100 truncate">{order.name}</h3>
                  </div>

                  {/* Right: product stack + actions */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                     {/* Product image stack */}
                     <div className="flex -space-x-2">
                        {order.product.slice(0, 3).map((p, i) => (
                           <div key={i} className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-gray-900 bg-gray-800 shadow-sm" style={{ zIndex: order.product.length - i }}>
                              {p.picture ? (
                                 <Image src={p.picture} alt={p.name} fill className="object-cover" sizes="32px" />
                              ) : (
                                 <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-3.5 h-3.5 text-gray-600" />
                                 </div>
                              )}
                           </div>
                        ))}
                        {order.product.length > 3 && <div className="w-8 h-8 rounded-lg bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-[10px] text-gray-400 font-medium">+{order.product.length - 3}</div>}
                     </div>

                     {/* Action buttons */}
                     <div className="flex items-center gap-1">
                        <button
                           onClick={() => setEditOpen(true)}
                           disabled={!canEdit}
                           className={cn("p-1.5 rounded-lg transition-colors", canEdit ? "text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer" : "text-gray-700 cursor-not-allowed")}
                           title={canEdit ? "Edit order" : `Cannot edit ${order.status.toLowerCase()} order`}
                        >
                           <Pencil className="w-3.5 h-3.5" />
                        </button>
                     </div>
                  </div>
               </div>

               {/* ── Products list ── */}
               <div className="mb-3 space-y-1">
                  {order.product.slice(0, expanded ? undefined : 2).map((p, i) => (
                     <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <ShoppingBag className="w-3 h-3 flex-shrink-0 text-gray-700" />
                        <span className="truncate">{p.name}</span>
                     </div>
                  ))}
                  {order.product.length > 2 && (
                     <button onClick={() => setExpanded(!expanded)} className="text-[11px] text-indigo-400/80 hover:text-indigo-300 transition-colors mt-0.5">
                        {expanded ? "Show less" : `+${order.product.length - 2} more items`}
                     </button>
                  )}
               </div>

               {/* ── Divider ── */}
               <div className="border-t border-gray-800/60 my-3" />

               {/* ── Details grid ── */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5 min-w-0">
                     <Mail className="w-3 h-3 flex-shrink-0 text-gray-700" />
                     <span className="truncate">{order.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <Phone className="w-3 h-3 flex-shrink-0 text-gray-700" />
                     <span>{order.phone}</span>
                  </div>
                  <div className="flex items-start gap-1.5 sm:col-span-2 min-w-0">
                     <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5 text-gray-700" />
                     <span className="truncate">{order.address}</span>
                  </div>
                  {order.company && (
                     <div className="flex items-center gap-1.5 min-w-0">
                        <Building2 className="w-3 h-3 flex-shrink-0 text-gray-700" />
                        <span className="truncate">{order.company}</span>
                     </div>
                  )}
                  <div className="flex items-center gap-1.5">
                     <Calendar className="w-3 h-3 flex-shrink-0 text-gray-700" />
                     <span>{format(new Date(order.createdAt), "MMM dd, yyyy")}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Edit dialog */}
         {editOpen && <EditOrderDialog order={order} onClose={() => setEditOpen(false)} />}
      </>
   );
};
 
