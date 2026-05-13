// components/inbox/ConversationList.tsx
"use client";

import { Conversation } from "@/Types/inbox";
import { motion } from "framer-motion";
import Image from "next/image";

interface ConversationListProps {
   conversations: Conversation[];
   selectedConversationId: string;
   onSelectConversation: (id: string) => void;
}

const containerVariants = {
   hidden: { opacity: 0 },
   visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
   hidden: { opacity: 0, x: 20 },
   visible: { opacity: 1, x: 0 },
};

export function ConversationList({ conversations, selectedConversationId, onSelectConversation }: ConversationListProps) {
   return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 overflow-y-auto py-2">
         {conversations.map((conversation) => {
            const isSelected = selectedConversationId === conversation.id;

            return (
               <motion.button
                  key={conversation.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200 border-l-4 ${isSelected ? "bg-blue-500 border-neutral-800" : "border-transparent hover:bg-blue-500/10"}`}
               >
                  {/* Avatar — uses profilePhoto if available, else initials */}
                  <div className="w-12 h-12 rounded-full shrink-0 shadow-sm overflow-hidden bg-neutral-800 flex items-center justify-center">
                     {conversation.avatarUrl ? (
                        <Image
                           src={conversation.avatarUrl}
                           alt={conversation.name}
                           width={48}
                           height={48}
                           className="object-cover w-full h-full"
                           onError={(e) => {
                              // fallback to initials div on broken image
                              (e.target as HTMLImageElement).style.display = "none";
                           }}
                        />
                     ) : (
                        <span className="text-white font-medium text-sm">{conversation.avatarInitials}</span>
                     )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-baseline">
                        <h3 className={`font-medium truncate ${isSelected ? "text-white" : "text-neutral-300"}`}>{conversation.name}</h3>
                        <span className={`text-xs ml-2 shrink-0 ${isSelected ? "text-blue-100" : "text-neutral-400"}`}>{conversation.timestamp}</span>
                     </div>

                     {/* Subject line */}
                     <p className={`text-xs font-medium truncate ${isSelected ? "text-blue-100" : "text-neutral-600"}`}>{conversation.subject}</p>

                     {/* Last message preview */}
                     <p className={`text-xs truncate mt-0.5 ${isSelected ? "text-blue-200" : "text-neutral-400"}`}>{conversation.lastMessage}</p>
                  </div>
               </motion.button>
            );
         })}
      </motion.div>
   );
}
