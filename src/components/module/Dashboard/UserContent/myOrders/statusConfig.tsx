import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { OrderStatus } from "../../AdminContent/All-Order/UpdateOrderFrom";

 export const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
   PENDING: { label: "Pending", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", icon: <Clock className="w-3 h-3" /> },
   // PROCESSING: { label: "Processing", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20", icon: <Loader2 className="w-3 h-3 animate-spin" /> },
   // SHIPPED: { label: "Shipped", color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/20", icon: <Truck className="w-3 h-3" /> },
   COMPLETED: { label: "Delivered", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", icon: <CheckCircle2 className="w-3 h-3" /> },
   CANCELLED: { label: "Cancelled", color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20", icon: <XCircle className="w-3 h-3" /> },
};
