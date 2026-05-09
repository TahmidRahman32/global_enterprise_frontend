import { MassageStatus } from "./message.interface";
import {CheckCheck, Circle,  Reply, } from "lucide-react";
export const statusConfig: Record<MassageStatus, { label: string; color: string; icon: React.ReactNode }> = {
   MASSAGE_SEND: {
      label: "New",
      color: "bg-blue-500/15 text-blue-400 border-blue-500/20",
      icon: <Circle className="w-2 h-2 fill-blue-400 text-blue-400" />,
   },
   MASSAGE_READ: {
      label: "Read",
      color: "bg-gray-500/15 text-gray-400 border-gray-500/20",
      icon: <CheckCheck className="w-3 h-3 text-gray-400" />,
   },
   MASSAGE_REPLIED: {
      label: "Replied",
      color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
      icon: <Reply className="w-3 h-3 text-emerald-400" />,
   },
};
