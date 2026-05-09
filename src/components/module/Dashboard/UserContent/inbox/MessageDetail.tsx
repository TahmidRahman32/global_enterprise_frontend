"use client";


import { format } from "date-fns";
import { Mail, Phone, User, Clock, CheckCheck, Circle, Trash2, Reply, Search, RefreshCw, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Message } from "./message.interface";
import { statusConfig } from "./MassageStatus";
import { getAvatarColor, getInitials } from "./messageAvatar";

export const MessageDetail = ({ message, onClose, onMarkRead, onDelete, onReply }: { message: Message; onClose: () => void; onMarkRead?: (id: string) => void; onDelete?: (id: string) => void; onReply?: (message: Message) => void }) => {
   const status = statusConfig[message.massageStatus];

   return (
      <div className="flex flex-col h-full">
         {/* Detail Header */}
         <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-800">
            <button onClick={onClose} className="md:hidden p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors">
               <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex-1 min-w-0">
               <h2 className="text-base font-semibold text-gray-100 truncate">{message.subject}</h2>
            </div>

            <div className="flex items-center gap-1.5">
               {message.massageStatus === "MASSAGE_SEND" && onMarkRead && (
                  <Button variant="ghost" size="sm" onClick={() => onMarkRead(message.id)} className="h-8 px-3 text-xs text-gray-400 hover:text-gray-100 hover:bg-gray-800">
                     <CheckCheck className="w-3.5 h-3.5 mr-1.5" />
                     Mark read
                  </Button>
               )}
               {onReply && (
                  <Button variant="ghost" size="sm" onClick={() => onReply(message)} className="h-8 px-3 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                     <Reply className="w-3.5 h-3.5 mr-1.5" />
                     Reply
                  </Button>
               )}
               {onDelete && (
                  <Button variant="ghost" size="icon" onClick={() => onDelete(message.id)} className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10">
                     <Trash2 className="w-3.5 h-3.5" />
                  </Button>
               )}
            </div>
         </div>

         {/* Sender info */}
         <div className="flex items-start gap-4 px-6 py-4 border-b border-gray-800/60">
            <div className={cn("w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0", getAvatarColor(message.name))}>{getInitials(message.name)}</div>
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-gray-100 text-sm">{message.name}</span>
                  <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border", status.color)}>
                     {status.icon}
                     {status.label}
                  </span>
               </div>
               <div className="space-y-0.5">
                  {message.email && (
                     <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Mail className="w-3 h-3" />
                        <span>{message.email}</span>
                     </div>
                  )}
                  {message.phone && (
                     <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Phone className="w-3 h-3" />
                        <span>{message.phone}</span>
                     </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                     <Clock className="w-3 h-3" />
                     <span>{format(new Date(message.createdAt), "MMM dd, yyyy 'at' h:mm a")}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Message body */}
         <div className="flex-1 overflow-y-auto px-6 py-5">
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{message.description}</p>
         </div>
      </div>
   );
};
