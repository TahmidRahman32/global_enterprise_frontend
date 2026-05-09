import { cn } from "@/lib/utils";
import { Message } from "./message.interface";
import { getAvatarColor, getInitials } from "./messageAvatar";
import { format } from "date-fns";
import { statusConfig } from "./MassageStatus";
const MessageRow = ({ message, isSelected, onClick }: { message: Message; isSelected: boolean; onClick: () => void }) => {
   const isUnread = message.massageStatus === "MASSAGE_SEND";
   const status = statusConfig[message.massageStatus];

   return (
      <div
         onClick={onClick}
         className={cn(
            "flex items-start gap-3 px-4 py-3.5 cursor-pointer border-b border-gray-800/60 transition-all duration-150 group relative",
            isSelected ? "bg-gray-800/70 border-l-2 border-l-indigo-500" : "hover:bg-gray-800/40",
            isUnread && !isSelected && "bg-gray-900/60",
         )}
      >
         {/* Unread dot */}
         {isUnread && <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400" />}

         {/* Avatar */}
         <div className={cn("flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold", getAvatarColor(message.name))}>{getInitials(message.name)}</div>

         {/* Content */}
         <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
               <span className={cn("text-sm truncate", isUnread ? "font-semibold text-gray-100" : "font-medium text-gray-300")}>{message.name}</span>
               <span className="text-[11px] text-gray-500 flex-shrink-0">{format(new Date(message.createdAt), "MMM d")}</span>
            </div>
            <p className={cn("text-xs truncate mb-1", isUnread ? "text-gray-200" : "text-gray-400")}>{message.subject}</p>
            <p className="text-[11px] text-gray-500 truncate">{message.description}</p>
         </div>

         {/* Status badge */}
         <div className="flex-shrink-0 flex items-center gap-1 mt-0.5">
            <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] border", status.color)}>
               {status.icon}
               {status.label}
            </span>
         </div>
      </div>
   );
};

export default MessageRow;
