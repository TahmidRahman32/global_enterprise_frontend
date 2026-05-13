import { Circle } from "lucide-react";
import { IOrder } from "./Myordersactions";
import { statusConfig } from "./statusConfig";
import { cn } from "@/lib/utils";
export type OrderStatus = IOrder["status"];
export const StatusBadge = ({ status }: { status?: OrderStatus }) => {
   if (!status || !statusConfig[status]) {
      return (
         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-gray-500/10 border-gray-500/20 text-gray-400">
            <Circle className="w-2 h-2" />
            Unknown
         </span>
      );
   }

   const cfg = statusConfig[status];
   return (
      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", cfg.bg, cfg.color)}>
         {cfg.icon}
         {cfg.label}
      </span>
   );
};
